import { useEffect } from "react";

import { Box, Button, Paper, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Link, useNavigate } from "react-router-dom";

import { readConfirmedOrder } from "../confirmedOrder.js";

// The Thank You page is a confirmation destination only. Conversion tracking is
// configured outside the app (Events Manager Event Builder), so this page
// reports nothing on its own beyond the pixel page view loaded in index.html.
//
// It is reachable ONLY after the order endpoint answered {"success":true} in
// this tab. Any other visit (typed URL, bookmark, shared link, reload of a new
// tab) is sent back to the shop instead of claiming a successful order.
export default function ThankYou() {
  const navigate = useNavigate();
  const confirmedOrder = readConfirmedOrder();

  useEffect(() => {
    if (!confirmedOrder) {
      navigate("/products/page17", { replace: true });
    }
  }, [confirmedOrder, navigate]);

  if (!confirmedOrder) {
    return null;
  }

  const { summary } = confirmedOrder;

  return (
    <Box className="store" dir="rtl">
      <Box className="topbar">
        الدفع عند الاستلام متوفر • توصيل سريع إلى 58 ولاية
      </Box>

      <Box className="thank-you-wrap">
        <Paper className="order-card thank-you-card">
          <Box className="success-mark" aria-hidden="true">
            <CheckCircleRoundedIcon />
          </Box>

          <Typography component="h1" className="thank-you-title">
            تم تسجيل طلبك بنجاح
          </Typography>

          <Typography className="thank-you-text">
            شكراً لثقتك بنا. تم استلام طلبك بنجاح وسيتم التواصل معك هاتفياً
            لتأكيد طلبك قبل الإرسال.
          </Typography>

          {summary && (
            <Box className="thank-you-summary">
              <Typography className="summary-heading">ملخص الطلب</Typography>

              {[
                ["المنتج", summary.product],
                ["الكمية", summary.quantity],
                ["العرض", summary.offer],
              ]
                .filter(([, value]) => value !== undefined && value !== "")
                .map(([label, value]) => (
                  <Box className="summary-row" key={label}>
                    <span className="label">{label}</span>
                    <span className="value">{value}</span>
                  </Box>
                ))}

              {Number.isFinite(Number(summary.total)) && (
                <Box className="summary-row total">
                  <span className="label">المجموع</span>
                  <span className="value">
                    {Number(summary.total)} دج
                  </span>
                </Box>
              )}
            </Box>
          )}

          <Typography className="thank-you-note">
            الدفع عند الاستلام • لا حاجة لأي إجراء إضافي من جهتك
          </Typography>

          <Button
            component={Link}
            to="/products/page17"
            className="primary thank-you-cta"
          >
            العودة إلى المتجر
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
