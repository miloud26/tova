import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const Page01 = lazy(() => import("./Pgae01.jsx"));

const Error = lazy(() => import("./components/Error"));
const ThankYou = lazy(() => import("./components/ThankYou"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/products/page01" element={<Page01 />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
};

export default App;
