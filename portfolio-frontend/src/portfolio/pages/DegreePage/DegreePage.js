import React from 'react';
import { useTranslation } from 'react-i18next';
import './DegreePage.css';

function DegreePage() {
  const { t, i18n } = useTranslation();
  const diplomaSrc =
    i18n.language === 'he'
      ? `${process.env.PUBLIC_URL}/diploma/diploma-he.jpeg`
      : `${process.env.PUBLIC_URL}/diploma/diploma-en.jpeg`;

  return (
    <div className="degree-page">
      <div className="degree-card">
        <header className="degree-header">
          <h1 className="degree-title">{t('Degree.title')}</h1>
          <p className="degree-institution">{t('Degree.institution')}</p>
        </header>

        <div className="degree-image-wrapper">
          <img
            src={diplomaSrc}
            alt={t('Degree.diplomaAlt')}
            className="degree-image"
          />
        </div>

        <div className="degree-actions">
          <a
            href={diplomaSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="degree-open-btn"
          >
            {t('Degree.openFullResolution')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default DegreePage;
