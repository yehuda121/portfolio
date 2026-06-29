// PdfMerge.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { useTranslation } from "react-i18next";
import "./PdfMerge.css";

// Note: Comments are in English only, as requested.

const MAX_FILES = 15;

const createId = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;

const revokeFileThumbnails = (fileItem) => {
  fileItem.pages?.forEach((page) => {
    if (page.thumbnailUrl) URL.revokeObjectURL(page.thumbnailUrl);
  });
};

const applyPageRotation = (pdfPage, rotationDeg) => {
  const normalized = ((rotationDeg % 360) + 360) % 360;
  if (normalized === 0) return;

  const clockwise = (360 - normalized) % 360;
  const existing = pdfPage.getRotation().angle;
  pdfPage.setRotation(degrees((existing + clockwise) % 360));
};

const buildFileItem = async (file, formatBytes) => {
  const bytes = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(bytes);
  const pageCount = srcPdf.getPageCount();
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    const page = srcPdf.getPage(i);
    const { width, height } = page.getSize();

    const thumbPdf = await PDFDocument.create();
    const [copied] = await thumbPdf.copyPages(srcPdf, [i]);
    thumbPdf.addPage(copied);
    const thumbBytes = await thumbPdf.save();
    const thumbnailUrl = URL.createObjectURL(
      new Blob([thumbBytes], { type: "application/pdf" })
    );

    pages.push({
      id: createId(),
      originalPageIndex: i,
      rotationDeg: 0,
      thumbnailUrl,
      width,
      height,
    });
  }

  return {
    id: createId(),
    fileName: file.name,
    file,
    sizeLabel: formatBytes(file.size),
    pages,
  };
};

const PdfMerge = () => {
  const { t } = useTranslation();

  const [files, setFiles] = useState([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const dragRef = useRef(null);

  const acceptTypes = useMemo(() => ["application/pdf"], []);

  useEffect(() => {
    return () => {
      files.forEach(revokeFileThumbnails);
      if (mergedPdfUrl) URL.revokeObjectURL(mergedPdfUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const invalidateMergedPdf = () => {
    setMergedPdfUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  const addFiles = async (fileList) => {
    setErrorMsg("");
    invalidateMergedPdf();

    const incoming = Array.from(fileList || []);
    if (incoming.length === 0) return;

    const valid = incoming.filter(
      (f) => acceptTypes.includes(f.type) || f.name.toLowerCase().endsWith(".pdf")
    );
    if (valid.length !== incoming.length) {
      setErrorMsg(t("PdfMerge.invalidFileType"));
    }

    const availableSlots = MAX_FILES - files.length;
    if (availableSlots <= 0) {
      setErrorMsg(t("PdfMerge.maxFilesReached", { max: MAX_FILES }));
      return;
    }

    const toAdd = valid.slice(0, availableSlots);
    if (valid.length > availableSlots) {
      setErrorMsg(t("PdfMerge.someFilesIgnored", { max: MAX_FILES }));
    }

    if (toAdd.length === 0) return;

    setIsLoadingFiles(true);
    try {
      const parsed = await Promise.all(
        toAdd.map((file) => buildFileItem(file, formatBytes))
      );
      setFiles((prev) => [...prev, ...parsed]);
    } catch {
      setErrorMsg(t("PdfMerge.parseFailed"));
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const onFileChange = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const removeFile = (fileId) => {
    invalidateMergedPdf();
    setFiles((prev) => {
      const target = prev.find((f) => f.id === fileId);
      if (target) revokeFileThumbnails(target);
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const clearAll = () => {
    invalidateMergedPdf();
    setErrorMsg("");
    setFiles((prev) => {
      prev.forEach(revokeFileThumbnails);
      return [];
    });
  };

  const rotatePageLeft = (fileId, pageId) => {
    invalidateMergedPdf();
    setFiles((prev) =>
      prev.map((file) => {
        if (file.id !== fileId) return file;
        return {
          ...file,
          pages: file.pages.map((page) =>
            page.id === pageId
              ? { ...page, rotationDeg: page.rotationDeg + 90 }
              : page
          ),
        };
      })
    );
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onFileDragStart = (fileId) => {
    dragRef.current = { scope: "file", fileId };
  };

  const onFileDrop = (targetFileId) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || drag.scope !== "file" || drag.fileId === targetFileId) return;

    invalidateMergedPdf();
    setFiles((prev) => {
      const from = prev.findIndex((f) => f.id === drag.fileId);
      const to = prev.findIndex((f) => f.id === targetFileId);
      if (from < 0 || to < 0 || from === to) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const onPageDragStart = (fileId, pageId) => {
    dragRef.current = { scope: "page", fileId, pageId };
  };

  const onPageDrop = (fileId, targetPageId) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (
      !drag ||
      drag.scope !== "page" ||
      drag.fileId !== fileId ||
      drag.pageId === targetPageId
    ) {
      return;
    }

    invalidateMergedPdf();
    setFiles((prev) =>
      prev.map((file) => {
        if (file.id !== fileId) return file;
        const pages = [...file.pages];
        const from = pages.findIndex((p) => p.id === drag.pageId);
        const to = pages.findIndex((p) => p.id === targetPageId);
        if (from < 0 || to < 0 || from === to) return file;
        const [moved] = pages.splice(from, 1);
        pages.splice(to, 0, moved);
        return { ...file, pages };
      })
    );
  };

  const mergePdfs = async () => {
    setErrorMsg("");
    invalidateMergedPdf();

    if (files.length < 2) {
      setErrorMsg(t("PdfMerge.needAtLeastTwo"));
      return;
    }

    const totalPages = files.reduce((sum, file) => sum + file.pages.length, 0);
    if (totalPages === 0) {
      setErrorMsg(t("PdfMerge.emptyPages"));
      return;
    }

    setIsMerging(true);
    setProgress({ current: 0, total: totalPages });

    try {
      const outPdf = await PDFDocument.create();
      let processed = 0;

      for (const fileItem of files) {
        const bytes = await fileItem.file.arrayBuffer();
        const srcPdf = await PDFDocument.load(bytes);

        for (const pageItem of fileItem.pages) {
          const [copiedPage] = await outPdf.copyPages(srcPdf, [
            pageItem.originalPageIndex,
          ]);
          applyPageRotation(copiedPage, pageItem.rotationDeg);
          outPdf.addPage(copiedPage);

          processed += 1;
          setProgress({ current: processed, total: totalPages });
        }
      }

      const mergedBytes = await outPdf.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch {
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

  const totalPageCount = useMemo(
    () => files.reduce((sum, file) => sum + file.pages.length, 0),
    [files]
  );

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
              disabled={isLoadingFiles || isMerging}
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
            disabled={files.length === 0 || isLoadingFiles || isMerging}
          >
            {t("PdfMerge.clearAll")}
          </button>
        </div>

        <div
          className="pdfMerge-dropZone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (!isLoadingFiles && !isMerging) {
              addFiles(e.dataTransfer.files);
            }
          }}
        >
          <div className="pdfMerge-dropText">
            <div className="pdfMerge-dropTitle">{t("PdfMerge.dropTitle")}</div>
            <div className="pdfMerge-dropHint">{t("PdfMerge.dropHint")}</div>
          </div>
        </div>

        {errorMsg ? <div className="pdfMerge-alert">{errorMsg}</div> : null}

        {isLoadingFiles ? (
          <div className="pdfMerge-loading">{t("PdfMerge.loadingFiles")}</div>
        ) : null}

        <div className="pdfMerge-sectionHeader">
          <div className="pdfMerge-sectionTitle">{t("PdfMerge.previewTitle")}</div>
          <div className="pdfMerge-sectionNote">{t("PdfMerge.reorderHint")}</div>
          <div className="pdfMerge-sectionNote">{t("PdfMerge.reorderPagesHint")}</div>
        </div>

        {files.length === 0 ? (
          <div className="pdfMerge-empty">{t("PdfMerge.emptyState")}</div>
        ) : (
          <div className="pdfMerge-fileList" role="list">
            {files.map((fileItem, fileIdx) => (
              <div
                key={fileItem.id}
                className="pdfMerge-fileBlock"
                role="listitem"
                draggable={!isMerging}
                onDragStart={() => onFileDragStart(fileItem.id)}
                onDragOver={onDragOver}
                onDrop={() => onFileDrop(fileItem.id)}
              >
                <div className="pdfMerge-fileHeader">
                  <div className="pdfMerge-fileRow">
                    <div className="pdfMerge-indexPill">{fileIdx + 1}</div>
                    <div className="pdfMerge-fileInfo">
                      <div className="pdfMerge-fileName" title={fileItem.fileName}>
                        {fileItem.fileName}
                      </div>
                      <div className="pdfMerge-fileSize">
                        {fileItem.sizeLabel} ·{" "}
                        {t("PdfMerge.pageCount", { count: fileItem.pages.length })}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="pdfMerge-removeBtn"
                    onClick={() => removeFile(fileItem.id)}
                    disabled={isMerging}
                    aria-label={t("PdfMerge.removeFileAria")}
                  >
                    {t("PdfMerge.remove")}
                  </button>
                </div>

                <div className="pdfMerge-pagesLabel">{t("PdfMerge.pagesLabel")}</div>

                <div className="pdfMerge-pageGrid" role="list">
                  {fileItem.pages.map((page, pageIdx) => {
                    const rotation = page.rotationDeg % 360;
                    const swap = rotation === 90 || rotation === 270;
                    const aspectW = swap ? page.height : page.width;
                    const aspectH = swap ? page.width : page.height;

                    return (
                      <div
                        key={page.id}
                        className="pdfMerge-pageCard"
                        role="listitem"
                        draggable={!isMerging}
                        onDragStart={(e) => {
                          e.stopPropagation();
                          onPageDragStart(fileItem.id, page.id);
                        }}
                        onDragOver={onDragOver}
                        onDrop={(e) => {
                          e.stopPropagation();
                          onPageDrop(fileItem.id, page.id);
                        }}
                      >
                        <div className="pdfMerge-pageLabel">
                          {t("PdfMerge.pageLabel", { num: pageIdx + 1 })}
                        </div>

                        <div
                          className="pdfMerge-pageThumbWrap"
                          style={{ aspectRatio: `${aspectW} / ${aspectH}` }}
                        >
                          <div
                            className="pdfMerge-pageThumbInner"
                            style={{ transform: `rotate(-${rotation}deg)` }}
                          >
                            <iframe
                              title={t("PdfMerge.pagePreviewAria", {
                                file: fileItem.fileName,
                                num: pageIdx + 1,
                              })}
                              src={`${page.thumbnailUrl}#toolbar=0&navpanes=0`}
                              className="pdfMerge-pagePreview"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          className="pdfMerge-rotateBtn"
                          onClick={() => rotatePageLeft(fileItem.id, page.id)}
                          disabled={isMerging}
                          aria-label={t("PdfMerge.rotateLeftAria")}
                        >
                          <span className="pdfMerge-rotateIcon" aria-hidden="true">
                            ↺
                          </span>
                          {t("PdfMerge.rotateLeft")}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {isMerging ? (
          <div className="pdfMerge-progress">
            <div className="pdfMerge-progressTop">
              <span className="pdfMerge-progressLabel">
                {t("PdfMerge.progressPagesLabel", {
                  current: progress.current,
                  total: progress.total,
                })}
              </span>
              <span className="pdfMerge-progressPercent">{percent}%</span>
            </div>

            <div className="pdfMerge-progressBar">
              <div
                className="pdfMerge-progressFill"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="pdfMerge-actions">
          <button
            type="button"
            className="pdfMerge-primaryBtn"
            onClick={mergePdfs}
            disabled={
              files.length < 2 || isMerging || isLoadingFiles || totalPageCount === 0
            }
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
