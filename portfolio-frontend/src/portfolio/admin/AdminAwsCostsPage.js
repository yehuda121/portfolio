import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { adminFetchAwsCosts } from "../../api/quizApi";
import InlineAlert from "../../components/ui/InlineAlert/InlineAlert";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import AdminShell from "./AdminShell";
import "./AdminPage.css";

const COST_ERROR_KEYS = {
  cost_explorer_access_denied: "Admin.costs.errors.accessDenied",
  cost_explorer_disabled: "Admin.costs.errors.disabled",
  aws_not_configured: "Admin.costs.errors.awsNotConfigured",
  costs_unavailable: "Admin.costs.errors.unavailable",
};

const CHART_COLORS = {
  primary: "#38bdf8",
  grid: "rgba(148, 163, 184, 0.15)",
  axis: "#9ca3af",
  tooltipBg: "#0f172a",
  tooltipBorder: "rgba(148, 163, 184, 0.25)",
};

function formatCurrency(amount, currency, locale) {
  if (amount == null || Number.isNaN(amount)) return "—";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${Number(amount).toFixed(2)} ${currency || "USD"}`;
  }
}

function formatShortDate(dateStr, locale) {
  if (!dateStr) return "";
  const date = new Date(`${dateStr}T00:00:00`);
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(date);
}

function formatDateTime(iso, locale) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function CostsTooltip({ active, payload, label, currency, locale, displayLabel }) {
  if (!active || !payload?.length) return null;
  const value = payload[0]?.value;
  const title = displayLabel ?? label;
  return (
    <div className="admin-costs-tooltip">
      {title && <div className="admin-costs-tooltip-label">{title}</div>}
      <div className="admin-costs-tooltip-value">{formatCurrency(value, currency, locale)}</div>
    </div>
  );
}

const AdminAwsCostsPage = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.startsWith("he") ? "he-IL" : "en-US";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [costs, setCosts] = useState(null);

  const loadCosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await adminFetchAwsCosts();
    setLoading(false);

    if (!result.ok) {
      const key = COST_ERROR_KEYS[result.error] || COST_ERROR_KEYS.costs_unavailable;
      setError(t(key));
      return;
    }

    setCosts(result.data);
  }, [t]);

  useEffect(() => {
    loadCosts();
  }, [loadCosts]);

  const currency = costs?.currency || "USD";
  const services = costs?.costsByService || [];
  const dailyCosts = costs?.dailyCosts || [];
  const monthToDateTotal = costs?.monthToDateTotal ?? 0;
  const isLowCost = monthToDateTotal < 0.01;

  const topService = services[0];
  const barChartHeight = useMemo(
    () => Math.min(520, Math.max(220, services.length * 34)),
    [services.length]
  );

  const serviceChartData = useMemo(
    () => services.map((row) => ({
      service: row.service,
      amount: row.amount,
      shortService: row.service.length > 28 ? `${row.service.slice(0, 26)}…` : row.service,
    })),
    [services]
  );

  return (
    <AdminShell
      title={t("Admin.costs.title")}
      subtitle={t("Admin.costs.subtitle")}
      backTo="/Admin"
      backLabel={t("Admin.backToDashboard")}
    >
      {loading && (
        <div className="quiz-card admin-costs-state-card">
          <LoadingSpinner label={t("Quiz.loading")} />
        </div>
      )}

      {error && (
        <div className="quiz-card admin-costs-state-card">
          <InlineAlert type="error" message={error} />
        </div>
      )}

      {!loading && !error && costs && (
        <div className="admin-costs-dashboard">
          <div className="admin-costs-period-banner">
            {t("Admin.costs.period", {
              start: costs.period?.start,
              end: costs.period?.end,
            })}
          </div>

          {isLowCost && (
            <div className="admin-costs-low-hint">{t("Admin.costs.lowCostHint")}</div>
          )}

          <div className="admin-costs-summary-grid">
            <div className="admin-costs-summary-card">
              <div className="admin-costs-summary-label">{t("Admin.costs.summaryMtd")}</div>
              <div className="admin-costs-summary-value">
                {formatCurrency(monthToDateTotal, currency, locale)}
              </div>
            </div>
            <div className="admin-costs-summary-card">
              <div className="admin-costs-summary-label">{t("Admin.costs.summaryServices")}</div>
              <div className="admin-costs-summary-value">{services.length}</div>
            </div>
            <div className="admin-costs-summary-card">
              <div className="admin-costs-summary-label">{t("Admin.costs.summaryTopService")}</div>
              <div className="admin-costs-summary-value admin-costs-summary-value-text" title={topService?.service}>
                {topService?.service || t("Admin.costs.noTopService")}
              </div>
              {topService && (
                <div className="admin-costs-summary-meta">
                  {formatCurrency(topService.amount, currency, locale)}
                </div>
              )}
            </div>
            <div className="admin-costs-summary-card">
              <div className="admin-costs-summary-label">{t("Admin.costs.summaryUpdated")}</div>
              <div className="admin-costs-summary-value admin-costs-summary-value-text">
                {formatDateTime(costs.lastUpdated, locale)}
              </div>
            </div>
          </div>

          <div className="admin-costs-charts-grid">
            <div className="quiz-card admin-costs-chart-card">
              <h3 className="admin-costs-section-title">{t("Admin.costs.chartByService")}</h3>
              {services.length === 0 ? (
                <div className="admin-costs-chart-empty">{t("Admin.costs.chartNoData")}</div>
              ) : (
                <div className="admin-costs-chart-wrap" style={{ height: barChartHeight }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={serviceChartData}
                      layout="vertical"
                      margin={{ top: 4, right: 12, left: 4, bottom: 4 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} horizontal={false} />
                      <XAxis
                        type="number"
                        tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
                        tickFormatter={(v) => formatCurrency(v, currency, locale)}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="shortService"
                        width={120}
                        tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(56, 189, 248, 0.08)" }}
                        content={({ active, payload }) => (
                          <CostsTooltip
                            active={active}
                            payload={payload}
                            currency={currency}
                            locale={locale}
                            displayLabel={payload?.[0]?.payload?.service}
                          />
                        )}
                      />
                      <Bar dataKey="amount" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} maxBarSize={22} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="quiz-card admin-costs-chart-card">
              <h3 className="admin-costs-section-title">{t("Admin.costs.chartDailyTrend")}</h3>
              {dailyCosts.length === 0 ? (
                <div className="admin-costs-chart-empty">{t("Admin.costs.chartNoData")}</div>
              ) : (
                <div className="admin-costs-chart-wrap admin-costs-line-chart-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyCosts} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
                        tickFormatter={(d) => formatShortDate(d, locale)}
                        axisLine={false}
                        tickLine={false}
                        minTickGap={24}
                      />
                      <YAxis
                        tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
                        tickFormatter={(v) => formatCurrency(v, currency, locale)}
                        axisLine={false}
                        tickLine={false}
                        width={72}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => (
                          <CostsTooltip
                            active={active}
                            payload={payload}
                            currency={currency}
                            locale={locale}
                            displayLabel={formatShortDate(label, locale)}
                          />
                        )}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke={CHART_COLORS.primary}
                        strokeWidth={2}
                        dot={dailyCosts.length <= 14}
                        activeDot={{ r: 4, fill: CHART_COLORS.primary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          <div className="quiz-card admin-costs-table-card">
            <h3 className="admin-costs-section-title">{t("Admin.costs.tableTitle")}</h3>
            {services.length === 0 ? (
              <div className="quiz-admin-empty">{t("Admin.costs.empty")}</div>
            ) : (
              <div className="admin-costs-table-wrap">
                <table className="admin-costs-table">
                  <thead>
                    <tr>
                      <th>{t("Admin.costs.serviceColumn")}</th>
                      <th>{t("Admin.costs.amountColumn")}</th>
                      <th>{t("Admin.costs.percentColumn")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((row) => (
                      <tr key={row.service}>
                        <td>{row.service}</td>
                        <td>{formatCurrency(row.amount, currency, locale)}</td>
                        <td>{row.percentage.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
};

export default AdminAwsCostsPage;
