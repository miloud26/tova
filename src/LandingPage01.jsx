import { Box, Button, Paper, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Form from "./components/Form";
import { data } from "./data";
import { useEffect, useState } from "react";

export default function LandingPage01() {
  const product = data.find((item) => item.id === "l-1");
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nextShowBtn = window.scrollY > 500;

      setShowBtn((prev) => (prev === nextShowBtn ? prev : nextShowBtn));
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const goToForm = () =>
    document
      .getElementById("order-form")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <Box className="store" dir="rtl">
      <Box
        className="description"
        sx={{
          width: "100%",
          lineHeight: 0,
          overflow: "hidden",
        }}
      >
        <img
          src={product.descImag1}
          alt="تفاصيل المنتج"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box width="100%" className="hero" display="flex" justifyContent="center">
        <Box width="100%" className="details">
          <Box
            width="100%"
            className="price"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <span className="old">{product.hashprice} دج</span>
            <strong>
              {product.price} <small>دج</small>
            </strong>
          </Box>
        </Box>
      </Box>
      <Box className="content">
        <Box className="order-column" id="order-form">
          <Paper className="order-card">
            <Typography variant="h2">أكمل طلبك الآن</Typography>
            <Typography className="sub">
              أدخل معلوماتك وسنتصل بك لتأكيد الطلب
            </Typography>
            <Form id={product.id} />
          </Paper>
        </Box>
      </Box>
      <Button
        onClick={goToForm}
        className={`mobile-cta ${showBtn ? "visible" : ""}`}
        startIcon={<ShoppingCart />}
      >
        اطلب الآن • الدفع عند الاستلام
      </Button>
    </Box>
  );
}
