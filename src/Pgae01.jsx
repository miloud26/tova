import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Form from "./components/Form";
import { data } from "./data";
import { useEffect, useState } from "react";

// Local, pre-sized copies of the very same product photos — nothing is
// cropped or re-composed. The browser downloads the lightest file that still
// matches the screen; public/index.html preloads the exact same set.
const HERO_SRC = "/images/hero.webp";
const HERO_SRC_SET =
  "/images/hero-500.webp 500w, /images/hero-800.webp 800w, /images/hero.webp 1000w";
const HERO_SIZES = "(max-width: 760px) 100vw, 560px";

const ART_SRC = "/images/desc.webp";
const ART_SRC_SET =
  "/images/desc-540.webp 540w, /images/desc-900.webp 900w, /images/desc.webp 1080w";

export default function Page01() {
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
      <Box className="topbar">
        الدفع عند الاستلام متوفر • توصيل سريع إلى 58 ولاية
      </Box>

      <Box className="hero">
        <Box className="visual">
          <Chip label="الأكثر طلباً" className="badge" />
          <img
            src={HERO_SRC}
            srcSet={HERO_SRC_SET}
            sizes={HERO_SIZES}
            alt={product.name}
            width="1000"
            height="1000"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </Box>
        <Box className="details">
          <Typography component="h1">{product.name}</Typography>
          <Typography className="lead">
            تركيبة طبيعية تساعد على تهدئة البشرة وترطيبها بعمق. اطلب الآن واستفد
            من العرض الخاص.
          </Typography>

          <Box className="price">
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
        <Box className="description">
          <Typography variant="h2">لماذا كريم الصدفية من TOVA؟</Typography>
          <img
            src={ART_SRC}
            srcSet={ART_SRC_SET}
            sizes="100vw"
            alt="تفاصيل المنتج"
            width="1080"
            height="9720"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
          />
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
