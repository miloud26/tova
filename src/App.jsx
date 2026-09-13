import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import Page17 from "./Pgae17.jsx";

const Error = lazy(() => import("./components/Error"));
const ThankYou = lazy(() => import("./components/ThankYou"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/products/page17" element={<Page17 />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
};

export default App;
