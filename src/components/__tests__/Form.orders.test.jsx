import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Form from "../Form";

const okResponse = (body) => ({
  ok: true,
  status: 200,
  text: async () => body,
});

const renderForm = () =>
  render(
    <MemoryRouter initialEntries={["/products/page17"]}>
      <Routes>
        <Route path="/products/page17" element={<Form id="l-17" />} />
        <Route path="/thank-you" element={<div>THANK_YOU_PAGE</div>} />
      </Routes>
    </MemoryRouter>,
  );

const fillValidForm = async () => {
  fireEvent.change(screen.getByLabelText("الاسم الأول"), {
    target: { value: "أحمد" },
  });

  fireEvent.change(screen.getByLabelText("رقم الهاتف"), {
    target: { value: "0555123456" },
  });

  const wilaya = screen.getByLabelText("الولاية");

  await waitFor(() =>
    expect(wilaya.querySelectorAll("option").length).toBeGreaterThan(1),
  );

  fireEvent.change(wilaya, { target: { value: "Adrar" } });

  const commune = screen.getByLabelText("البلدية");

  await waitFor(() =>
    expect(commune.querySelectorAll("option").length).toBeGreaterThan(1),
  );

  fireEvent.change(commune, { target: { value: "Adrar" } });
};

const submitForm = () =>
  fireEvent.submit(document.querySelector("form"));

const submitOnce = async () => {
  await fillValidForm();
  submitForm();
};

let ttqTrack;

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  ttqTrack = jest.fn();

  global.fetch = jest.fn();

  window.ttq = { track: ttqTrack };
  window.fbq = jest.fn();

  // The form logs expected errors on every rejected order.
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();

  delete window.ttq;
  delete window.fbq;
});

describe("Form order submission", () => {
  it("redirects to the Thank You page only for {\"success\": true}", async () => {
    global.fetch.mockResolvedValue(
      okResponse(JSON.stringify({ success: true })),
    );

    renderForm();

    await submitOnce();

    await waitFor(() =>
      expect(screen.getByText("THANK_YOU_PAGE")).toBeTruthy(),
    );

    expect(sessionStorage.getItem("order_confirmed")).toBe("true");

    const summary = JSON.parse(sessionStorage.getItem("order_summary"));

    expect(summary).toEqual({
      product: "créme psoriasis",
      quantity: 1,
      offer: "01",
      total: 2300,
    });

    // ZERO tracking events fired by the form.
    expect(ttqTrack).not.toHaveBeenCalled();
    expect(window.fbq).not.toHaveBeenCalled();
  });

  it("keeps the order request payload and Apps Script endpoint untouched", async () => {
    global.fetch.mockResolvedValue(
      okResponse(JSON.stringify({ success: true })),
    );

    renderForm();

    await submitOnce();

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const [endpoint, options] = global.fetch.mock.calls[0];
    const body = options.body;

    expect(endpoint).toBe(
      "https://script.google.com/macros/s/AKfycbw6JUkqmqhcCGD6bZWQ92QfCjvJRqgXlCFVZy0gOF_nZKAIxgjXq9JmfvnjnA85ttiPdg/exec",
    );
    expect(options.method).toBe("POST");

    [
      "date",
      "orderId",
      "product",
      "name",
      "phone",
      "wilaya",
      "commune",
      "quantity",
      "offer",
      "prix",
    ].forEach((field) => {
      expect(body.get(field)).not.toBeNull();
    });
  });

  it("does not redirect for success:false", async () => {
    global.fetch.mockResolvedValue(
      okResponse(JSON.stringify({ success: false })),
    );

    renderForm();

    await submitOnce();

    await waitFor(() =>
      expect(screen.getByRole("alert").textContent).toContain(
        "تعذر إرسال الطلب",
      ),
    );

    expect(screen.queryByText("THANK_YOU_PAGE")).toBeNull();
    expect(sessionStorage.getItem("order_confirmed")).toBeNull();
    expect(ttqTrack).not.toHaveBeenCalled();
  });

  it("does not redirect for HTTP 200 Google error / HTML pages", async () => {
    global.fetch.mockResolvedValue(
      okResponse(
        "<html><head><title>Error</title></head><body>Script function not found</body></html>",
      ),
    );

    renderForm();

    await submitOnce();

    await waitFor(() => expect(screen.getByRole("alert")).toBeTruthy());

    expect(screen.queryByText("THANK_YOU_PAGE")).toBeNull();
    expect(sessionStorage.getItem("order_confirmed")).toBeNull();
  });

  it("does not redirect for invalid JSON", async () => {
    global.fetch.mockResolvedValue(okResponse("{not-json"));

    renderForm();

    await submitOnce();

    await waitFor(() => expect(screen.getByRole("alert")).toBeTruthy());

    expect(screen.queryByText("THANK_YOU_PAGE")).toBeNull();
    expect(sessionStorage.getItem("order_confirmed")).toBeNull();
  });

  it("does not redirect for an empty body", async () => {
    global.fetch.mockResolvedValue(okResponse(""));

    renderForm();

    await submitOnce();

    await waitFor(() => expect(screen.getByRole("alert")).toBeTruthy());

    expect(sessionStorage.getItem("order_confirmed")).toBeNull();
  });

  it("does not redirect for success:\"true\" (string, not boolean)", async () => {
    global.fetch.mockResolvedValue(
      okResponse(JSON.stringify({ success: "true" })),
    );

    renderForm();

    await submitOnce();

    await waitFor(() => expect(screen.getByRole("alert")).toBeTruthy());

    expect(screen.queryByText("THANK_YOU_PAGE")).toBeNull();
    expect(sessionStorage.getItem("order_confirmed")).toBeNull();
  });

  it("does not redirect on network failure and keeps retry working", async () => {
    global.fetch.mockRejectedValueOnce(new Error("network down"));

    renderForm();

    await submitOnce();

    await waitFor(() =>
      expect(screen.getByRole("alert").textContent).toContain(
        "تعذر إرسال الطلب",
      ),
    );

    expect(screen.queryByText("THANK_YOU_PAGE")).toBeNull();
    expect(sessionStorage.getItem("order_confirmed")).toBeNull();

    global.fetch.mockResolvedValue(
      okResponse(JSON.stringify({ success: true })),
    );

    submitForm();

    await waitFor(() =>
      expect(screen.getByText("THANK_YOU_PAGE")).toBeTruthy(),
    );

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("sends at most ONE order request for a double click", async () => {
    let resolveOrder;

    global.fetch.mockReturnValue(
      new Promise((resolve) => {
        resolveOrder = () =>
          resolve(okResponse(JSON.stringify({ success: true })));
      }),
    );

    renderForm();

    await submitOnce();

    submitForm();
    submitForm();

    expect(global.fetch).toHaveBeenCalledTimes(1);

    resolveOrder();

    await waitFor(() =>
      expect(screen.getByText("THANK_YOU_PAGE")).toBeTruthy(),
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
