// PdfMerge.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { useTranslation } from "react-i18next";
import "./PdfMerge.css";

// Note: Comments are in English only, as requested.

const MAX_FILES = 15; // Reasonable limit to avoid huge memory usage in the browser.

const PdfMerge = () => {
  const { t } = useTranslation();

  const [items, setItems] = useState([]); // { id, file, sizeLabel }
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const dragIndexRef = useRef(null);

  const acceptTypes = useMemo(() => ["application/pdf"], []);

  // Cleanup generated PDF URL on unmount
  useEffect(() => {
    return () => {
      if (mergedPdfUrl) URL.revokeObjectURL(mergedPdfUrl);
    };
  }, [mergedPdfUrl]);

  const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes)) return "";
    const units = ["B", "KB", "MB", "GB"];
    let idx = 0;
    let val = bytes;
    while (val >= 1024 && idx < units.length - 1) {
      val /= 1024;
      idx += 1;
    }
    return `${val.toFixed(val >= 10 || idx === 0 ? 0 : 1)} ${units[idx]}`;
  };

  const addFiles = (fileList) => {
    setErrorMsg("");
    setMergedPdfUrl(null);

    const incoming = Array.from(fileList || []);
    if (incoming.length === 0) return;

    const valid = incoming.filter((f) => acceptTypes.includes(f.type) || f.name.toLowerCase().endsWith(".pdf"));
    if (valid.length !== incoming.length) {
      setErrorMsg(t("PdfMerge.invalidFileType"));
    }

    const availableSlots = MAX_FILES - items.length;
    if (availableSlots <= 0) {
      setErrorMsg(t("PdfMerge.maxFilesReached", { max: MAX_FILES }));
      return;
    }

    const toAdd = valid.slice(0, availableSlots);
    if (valid.length > availableSlots) {
      setErrorMsg(t("PdfMerge.someFilesIgnored", { max: MAX_FILES }));
    }

    const newItems = toAdd.map((file) => ({
      id: `${crypto.randomUUID?.() || Date.now()}-${file.name}`,
      file,
      sizeLabel: formatBytes(file.size),
    }));

    setItems((prev) => [...prev, ...newItems]);
  };

  const onFileChange = (e) => addFiles(e.target.files);

  const removeItem = (id) => {
    setMergedPdfUrl(null);
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const clearAll = () => {
    setMergedPdfUrl(null);
    setErrorMsg("");
    setItems([]);
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

    setMergedPdfUrl(null);
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(dropIndex, 0, moved);
      return next;
    });
  };

  const mergePdfs = async () => {
    setErrorMsg("");
    setMergedPdfUrl(null);

    if (items.length < 2) {
      setErrorMsg(t("PdfMerge.needAtLeastTwo"));
      return;
    }

    setIsMerging(true);
    setProgress({ current: 0, total: items.length });

    try {
      const outPdf = await PDFDocument.create();

      for (let i = 0; i < items.length; i++) {
        // Read file bytes
        const bytes = await items[i].file.arrayBuffer();
        const srcPdf = await PDFDocument.load(bytes);

        // Copy all pages
        const pageIndices = srcPdf.getPageIndices();
        const copiedPages = await outPdf.copyPages(srcPdf, pageIndices);
        copiedPages.forEach((p) => outPdf.addPage(p));

        // Update progress per file merged
        setProgress({ current: i + 1, total: items.length });
      }

      const mergedBytes = await outPdf.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (err) {
      setErrorMsg(t("PdfMerge.mergeFailed"));
    } finally {
      setIsMerging(false);
    }
  };

  const downloadName = useMemo(() => {
    const d = new Date();
    const yyyy = String(d.getFullYear());
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `merged-${yyyy}${mm}${dd}.pdf`;
  }, []);

  const percent = useMemo(() => {
    if (!progress.total) return 0;
    return Math.round((progress.current / progress.total) * 100);
  }, [progress]);

  return (
    <div className="pdfMerge-page">
      <div className="pdfMerge-header">
        <h1 className="pdfMerge-title">{t("PdfMerge.title")}</h1>
        <p className="pdfMerge-subtitle">{t("PdfMerge.subtitle")}</p>
      </div>

      <div className="pdfMerge-card">
        <div className="pdfMerge-uploadRow">
          <label className="pdfMerge-uploadBtn">
            {t("PdfMerge.addFiles")}
            <input
              className="pdfMerge-fileInput"
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={onFileChange}
            />
          </label>

          <div className="pdfMerge-meta">
            <span className="pdfMerge-metaText">
              {t("PdfMerge.limitHint", { max: MAX_FILES })}
            </span>
          </div>

          <button
            type="button"
            className="pdfMerge-secondaryBtn"
            onClick={clearAll}
            disabled={items.length === 0 || isMerging}
          >
            {t("PdfMerge.clearAll")}
          </button>
        </div>

        <div
          className="pdfMerge-dropZone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
        >
          <div className="pdfMerge-dropText">
            <div className="pdfMerge-dropTitle">{t("PdfMerge.dropTitle")}</div>
            <div className="pdfMerge-dropHint">{t("PdfMerge.dropHint")}</div>
          </div>
        </div>

        {errorMsg ? <div className="pdfMerge-alert">{errorMsg}</div> : null}

        <div className="pdfMerge-sectionHeader">
          <div className="pdfMerge-sectionTitle">{t("PdfMerge.previewTitle")}</div>
          <div className="pdfMerge-sectionNote">{t("PdfMerge.reorderHint")}</div>
        </div>

        {items.length === 0 ? (
          <div className="pdfMerge-empty">{t("PdfMerge.emptyState")}</div>
        ) : (
          <div
            className={`pdfMerge-grid ${items.length === 1 ? "pdfMerge-gridSingle" : ""}`}
            role="list"
          >
            {items.map((it, idx) => (
              <div
                key={it.id}
                className="pdfMerge-item"
                role="listitem"
                draggable
                onDragStart={() => onDragStart(idx)}
                onDragOver={onDragOver}
                onDrop={() => onDrop(idx)}
              >
                <div className="pdfMerge-fileRow">
                  <div className="pdfMerge-indexPill">{idx + 1}</div>

                  <div className="pdfMerge-fileInfo">
                    <div className="pdfMerge-fileName" title={it.file.name}>
                      {it.file.name}
                    </div>
                    <div className="pdfMerge-fileSize">{it.sizeLabel}</div>
                  </div>
                </div>

                <div className="pdfMerge-itemFooter">
                  <button
                    type="button"
                    className="pdfMerge-removeBtn"
                    onClick={() => removeItem(it.id)}
                    disabled={isMerging}
                    aria-label={t("PdfMerge.removeFileAria")}
                  >
                    {t("PdfMerge.remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isMerging ? (
          <div className="pdfMerge-progress">
            <div className="pdfMerge-progressTop">
              <span className="pdfMerge-progressLabel">
                {t("PdfMerge.progressLabel", { current: progress.current, total: progress.total })}
              </span>
              <span className="pdfMerge-progressPercent">{percent}%</span>
            </div>

            <div className="pdfMerge-progressBar">
              <div className="pdfMerge-progressFill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        ) : null}

        <div className="pdfMerge-actions">
          <button
            type="button"
            className="pdfMerge-primaryBtn"
            onClick={mergePdfs}
            disabled={items.length < 2 || isMerging}
          >
            {isMerging ? t("PdfMerge.merging") : t("PdfMerge.merge")}
          </button>

          <a
            className={`pdfMerge-downloadBtn ${mergedPdfUrl ? "" : "pdfMerge-downloadDisabled"}`}
            href={mergedPdfUrl || undefined}
            download={downloadName}
            onClick={(e) => {
              if (!mergedPdfUrl) e.preventDefault();
            }}
          >
            {t("PdfMerge.downloadPdf")}
          </a>
        </div>

        {/* How it works section */}
        <section className="pdfMerge-howItWorks">
          <h2 className="pdfMerge-howItWorksTitle">{t("PdfMerge.howItWorksTitle")}</h2>

          <div className="pdfMerge-howItWorksBody">
            <p className="pdfMerge-howItWorksText">{t("PdfMerge.howItWorksP1")}</p>
            <p className="pdfMerge-howItWorksText">{t("PdfMerge.howItWorksP2")}</p>
            <p className="pdfMerge-howItWorksText">{t("PdfMerge.howItWorksP3")}</p>
            <p className="pdfMerge-howItWorksText">{t("PdfMerge.howItWorksP4")}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PdfMerge;
