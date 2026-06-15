import React from "react";
import "./WizardArenaGame.css";
import { useTranslation } from "react-i18next";

function WizardArenaGame() {
  const { t } = useTranslation();

  return (
    <div className="wizardarena-page">
      <div className="wizardarena-header">
        <h1 className="wizardarena-title">{t("wizardArena.title")}</h1>
        <p className="wizardarena-subtitle">{t("wizardArena.subtitle")}</p>
        <p className="wizardarena-instructions">{t("wizardArena.instructions")}</p>
        <p className="wizardarena-keyboard-warning">{t("wizardArena.keyboardWarning")}</p>
      </div>

      <div className="wizardarena-frame-wrapper">
        <iframe
          src={`${process.env.PUBLIC_URL}/unity/wizard-arena/index.html`}
          title="Wizard Arena 3D"
          className="wizardarena-frame"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default WizardArenaGame;
