// JpgToPdf.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { useTranslation } from "react-i18next";
import "./JpgToPdf.css";

// Note: Comments are in English only, as requested.

const rotateImageToDataUrl = (img, rotationDeg, mimeType) => {
  const normalized = ((rotationDeg % 360) + 360) % 360;
  const swap = normalized === 90 || normalized === 270;
  const canvasW = swap ? img.naturalHeight : img.naturalWidth;
  const canvasH = swap ? img.naturalWidth : img.naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d");

  ctx.translate(canvasW / 2, canvasH / 2);
  ctx.rotate((-rotationDeg * Math.PI) / 180);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

  if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
    return canvas.toDataURL("image/jpeg", 0.92);
  }
  return canvas.toDataURL("image/png");
};

const JpgToPdf = () => {
  const { t } = useTranslation();

  const [items, setItems] = useState([]); // { id, file, previewUrl, rotationDeg }
  const [isConverting, setIsConverting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const dragIndexRef = useRef(null);

  const acceptTypes = useMemo(() => ["image/jpeg", "image/jpg", "image/png"], []);

  // Cleanup preview URLs + generated PDF URL on unmount
  useEffect(() => {
    return () => {
      items.forEach((it) => URL.revokeObjectURL(it.previewUrl));
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If we regenerate PDF, revoke the old URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const addFiles = (fileList) => {
    setErrorMsg("");
    setPdfUrl(null);

    const incoming = Array.from(fileList || []);
    const valid = incoming.filter((f) => acceptTypes.includes(f.type));

    if (incoming.length > 0 && valid.length === 0) {
      setErrorMsg(t("JpgToPdf.invalidFileType"));
      return;
    }

    const newItems = valid.map((file) => ({
      id: `${crypto.randomUUID?.() || Date.now()}-${file.name}`,
      file,
      previewUrl: URL.createObjectURL(file),
      rotationDeg: 0,
    }));

    setItems((prev) => [...prev, ...newItems]);
  };

  const onFileChange = (e) => addFiles(e.target.files);

  const removeItem = (id) => {
    setPdfUrl(null);
    setItems((prev) => {
      const target = prev.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  };

  const rotateItemLeft = (id) => {
    setPdfUrl(null);
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, rotationDeg: it.rotationDeg + 90 } : it
      )
    );
  };

  const clearAll = () => {
    setPdfUrl(null);
    setErrorMsg("");
    setItems((prev) => {
      prev.forEach((it) => URL.revokeObjectURL(it.previewUrl));
      return [];
    });
  };

  // Drag & Drop ordering (HTML5 DnD)
  const onDragStart = (index) => {
    dragIndexRef.current = index;
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (dropIndex) => {
    const dragIndex = dragIndexRef.current;
    dragIndexRef.current = null;
    if (dragIndex === null || dragIndex === dropIndex) return;

    setPdfUrl(null);
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(dropIndex, 0, moved);
      return next;
    });
  };

  // Helpers: read file as DataURL + load image to get dimensions
  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("FileReader failed"));
      reader.readAsDataURL(file);
    });

  const loadImage = (dataUrl) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = dataUrl;
    });

  // Convert pixels to PDF points (approx. 96dpi => 1px ≈ 0.75pt)
  const pxToPt = (px) => px * 0.75;

  const convertToPdf = async () => {
    setErrorMsg("");
    setPdfUrl(null);

    if (items.length === 0) {
      setErrorMsg(t("JpgToPdf.noImagesError"));
      return;
    }

    setIsConverting(true);

    try {
      let pdf = null;

      for (let i = 0; i < items.length; i++) {
        const { file, rotationDeg } = items[i];
        const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
        const originalDataUrl = await readFileAsDataUrl(file);
        const originalImg = await loadImage(originalDataUrl);

        const dataUrl =
          rotationDeg % 360 === 0
            ? originalDataUrl
            : rotateImageToDataUrl(originalImg, rotationDeg, file.type);
        const img =
          rotationDeg % 360 === 0
            ? originalImg
            : await loadImage(dataUrl);

        const wPt = Math.max(1, pxToPt(img.naturalWidth));
        const hPt = Math.max(1, pxToPt(img.naturalHeight));
        const orientation = wPt >= hPt ? "l" : "p";

        if (!pdf) {
          pdf = new jsPDF({
            unit: "pt",
            format: [wPt, hPt],
            orientation,
          });
        } else {
          pdf.addPage([wPt, hPt], orientation);
        }

        pdf.addImage(dataUrl, isJpeg ? "JPEG" : "PNG", 0, 0, wPt, hPt);
      }

      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      setErrorMsg(t("JpgToPdf.convertFailed"));
    } finally {
      setIsConverting(false);
    }
  };

  const downloadName = useMemo(() => {
    const d = new Date();
    const yyyy = String(d.getFullYear());
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `images-to-pdf-${yyyy}${mm}${dd}.pdf`;
  }, []);

  return (
    <div className="jpgToPdf-page">
      <div className="jpgToPdf-header">
        <h1 className="jpgToPdf-title">{t("JpgToPdf.title")}</h1>
        <p className="jpgToPdf-subtitle">{t("JpgToPdf.subtitle")}</p>
      </div>

      <div className="jpgToPdf-card">
        <div className="jpgToPdf-uploadRow">
          <label className="jpgToPdf-uploadBtn">
            {t("JpgToPdf.addImages")}
            <input
              className="jpgToPdf-fileInput"
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={onFileChange}
            />
          </label>

          <button
            type="button"
            className="jpgToPdf-secondaryBtn"
            onClick={clearAll}
            disabled={items.length === 0 || isConverting}
          >
            {t("JpgToPdf.clearAll")}
          </button>
        </div>

        <div
          className="jpgToPdf-dropZone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
        >
          <div className="jpgToPdf-dropText">
            <div className="jpgToPdf-dropTitle">{t("JpgToPdf.dropTitle")}</div>
            <div className="jpgToPdf-dropHint">{t("JpgToPdf.dropHint")}</div>
          </div>
        </div>

        {errorMsg ? <div className="jpgToPdf-alert">{errorMsg}</div> : null}

        <div className="jpgToPdf-sectionHeader">
          <div className="jpgToPdf-sectionTitle">{t("JpgToPdf.previewTitle")}</div>
          <div className="jpgToPdf-sectionNote">{t("JpgToPdf.reorderHint")}</div>
        </div>

        {items.length === 0 ? (
          <div className="jpgToPdf-empty">{t("JpgToPdf.emptyState")}</div>
        ) : (
          <div
            className={`jpgToPdf-grid ${items.length === 1 ? "jpgToPdf-gridSingle" : ""}`}
            role="list"
          >
            {items.map((it, idx) => (
              <div
                key={it.id}
                className="jpgToPdf-item"
                role="listitem"
                draggable
                onDragStart={() => onDragStart(idx)}
                onDragOver={onDragOver}
                onDrop={() => onDrop(idx)}
              >
                <div className="jpgToPdf-thumbWrap">
                  <img
                    className={`jpgToPdf-thumb ${
                      it.rotationDeg % 360 !== 0 ? "jpgToPdf-thumbRotated" : ""
                    }`}
                    src={it.previewUrl}
                    alt={t("JpgToPdf.imageAlt")}
                    style={{ transform: `rotate(-${it.rotationDeg}deg)` }}
                  />
                  <div className="jpgToPdf-indexPill">{idx + 1}</div>
                </div>

                <div className="jpgToPdf-itemFooter">
                  <div className="jpgToPdf-fileName" title={it.file.name}>
                    {it.file.name}
                  </div>

                  <div className="jpgToPdf-itemActions">
                    <button
                      type="button"
                      className="jpgToPdf-rotateBtn"
                      onClick={() => rotateItemLeft(it.id)}
                      disabled={isConverting}
                      aria-label={t("JpgToPdf.rotateLeftAria")}
                    >
                      <span className="jpgToPdf-rotateIcon" aria-hidden="true">
                        ↺
                      </span>
                    </button>

                    <button
                      type="button"
                      className="jpgToPdf-removeBtn"
                      onClick={() => removeItem(it.id)}
                      disabled={isConverting}
                      aria-label={t("JpgToPdf.removeImage")}
                    >
                      {t("JpgToPdf.remove")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="jpgToPdf-actions">
          <button
            type="button"
            className="jpgToPdf-primaryBtn"
            onClick={convertToPdf}
            disabled={items.length === 0 || isConverting}
          >
            {isConverting ? t("JpgToPdf.converting") : t("JpgToPdf.convert")}
          </button>

          <a
            className={`jpgToPdf-downloadBtn ${pdfUrl ? "" : "jpgToPdf-downloadDisabled"}`}
            href={pdfUrl || undefined}
            download={downloadName}
            onClick={(e) => {
              if (!pdfUrl) e.preventDefault();
            }}
          >
            {t("JpgToPdf.downloadPdf")}
          </a>
        </div>

        {/* How it works section */}
        <section className="jpgToPdf-howItWorks">
          <h2 className="jpgToPdf-howItWorksTitle">{t("JpgToPdf.howItWorksTitle")}</h2>

          <div className="jpgToPdf-howItWorksBody">
            <p className="jpgToPdf-howItWorksText">{t("JpgToPdf.howItWorksP1")}</p>
            <p className="jpgToPdf-howItWorksText">{t("JpgToPdf.howItWorksP2")}</p>
            <p className="jpgToPdf-howItWorksText">{t("JpgToPdf.howItWorksP3")}</p>
            <p className="jpgToPdf-howItWorksText">{t("JpgToPdf.howItWorksP4")}</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JpgToPdf;
