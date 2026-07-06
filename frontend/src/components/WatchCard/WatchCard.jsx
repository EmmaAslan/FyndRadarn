
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowUpRightFromSquare,
  faEllipsisVertical,
  faChevronRight,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import useScreenSize from "../../hooks/useScreenSize";
import "./WatchCard.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useTranslation } from "react-i18next";

const WatchCard = ({ item }) => {
  const screenSize = useScreenSize();
  const { t } = useTranslation();

  return (
    <>
      {screenSize === "mobile" ? (
        <div key={item.id} className="mobile-active-item-card card">
          <div className="mobile-active-item-card-img">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="mobile-active-item-card-details">
            <div className="mobile-active-item-card-heading">
              <div className="mobile-active-item-card-name-store">
                <h3>{item.name}</h3>
                <div className="mobile-active-item-card-store small-text">
                  <FontAwesomeIcon icon={faStore} className="store-icon" />
                  {item.store}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="mobile-show-product-arrow"
              />
            </div>

            <div className="mobile-active-item-card-pricing-row">
              <div className="mobile-active-item-card-price-row">
                <span className="mobile-active-item-card-current value">
                  {item.currentPrice} kr
                </span>
                <span className="mobile-active-item-card-price-change">
                  <FontAwesomeIcon icon={faArrowUp} /> 100kr
                </span>
              </div>

              <div className="mobile-active-item-card-target">
                <p className="mobile-card-label small-text">{t("watchcard.target-price")}</p>
                <p className="mobile-active-item-card-target-value value">
                  <span>{item.targetPrice} kr</span>
                </p>
              </div>
            </div>
            <ProgressBar
              currentPrice={item.currentPrice}
              targetPrice={item.targetPrice}
              className="mobile-progress-row"
            />
          </div>
        </div>
      ) : (
        <div key={item.id} className="desktop-active-item-card card">
          <div className="desktop-active-item-card-img">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="desktop-active-item-card-details">
            <h3>{item.name}</h3>
            <div className="desktop-active-item-card-store small-text">
              <FontAwesomeIcon icon={faStore} className="store-icon" />
              {item.store}
            </div>
            <p className="desktop-card-label small-text">
              {t("watchcard.last-updated")}: {item.updated}
            </p>
          </div>
          <div className="desktop-active-item-card-pricing">
            <p className="desktop-card-label small-text">{t("watchcard.current-price")}</p>
            <p className="desktop-active-item-card-price-row">
              <span className="desktop-active-item-card-current value">
                {item.currentPrice} kr
              </span>
              <span className="desktop-active-item-card-price-change">
                <FontAwesomeIcon icon={faArrowUp} /> 100kr
              </span>
            </p>
            <p className="desktop-card-hint small-text">
              {t("watchcard.since-last-update")}
            </p>
          </div>
          <div className="desktop-active-item-card-goal">
            <p className="desktop-card-label small-text">{t("watchcard.target-price")}</p>
            <p className="desktop-active-item-card-target value">
              <span>{item.targetPrice} kr</span>
            </p>
            <ProgressBar
              currentPrice={item.currentPrice}
              targetPrice={item.targetPrice}
              className="desktop-progress-row"
            />
          </div>
          <div className="desktop-active-item-card-actions">
            <Button href={item.url} variant="secondary">
              {t("watchcard.show")}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="fa-arrow-up-right-from-square desktop-show-product-arrow"
              />
            </Button>
            <div className="action-buttons">
              <Button
                variant="secondary"
                onClick={() => console.log("Klickad!")}
              >
                {t("watchcard.edit")}
              </Button>

              <Button
                variant="secondary"
                onClick={() => console.log("Klickad!")}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchCard;
