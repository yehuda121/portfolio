import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  adminCheckAuth,
  adminLogin,
  adminLogout,
  getQuizAdminToken,
  setQuizAdminToken,
} from "../../api/quizApi";

export function useAdminAuth() {
  const { t } = useTranslation();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loginOpen, setLoginOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    if (!getQuizAdminToken()) {
      setAuthenticated(false);
      setCheckingAuth(false);
      setLoginOpen(true);
      return;
    }
    const result = await adminCheckAuth();
    setAuthenticated(result.ok && result.data?.authenticated);
    setCheckingAuth(false);
    if (!result.ok || !result.data?.authenticated) {
      setQuizAdminToken("");
      setLoginOpen(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    const result = await adminLogin(password);
    setLoginLoading(false);

    if (!result.ok || !result.data?.token) {
      setLoginError(t("Quiz.admin.errors.loginFailed"));
      return;
    }

    setQuizAdminToken(result.data.token);
    setAuthenticated(true);
    setLoginOpen(false);
    setPassword("");
  };

  const handleLogout = async () => {
    await adminLogout();
    setQuizAdminToken("");
    setAuthenticated(false);
    setLoginOpen(true);
  };

  return {
    authenticated,
    checkingAuth,
    loginOpen,
    password,
    setPassword,
    loginError,
    loginLoading,
    handleLogin,
    handleLogout,
  };
}
