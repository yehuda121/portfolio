import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminShell from "./AdminShell";

const AdminDashboardPage = () => {
  const { t } = useTranslation();

  const actions = useMemo(
    () => [
      {
        id: "questions",
        titleKey: "Admin.dashboard.manageQuestionsTitle",
        descKey: "Admin.dashboard.manageQuestionsDesc",
        route: "/Admin/questions",
      },
      {
        id: "chat",
        titleKey: "Admin.dashboard.characterChatTitle",
        descKey: "Admin.dashboard.characterChatDesc",
        route: "/Admin/chat",
      },
    ],
    []
  );

  return (
    <AdminShell
      title={t("Admin.dashboard.title")}
      subtitle={t("Admin.dashboard.subtitle")}
    >
      <div className="admin-dashboard-grid">
        {actions.map((action) => (
          <div key={action.id} className="admin-dashboard-card">
            <div>
              <h2 className="admin-dashboard-card-title">{t(action.titleKey)}</h2>
              <p className="admin-dashboard-card-description">{t(action.descKey)}</p>
            </div>
            <div className="admin-dashboard-card-actions">
              <Link to={action.route} className="admin-dashboard-card-link">
                {t("Admin.dashboard.open")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
};

export default AdminDashboardPage;
