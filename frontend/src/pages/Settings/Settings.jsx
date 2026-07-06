import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const language = event.target.value;
  
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  /* TODO:
  [] - Language
  [] - Theme
  [] - Notifications
  [] - Currency
  [] - Account
  */
  return (
    <div>
      <h1>{t("settings.settings")}</h1>
      {/* <p>Here you can adjust your settings.</p> */}

      <div>
      <h2>{t("settings.language")}</h2>
        <label>
          <input type="radio" name="language" value="sv" onChange={handleLanguageChange} checked={i18n.language === "sv"} /> Svenska{" "}
        </label>
        <label>
          <input type="radio" name="language" value="en" onChange={handleLanguageChange} checked={i18n.language === "en"} /> English{" "}
        </label>
      </div>
    </div>
  );
};

export default Settings;
