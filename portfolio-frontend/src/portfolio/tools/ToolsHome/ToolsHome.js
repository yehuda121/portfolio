// ToolsHome.js
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ToolsHome.css";

const ToolsHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Central registry for tools
  const tools = useMemo(
    () => [
      {
        id: "jpg-to-pdf",
        titleKey: "ToolsHome.jpgToPdfTitle",
        descKey: "ToolsHome.jpgToPdfDesc",
        actionKey: "ToolsHome.openTool",
        route: "/JpgToPdf",
      },
      {
        id: "pdf-merge",
        titleKey: "ToolsHome.pdfMergeTitle",
        descKey: "ToolsHome.pdfMergeDesc",
        actionKey: "ToolsHome.openTool",
        route: "/PdfMerge"
      },
      {
        id: "quiz",
        titleKey: "ToolsHome.quizTitle",
        descKey: "ToolsHome.quizDesc",
        actionKey: "ToolsHome.openTool",
        route: "/Quiz",
      }
    ],
    []
  );

  return (
    <div className="tools-page">
      <div className="tools-header">
        <h1 className="tools-title">{t("ToolsHome.pageTitle")}</h1>
        <p className="tools-subtitle">{t("ToolsHome.pageSubtitle")}</p>
      </div>

      <div className="tools-grid">
        {tools.map((tool) => (
          <div key={tool.id} className="tool-card">
            <div>
              <h2 className="tool-card-title">
                {t(tool.titleKey)}
              </h2>
              <p className="tool-card-description">
                {t(tool.descKey)}
              </p>
            </div>

            <div className="tool-card-actions">
              <button
                className="tool-card-button"
                onClick={() => navigate(tool.route)}
              >
                {t(tool.actionKey)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsHome;
