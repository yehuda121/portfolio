import React, { useEffect } from "react";
import "./Modal.css";

function Modal({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="modal-overlay" role="presentation" onClick={onCancel}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="modal-title">{title}</h2>
        <p className="modal-body">{message}</p>
        <div className="modal-actions">
          {cancelLabel && (
            <button type="button" className="modal-btn" onClick={onCancel}>
              {cancelLabel}
            </button>
          )}
          <button type="button" className="modal-btn modal-btn-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
