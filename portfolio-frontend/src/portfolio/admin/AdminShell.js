import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../tools/Quiz/QuizPage.css";
import "./AdminPage.css";
import InlineAlert from "../../components/ui/InlineAlert/InlineAlert";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import { useAdminAuth } from "./useAdminAuth";

function AdminShell({ title, subtitle, backTo, backLabel, children }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("he") ? "he" : "en";
  const isRtl = lang === "he";
  const {
    authenticated,
    checkingAuth,
    loginOpen,
    password,
    setPassword,
    loginError,
    loginLoading,
    handleLogin,
    handleLogout,
  } = useAdminAuth();

  if (checkingAuth) {
    return (
      <div className="quiz-page" dir={isRtl ? "rtl" : "ltr"}>
        <LoadingSpinner label={t("Quiz.loading")} />
      </div>
    );
  }

  return (
    <div className="quiz-page quiz-admin-page" dir={isRtl ? "rtl" : "ltr"}>
      <div className="quiz-header">
        <div className="quiz-header-top">
          <div>
            <div className="quiz-title">{title}</div>
            {subtitle && <div className="quiz-subtitle">{subtitle}</div>}
          </div>
          <div className="quiz-admin-header-actions">
            {backTo && (
              <Link to={backTo} className="quiz-admin-link">
                {backLabel}
              </Link>
            )}
            {authenticated && (
              <button type="button" className="quiz-next-btn" onClick={handleLogout}>
                {t("Quiz.admin.logout")}
              </button>
            )}
          </div>
        </div>
      </div>

      {loginOpen && !authenticated && (
        <div className="quiz-card quiz-admin-login-card">
          <h3>{t("Quiz.admin.loginTitle")}</h3>
          <form onSubmit={handleLogin} className="quiz-admin-login-form">
            <label className="quiz-admin-label">
              {t("Quiz.admin.password")}
              <input
                type="password"
                className="quiz-admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>
            {loginError && <InlineAlert type="error" message={loginError} />}
            <button type="submit" className="quiz-start-btn" disabled={loginLoading || !password}>
              {loginLoading ? t("Quiz.loading") : t("Quiz.admin.login")}
            </button>
          </form>
        </div>
      )}

      {authenticated && children}
    </div>
  );
}

export default AdminShell;
