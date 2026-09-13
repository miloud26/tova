import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ThankYou from "../ThankYou";

const renderThankYou = () =>
  render(
    <MemoryRouter initialEntries={["/thank-you"]}>
      <Routes>
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/products/page17" element={<div>PRODUCT_PAGE</div>} />
      </Routes>
    </MemoryRouter>,
  );

let ttqTrack;

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  ttqTrack = jest.fn();
  window.ttq = { track: ttqTrack };

  global.fetch = jest.fn();

  // @testing-library/react 13 logs a React.act deprecation warning; it is
  // library noise, not a failure of this page.
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();

  delete window.ttq;
});

describe("Thank You page protection", () => {
  it("redirects a direct /thank-you visit that has no confirmed order", async () => {
    renderThankYou();

    await waitFor(() => expect(screen.getByText("PRODUCT_PAGE")).toBeTruthy());

    expect(screen.queryByText("تم تسجيل طلبك بنجاح")).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
    expect(ttqTrack).not.toHaveBeenCalled();
  });

  it("shows the confirmation page after a confirmed order", async () => {
    sessionStorage.setItem("order_confirmed", "true");
    sessionStorage.setItem(
      "order_summary",
      JSON.stringify({
        product: "créme psoriasis",
        quantity: 3,
        offer: "02 + 01 مجاناً",
        total: 4600,
      }),
    );

    renderThankYou();

    expect(screen.getByText("تم تسجيل طلبك بنجاح")).toBeTruthy();
    expect(screen.getByText("créme psoriasis")).toBeTruthy();
    expect(screen.getByText("02 + 01 مجاناً")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
    expect(screen.getByText(/4600/)).toBeTruthy();

    // No navigation away, no API request, no tracking event.
    await waitFor(() => expect(screen.queryByText("PRODUCT_PAGE")).toBeNull());

    expect(global.fetch).not.toHaveBeenCalled();
    expect(ttqTrack).not.toHaveBeenCalled();
  });

  it("still confirms the order when the summary is missing or corrupted", async () => {
    sessionStorage.setItem("order_confirmed", "true");
    sessionStorage.setItem("order_summary", "{broken");

    renderThankYou();

    expect(screen.getByText("تم تسجيل طلبك بنجاح")).toBeTruthy();

    await waitFor(() => expect(screen.queryByText("PRODUCT_PAGE")).toBeNull());
  });
});
