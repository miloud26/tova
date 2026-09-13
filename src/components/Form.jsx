import React, { useEffect, useMemo, useRef, useState } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { data } from "../data.js";
import { confirmOrder } from "../confirmedOrder.js";

// Google Apps Script always answers with HTTP 200, even when the request was
// rejected (unknown function, thrown exception, missing permission, ...).
// Those answers are Google error pages, not saved orders, so a successful
// transport response alone is NOT proof that the order exists.
const ORDER_REJECTED_MARKERS = [
  "script function not found",
  "fonction de script introuvable",
  "función de secuencia de comandos no encontrada",
  "exception:",
  "exception :",
  "accounts.google.com",
  "authorization is required",
  "autorisation requise",
  "unable to open the file",
];

// The order is confirmed ONLY by the machine-readable confirmation the Apps
// Script returns after sheet.appendRow() succeeded: {"success":true}.
// Invalid JSON, an HTML rejection page, an empty body, {"success":false} or any
// other shape is "not saved" and must never be treated as a real order.
const confirmsOrderSaved = (body) => {
  let payload;

  try {
    payload = JSON.parse(body);
  } catch (parseError) {
    return false;
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }

  return payload.success === true;
};

const orderWasSaved = async (response) => {
  let body = "";

  try {
    body = await response.text();
  } catch (readError) {
    console.warn("Could not read order response:", readError);

    return false;
  }

  const normalizedBody = body.toLowerCase();

  // Google rejection / authorization pages: never a saved order.
  if (ORDER_REJECTED_MARKERS.some((marker) => normalizedBody.includes(marker))) {
    return false;
  }

  // Authoritative rule: only {"success":true} authorizes a confirmed order.
  return confirmsOrderSaved(body);
};

function Form({ id }) {
  const [wilayaCommuneInfo, setWilayaCommuneInfo] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");

  const [quantity, setQuantity] = useState("1");
  const [selectedOffer, setSelectedOffer] = useState("single");

  const fakeBtn = false;

  const [isDelevery] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [orderCooldown, setOrderCooldown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneInput = useRef(null);
  const isSubmittingRef = useRef(false);
  const navigate = useNavigate();

  const product = data.find((item) => item.id === id) || data[0] || {};

  const { price = 0, delevery = "", url = "" } = product;

  useEffect(() => {
    let active = true;

    import("./wilayaCommuneInfo.js")
      .then((module) => {
        if (active) {
          setWilayaCommuneInfo(module.wilayaCommuneInfo);
        }
      })
      .catch((error) => {
        console.error("Failed to load wilaya data:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const wilayaInfo = useMemo(() => {
    return wilayaCommuneInfo.map(({ id, name }) => ({
      id,
      name,
    }));
  }, [wilayaCommuneInfo]);

  const communes = useMemo(() => {
    const selectedWilaya = wilayaCommuneInfo.find(
      (item) => item.name === wilaya,
    );

    if (!selectedWilaya) return [];

    return Object.keys(selectedWilaya)
      .filter((key) => /^com\d+$/.test(key))
      .map((key) => selectedWilaya[key])
      .filter(Boolean);
  }, [wilayaCommuneInfo, wilaya]);

  const normalizedPhone = phone.replace(/\s+/g, "");
  const validPhone = /^0[5-7]\d{8}$/.test(normalizedPhone);
  const correctNumber = Boolean(normalizedPhone) && !validPhone;
  const isFormValid =
    validPhone && Boolean(name.trim()) && Boolean(wilaya) && Boolean(commune);

  useEffect(() => {
    const lastOrderTime = localStorage.getItem("lastOrderTime");

    if (!lastOrderTime) return;

    const twentyFourHours = 24 * 60 * 60 * 1000;
    const elapsedTime = Date.now() - Number(lastOrderTime);

    if (elapsedTime < twentyFourHours) {
      setOrderCooldown(true);

      const remainingTime = twentyFourHours - elapsedTime;

      const timeout = setTimeout(() => {
        localStorage.removeItem("lastOrderTime");
        localStorage.removeItem("lastOrderId");

        setOrderCooldown(false);
        setSubmitError("");
      }, remainingTime);

      return () => clearTimeout(timeout);
    }

    localStorage.removeItem("lastOrderTime");
    localStorage.removeItem("lastOrderId");

    setOrderCooldown(false);
  }, []);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    const lastOrderTime = localStorage.getItem("lastOrderTime");
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (lastOrderTime && Date.now() - Number(lastOrderTime) < twentyFourHours) {
      setOrderCooldown(true);

      setSubmitError(
        "لقد قمت بالفعل بإرسال طلب. يمكنك إرسال طلب جديد بعد مرور 24 ساعة.",
      );

      return;
    }

    if (!validPhone) {
      phoneInput.current?.focus();
      return;
    }

    if (!name.trim() || !wilaya || !commune) {
      return;
    }

    if (!url) {
      setSubmitError("تعذر إرسال الطلب. رابط الإرسال غير متوفر.");
      return;
    }

    isSubmittingRef.current = true;

    setIsSubmitting(true);
    setSubmitError("");

    const orderId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).substring(2, 12)}`;

    try {
      const formData = new FormData();

      const now = new Date();

      formData.append(
        "date",
        `${now.getDate()}/${now.getMonth() + 1} - ${now.getHours()}H : ${now.getMinutes()}M`,
      );

      formData.append("orderId", orderId);
      formData.append("product", "créme psoriasis");
      formData.append("name", name.trim());
      formData.append("phone", normalizedPhone);
      formData.append("wilaya", wilaya);
      formData.append("commune", commune);

      const orderQty = Math.max(1, Number(quantity) || 1);

      const productQty = selectedOffer === "bundle" ? orderQty * 3 : orderQty;

      const productsPrice =
        selectedOffer === "bundle"
          ? Number(price) * 2 * orderQty
          : Number(price) * orderQty;

      const deliveryPrice =
        delevery.trim() !== "" && !isNaN(Number(delevery))
          ? Number(delevery)
          : 0;

      formData.append("quantity", productQty.toString());

      formData.append(
        "offer",
        selectedOffer === "bundle" ? "02 + 01 مجاناً" : "01",
      );

      formData.append("prix", String(productsPrice + deliveryPrice));

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Order request failed (${response.status})`);
      }

      // The order endpoint (Google Apps Script) also answers HTTP 200 when it
      // rejects the request, so the response must be confirmed as a saved order
      // before the order is treated as successful.
      const saved = await orderWasSaved(response);

      if (!saved) {
        throw new Error("Order was not confirmed by the order endpoint");
      }

      localStorage.setItem("lastOrderTime", Date.now().toString());

      localStorage.setItem("lastOrderId", orderId);

      setOrderCooldown(true);
      setSubmitError("");

      // Only a real, server-confirmed order may open the Thank You page. The
      // marker is written here and verified again by that page.
      confirmOrder({
        product: "créme psoriasis",
        quantity: productQty,
        offer: selectedOffer === "bundle" ? "02 + 01 مجاناً" : "01",
        total: productsPrice + deliveryPrice,
      });

      navigate("/thank-you");
    } catch (error) {
      console.error("Order error:", error);

      isSubmittingRef.current = false;

      setIsSubmitting(false);

      setSubmitError("تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <Box>
      {isDelevery ? (
        <Box margin="50px 0">
          <Typography
            sx={{
              fontSize: "32px",
              textAlign: "center",
            }}
          >
            نعتذر، التوصيل غير متوفر لولايتكم
          </Typography>

          <Typography
            sx={{
              fontSize: "32px",
              textAlign: "center",
            }}
          >
            شكرا لكم
          </Typography>
        </Box>
      ) : (
        <Box>
          {fakeBtn ? (
            <Box margin="50px 0">
              <Typography
                sx={{
                  fontSize: "32px",
                  textAlign: "center",
                }}
              >
                {`التوصيل لولايتك ${wilaya} غير متوفر الآن`}
              </Typography>

              <Typography
                sx={{
                  fontSize: "32px",
                  textAlign: "center",
                }}
              >
                نرجو المعذرة وشكراً
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                direction: "rtl",
              }}
            >
              <form
                onSubmit={handleSubmitOrder}
                autoComplete="off"
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                  padding: "20px 15px 16px",
                  margin: 0,
                  backgroundColor: "#fff",
                  direction: "rtl",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: {
                      xs: "14px",
                      sm: "15px",
                    },
                    fontWeight: 500,
                    color: "#222",
                    lineHeight: 1.7,
                    marginBottom: "18px",
                  }}
                >
                  للطلب أدخل معلوماتك في الخانات أسفله ⬇⬇ ثم إضغط على "إضغط هنا
                  للطلب"
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                    },
                    gap: "15px",
                  }}
                >
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    placeholder="الاسم الأول"
                    value={name}
                    disabled={isSubmitting}
                    inputProps={{
                      dir: "rtl",
                      "aria-label": "الاسم الأول",
                    }}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "50px",
                        borderRadius: "3px",
                        fontSize: "14px",
                      },
                      "& input::placeholder": {
                        opacity: 1,
                        color: "#b7b7b7",
                      },
                    }}
                  />

                  <TextField
                    inputRef={phoneInput}
                    required
                    fullWidth
                    type="tel"
                    inputMode="numeric"
                    variant="outlined"
                    placeholder="رقم الهاتف"
                    value={phone}
                    disabled={isSubmitting}
                    inputProps={{
                      dir: "rtl",
                      "aria-label": "رقم الهاتف",
                      maxLength: 10,
                    }}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "50px",
                        borderRadius: "3px",
                        fontSize: "14px",
                      },
                      "& input::placeholder": {
                        opacity: 1,
                        color: "#b7b7b7",
                      },
                    }}
                  />

                  <select
                    className="fast-select"
                    required
                    aria-label="الولاية"
                    value={wilaya}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setCommune("");
                      setWilaya(e.target.value);
                    }}
                  >
                    <option value="">اختر الولاية</option>

                    {wilayaInfo.slice(1).map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.id} - {item.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="fast-select"
                    required
                    aria-label="البلدية"
                    value={commune}
                    disabled={!wilaya || isSubmitting}
                    onChange={(e) => setCommune(e.target.value)}
                  >
                    <option value="">اختر البلدية</option>

                    {communes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Box>

                {correctNumber && (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      fontSize: "12px",
                      textAlign: "right",
                      marginTop: "6px",
                    }}
                  >
                    أدخل رقم هاتف صحيح
                  </Typography>
                )}

                {submitError && (
                  <Typography
                    role="alert"
                    sx={{
                      color: "#d32f2f",
                      fontSize: "13px",
                      textAlign: "right",
                      marginTop: "6px",
                    }}
                  >
                    {submitError}
                  </Typography>
                )}

                {orderCooldown && (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      fontSize: "13px",
                      textAlign: "center",
                      marginTop: "10px",
                      fontWeight: 600,
                    }}
                  >
                    لقد قمت بالفعل بإرسال طلب. يمكنك إرسال طلب جديد بعد مرور 24
                    ساعة.
                  </Typography>
                )}

                <Box sx={{ marginTop: "18px" }}>
                  <Box
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedOffer === "single"}
                    onClick={() => {
                      if (isSubmitting) return;

                      setSelectedOffer("single");
                      setQuantity("1");
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: isSubmitting ? "default" : "pointer",
                      marginBottom: "17px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "27px",
                        height: "27px",
                        border: "1px solid #d6d6d6",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {selectedOffer === "single" && (
                        <Box
                          sx={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            backgroundColor: "#000",
                          }}
                        />
                      )}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      عند طلب علبة 01&nbsp;&nbsp;
                      {Number(price)} دج
                    </Typography>
                  </Box>

                  <Box
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedOffer === "bundle"}
                    onClick={() => {
                      if (isSubmitting) return;

                      setSelectedOffer("bundle");
                      setQuantity("1");
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: isSubmitting ? "default" : "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        width: "27px",
                        height: "27px",
                        border: "1px solid #d6d6d6",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {selectedOffer === "bundle" && (
                        <Box
                          sx={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            backgroundColor: "#000",
                          }}
                        />
                      )}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      عند طلب 02 + واحدة مجانًا&nbsp;&nbsp;
                      {Number(price) * 2} دج
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    marginTop: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    direction: "rtl",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexShrink: 0,
                    }}
                  >
                    <Button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() =>
                        setQuantity((q) => String(Math.max(1, Number(q) - 1)))
                      }
                      sx={{
                        minWidth: "31px",
                        width: "31px",
                        height: "31px",
                        border: "1px solid #ddd",
                        color: "#222",
                        backgroundColor: "#fff",
                        borderRadius: "2px",
                        padding: 0,
                        fontSize: "20px",
                      }}
                    >
                      −
                    </Button>

                    <Typography
                      sx={{
                        minWidth: "18px",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      {quantity}
                    </Typography>

                    <Button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setQuantity((q) => String(Number(q) + 1))}
                      sx={{
                        minWidth: "31px",
                        width: "31px",
                        height: "31px",
                        border: "1px solid #ddd",
                        color: "#222",
                        backgroundColor: "#fff",
                        borderRadius: "2px",
                        padding: 0,
                        fontSize: "20px",
                      }}
                    >
                      +
                    </Button>
                  </Box>

                  <Button
                    disabled={!isFormValid || orderCooldown || isSubmitting}
                    variant="contained"
                    type="submit"
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      minHeight: "47px",
                      margin: 0,
                      color: "#fff",
                      backgroundColor: "#000",
                      borderRadius: 0,
                      fontSize: {
                        xs: "15px",
                        sm: "16px",
                      },
                      fontWeight: 800,
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#111",
                        boxShadow: "none",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#000",
                        color: "#fff",
                        opacity: 0.65,
                      },
                    }}
                  >
                    {isSubmitting ? "جاري إرسال الطلب..." : "إضغط هنا للطلب"}
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default React.memo(Form);
