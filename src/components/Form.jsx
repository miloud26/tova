import React, { useEffect, useMemo, useRef, useState } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";
import { data } from "../data.js";

export default function Form({ id }) {
  const [wilayaCommuneInfo, setWilayaCommuneInfo] = useState([]);

  const [btnDisebled, setBtnDisebled] = useState(true);
  const [purchaise, setPurchaise] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");

  const [quantity, setQuantity] = useState("1");
  const [selectedOffer, setSelectedOffer] = useState("single");

  const fakeBtn = false;

  const [correctNumber, setCorrectNumber] = useState(false);
  const [isDelevery] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [orderCooldown, setOrderCooldown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneInput = useRef(null);
  const isSubmittingRef = useRef(false);

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

  useEffect(() => {
    const normalizedPhone = phone.replace(/\s+/g, "");

    const validPhone = /^0[5-7]\d{8}$/.test(normalizedPhone);

    setCorrectNumber(Boolean(normalizedPhone) && !validPhone);
    setBtnDisebled(!validPhone || !name.trim() || !wilaya || !commune);
  }, [phone, name, wilaya, commune]);

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

  const fireTikTokPurchaseOnce = (orderId, value, quantityValue) => {
    if (!orderId || typeof window === "undefined") return false;

    const storageKey = `tiktok_purchase_sent_${orderId}`;
    let alreadySent = false;

    try {
      alreadySent = localStorage.getItem(storageKey) === "1";
    } catch (storageError) {
      console.warn("TikTok dedup storage unavailable:", storageError);
    }

    if (alreadySent) {
      return false;
    }

    if (!window.ttq || typeof window.ttq.track !== "function") {
      console.warn("TikTok Pixel ttq is not available.");
      return false;
    }

    const numericValue = Number(value) || 0;
    const numericQuantity = Math.max(1, Number(quantityValue) || 1);

    try {
      localStorage.setItem(storageKey, "1");
    } catch (storageError) {
      console.warn("Could not save TikTok Purchase dedup key:", storageError);
    }

    try {
      window.ttq.track("CompletePayment", {
        event_id: orderId,
        value: numericValue,
        currency: "DZD",
        quantity: numericQuantity,
        content_type: "product",
        content_id: String(id ?? ""),
        content_name: "créme psoriasis",
      });

      return true;
    } catch (trackingError) {
      console.warn("TikTok Purchase tracking failed:", trackingError);
      return false;
    }
  };

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

    const normalizedPhone = phone.replace(/\s+/g, "");

    const validPhone = /^0[5-7]\d{8}$/.test(normalizedPhone);

    if (!validPhone) {
      setCorrectNumber(true);
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
    setBtnDisebled(true);
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

      const finalOrderValue = productsPrice + deliveryPrice;

      fireTikTokPurchaseOnce(orderId, finalOrderValue, productQty);

      localStorage.setItem("lastOrderTime", Date.now().toString());

      localStorage.setItem("lastOrderId", orderId);

      setOrderCooldown(true);
      setSubmitError("");
      setPurchaise(true);

      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Order error:", error);

      isSubmittingRef.current = false;

      setIsSubmitting(false);
      setBtnDisebled(false);

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
          {purchaise ? (
            <Box margin="50px 0">
              <Typography
                sx={{
                  fontSize: "32px",
                  textAlign: "center",
                }}
              >
                لقد تم تقديم طلبك بنجاح سيتم الاتصال بك قريباً لتأكيد طلبيتك
              </Typography>

              <Typography
                sx={{
                  fontSize: "32px",
                  textAlign: "center",
                }}
              >
                شكراً لك
              </Typography>
            </Box>
          ) : fakeBtn ? (
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
                    disabled={btnDisebled || orderCooldown || isSubmitting}
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
