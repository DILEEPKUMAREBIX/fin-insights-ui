// src/widget.js
import React from "react";
import ReactDOM from "react-dom/client";
import FinancialAnalyticsPage from "./page.tsx";

function init(elementId, props = {}) {
    const root = ReactDOM.createRoot(document.getElementById(elementId));
    root.render(<FinancialAnalyticsPage {...props} />);
}

export default init; // 👈 this is what Vite will assign to `window.FinScoreWidget`
