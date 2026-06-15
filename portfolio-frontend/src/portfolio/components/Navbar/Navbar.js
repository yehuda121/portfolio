import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" aria-label={t('navbar.homeAria')}>
          <span className="navbar-logo-circle">
            <svg
              className="navbar-logo-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-4.25h-3V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>

        <div className="navbar-right">
          <button
            type="button"
            className="navbar-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="navbar-mobile-menu"
            aria-label={menuOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
          >
            <span className="navbar-menu-bar" />
            <span className="navbar-menu-bar" />
            <span className="navbar-menu-bar" />
          </button>

          <nav
            id="navbar-mobile-menu"
            className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}
          >
            <Link to="/ToolsHome" className="navbar-link" onClick={closeMenu}>
              {t('navbar.tools')}
            </Link>

            <Link to="/GamesHome" className="navbar-link" onClick={closeMenu}>
              {t('navbar.games')}
            </Link>

            <button
              type="button"
              className="navbar-link"
              onClick={() => scrollToSection('projects-section')}
            >
              {t('navbar.projects')}
            </button>

            <button
              type="button"
              className="navbar-link"
              onClick={() => scrollToSection('contact-section')}
            >
              {t('navbar.contact')}
            </button>

            <Link
              to="/Quiz/Admin"
              className="navbar-link navbar-link-admin"
              onClick={closeMenu}
            >
              {t('navbar.admin')}
            </Link>
          </nav>

          <button
            type="button"
            className="navbar-lang-btn"
            onClick={() => handleLanguageChange(i18n.language === 'en' ? 'he' : 'en')}
            aria-label={i18n.language === 'en' ? t('navbar.langSwitchToHe') : t('navbar.langSwitchToEn')}
          >
            <svg
              className="navbar-lang-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.6"
              />
              <path
                d="M2 12h20M12 2a14 14 0 0 1 0 20M12 2a14 14 0 0 0 0 20"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="navbar-lang-text">
              {i18n.language === 'he' ? 'HE' : 'EN'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
