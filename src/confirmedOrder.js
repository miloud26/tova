// A confirmed order is the ONLY thing that may open the Thank You page.
//
// The marker is written once the order endpoint answered {"success":true} and
// lives in sessionStorage, so it disappears with the tab and can never be used
// to fake a successful order on a later visit (no localStorage, no cookies).
export const CONFIRMED_ORDER_KEY = "order_confirmed";

export const CONFIRMED_ORDER_SUMMARY_KEY = "order_summary";

// Stores the confirmation marker plus an optional, non-sensitive order summary
// (product / quantity / offer / total only - no customer data).
export const confirmOrder = (summary) => {
  try {
    sessionStorage.setItem(CONFIRMED_ORDER_KEY, "true");

    if (summary) {
      sessionStorage.setItem(
        CONFIRMED_ORDER_SUMMARY_KEY,
        JSON.stringify(summary),
      );
    }

    return true;
  } catch (storageError) {
    console.warn("Could not persist order confirmation:", storageError);

    return false;
  }
};

// Returns the confirmed order, or null when the visitor never completed an
// order in this tab. A missing/corrupted summary still counts as confirmed:
// the marker itself is what authorizes the page.
export const readConfirmedOrder = () => {
  try {
    if (sessionStorage.getItem(CONFIRMED_ORDER_KEY) !== "true") {
      return null;
    }
  } catch (storageError) {
    console.warn("Could not read order confirmation:", storageError);

    return null;
  }

  let summary = null;

  try {
    const raw = sessionStorage.getItem(CONFIRMED_ORDER_SUMMARY_KEY);

    if (raw) {
      const parsed = JSON.parse(raw);

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        summary = parsed;
      }
    }
  } catch (parseError) {
    console.warn("Could not read order summary:", parseError);
  }

  return { summary };
};
