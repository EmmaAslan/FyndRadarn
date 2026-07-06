import Button from "../../components/Button/Button";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTag, faBullseye, faPiggyBank, faBell, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import WatchCard from "../../components/WatchCard/WatchCard";
import useScreenSize from "../../hooks/useScreenSize";
import { useTranslation, Trans } from "react-i18next";
import formatRelativeDate from "../../utils/formatRelativeDate";
import i18n from "../../i18n";

import watchlists from "../../data/watchlists";
import updates from "../../data/updates";

const currency = "kr"; // Replace with actual currency logic when implemented

const updateIcons = {
  "price-drop": faArrowDown,
  "price-increase": faArrowUp,
  "target-price-hit": faBullseye,
  "lowest-price-hit": faTag,
};

const updateIconClasses = {
  "price-drop": "price-drop",
  "price-increase": "price-increase",
  "target-price-hit": "target-price-hit",
  "lowest-price-hit": "lowest-price-hit",
};

const Dashboard = () => {
  const screenSize = useScreenSize();
  const { t } = useTranslation();

  return (
    <>
      {screenSize === "mobile" ? (
        <div className="dashboard-mobile">
          <div className="dashboard-header">
            <h2>{t("dashboard.title", { name: "Emma" })}</h2>
            <span>{t("dashboard.subtitle")}</span>

            <Button type="primary" to="/add-product">
              + {t("dashboard.watch-new-product")}
            </Button>
          </div>

          {/* <div className="dashboard-stats">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-card card">
                <FontAwesomeIcon icon={stat.icon} />
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            ))}
          </div> */}

          <div className="section-active-watchlists">
            <h2 className="dashboard-section-title">{t("dashboard.active-watchlists")}</h2>
            <div className="dashboard-active-items">
              {watchlists.slice(0, 3).map((item) => (
                <WatchCard key={item.id} item={item} screenSize={screenSize} />
              ))}

              <Button type="primary" to="/watchlist">
                {t("dashboard.show-all-active")}{" "}
              </Button>
            </div>
          </div>

          <div className="section-updates">
            <h2 className="dashboard-section-title">{t("dashboard.latest-updates")}</h2>

            <div className="dashboard-updates">
              {updates.slice(0, 3).map((update) => (
                <div key={update.id} className="update-card">
                  <div className={`update-icon ${updateIconClasses[update.type] || ""}`}>
                    <FontAwesomeIcon icon={updateIcons[update.type] || faBell} />
                  </div>

                  <p className="update-message">
                    <Trans
                      i18nKey={`dashboard.notifications.${update.type}.message`}
                      values={{
                        product: update.product,
                        price: update.priceDifference,
                        targetPrice: update.targetPrice,
                        lowestPrice: update.lowestPrice,
                      }}
                      components={{
                        strong: <strong />,
                      }}
                    />
                  </p>

                  <small className="update-time">{formatRelativeDate(update.createdAt, i18n.language)}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-desktop">
          <div className="dashboard-header">
            <h2>{t("dashboard.title", { name: "Emma" })}</h2>
            <span>{t("dashboard.subtitle")}</span>

            <Button type="primary" to="/add-product">
              + {t("dashboard.watch-new-product")}
            </Button>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card card">
              <FontAwesomeIcon icon={faTag} />
              <h3>{12}</h3>
              <p>{t("dashboard.stats.active-watchlists")}</p>
            </div>

            <div className="stat-card card">
              <FontAwesomeIcon icon={faBullseye} />
              <h3>{5}</h3>
              <p>{t("dashboard.stats.target-price")}</p>
            </div>

            <div className="stat-card card">
              <FontAwesomeIcon icon={faPiggyBank} />
              <h3>
                {2340} {currency}
              </h3>
              <p>{t("dashboard.stats.saved")}</p>
            </div>

            <div className="stat-card card">
              <FontAwesomeIcon icon={faBell} />
              <h3>{8}</h3>
              <p>{t("dashboard.stats.notifications")}</p>
            </div>
          </div>

          <div className="dashboard-content">
            <section className="dashboard-section">
              <h2 className="dashboard-section-title">{t("dashboard.active-watchlists")}</h2>
              <div className="dashboard-active-items">
                {watchlists.slice(0, 3).map((item) => (
                  <WatchCard key={item.id} item={item} screenSize={screenSize} />
                ))}

                <Button type="primary" onClick={() => console.log("Klickad!")} to="/watchlist">
                  {t("dashboard.show-all-active")}
                  <FontAwesomeIcon icon={faArrowRight} className="fa-arrow-right" />
                </Button>
              </div>
            </section>

            <section className="dashboard-section section-updates">
              <h2 className="dashboard-section-title">{t("dashboard.latest-updates")}</h2>
              <div className="dashboard-updates">
                {updates.map((update) => (
                  <div key={update.id} className="update-card">
                    <div className={`update-icon ${updateIconClasses[update.type] || ""}`}>
                      <FontAwesomeIcon icon={updateIcons[update.type] || faBell} />
                    </div>

                    <p className="update-message">
                      <Trans
                        i18nKey={`dashboard.notifications.${update.type}.message`}
                        values={{
                          product: update.product,
                          price: update.priceDifference,
                          targetPrice: update.targetPrice,
                          lowestPrice: update.lowestPrice,
                        }}
                        components={{ strong: <strong /> }}
                      />
                    </p>
                    <small className="update-time">{formatRelativeDate(update.createdAt)}</small>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
