import { Box, Button, Paper, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Form from "./components/Form";
import { data } from "./data";
import { useEffect, useState } from "react";

// Local, pre-sized copies of the very same long artwork — nothing is cropped,
// re-composed or re-ordered. The browser picks the lightest file that still
// matches the screen: phones take one size, large / high-DPI screens keep the
// full-resolution one. public/index.html preloads the exact same set.
const ART_SRC = "/images/desc.webp";
const ART_SRC_SET =
  "/images/desc-540.webp 540w, /images/desc-900.webp 900w, /images/desc.webp 1080w";
const ART_SIZES = "100vw";

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
        className="description landing-art"
        sx={{
          width: "100%",
          lineHeight: 0,
          overflow: "hidden",
          border: "1px solid rgba(185,108,32,.1)",
          borderRadius: "16px",
          background: "#fff",
          boxShadow: "0 10px 28px rgba(72,43,18,.07)",
        }}
      >
        {/* One single long image. `.art-lqip` paints the 1.5 kB blur-up
            preview (also used by the boot skeleton in public/index.html)
            while the full artwork streams in behind it. */}
        <Box
          className="art-lqip"
          sx={{ width: "100%", aspectRatio: "1080 / 9720" }}
        >
          <img
            src={ART_SRC}
            srcSet={ART_SRC_SET}
            sizes={ART_SIZES}
            alt="تفاصيل المنتج"
            width="1080"
            height="9720"
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
