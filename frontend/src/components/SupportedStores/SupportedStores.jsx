import "./SupportedStores.css";
import { useState } from "react";
import { getStores } from "../../services/storeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const logoToken = import.meta.env.VITE_LOGO_DEV_TOKEN;

const SupportedStores = () => {
  const [stores, setStores] = useState([]);
  const [showStores, setShowStores] = useState(false);

  const handleGetStores = async (event) => {
    event.preventDefault();

    setShowStores(!showStores);

    if (stores.length === 0) {
      try {
        const data = await getStores();

        setStores(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    }
  };

  return (
    <div className="supported-stores">
      <button className="toggle-stores-button" onClick={handleGetStores}>
        <span>Supported stores</span>
        <FontAwesomeIcon icon={showStores ? faAngleUp : faAngleDown} />
      </button>

      {showStores && (
        <div className="logo-container">
          {stores.map((store) => {
            const logoDomain = store.logoDomain || store.domain;
            const logoUrl = `https://img.logo.dev/${logoDomain}?token=${logoToken}&format=png&size=64&retina=true&fallback=monogram`;
            console.log(store.name, logoUrl);

            return (
              <a key={store.name} className="logo-item" href={`https://${store.domain}?utm_source=fyndradarn&utm_medium=referral`} target="_blank" rel="noopener noreferrer">
                <img src={logoUrl} alt={store.name} />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SupportedStores;
