import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner({ label }) {
  return (
    <div className="loading-spinner-wrap" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      {label && <span className="loading-spinner-label">{label}</span>}
    </div>
  );
}

export default LoadingSpinner;
