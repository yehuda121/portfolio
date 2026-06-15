import React from "react";
import "../ui-tokens.css";
import "./InlineAlert.css";

function InlineAlert({ type = "info", message, children }) {
  const content = message || children;
  if (!content) return null;

  return (
    <div className={`inline-alert inline-alert-${type}`} role="alert">
      {content}
    </div>
  );
}

export default InlineAlert;
