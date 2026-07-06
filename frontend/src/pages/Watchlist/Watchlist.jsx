import "./Watchlist.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowUpRightFromSquare,
  faEllipsisVertical,
  faChevronRight,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import useScreenSize from "../../hooks/useScreenSize";
import Button from "../../components/Button/Button";

import watchlists from "../../data/watchlists";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const Watchlist = () => {
  const screenSize = useScreenSize();
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = watchlists.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });


  return (
    <>
      {screenSize === "mobile" ? (
        <div className="wl-mobile">
          <div className="wl-header">
            <h2>Dina bevakningar!</h2>
            <Button type="primary" onClick={() => console.log("Klickad!")}>
              + Fynda något nytt
            </Button>
          </div>

          <h2 className="wl-dashboard-section-title">Aktiva bevakningar</h2>
          <div className="wl-cards-m">
            {filteredItems.map((item) => (
              <div key={item.id} className="wl-card-m card">
                <div className="wl-card-m-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="wl-card-m-details">
                  <div className="wl-card-m-head">
                    <div className="wl-card-m-name-store">
                      <h3>{item.name}</h3>
                      <div className="wl-card-m-store wl-small-text">
                        <FontAwesomeIcon
                          icon={faStore}
                          className="wl-store-icon"
                        />
                        {item.store}
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="wl-arrow-m"
                    />
                  </div>

                  <div className="wl-card-m-pricing">
                    <div className="wl-card-m-price">
                      <span className="wl-card-m-current wl-value">
                        {item.currentPrice} kr
                      </span>
                      <span className="wl-card-m-price-change">
                        <FontAwesomeIcon icon={faArrowUp} /> 100kr
                      </span>
                    </div>

                    <div className="wl-card-m-target">
                      <p className="wl-label-m wl-small-text">Målpris</p>
                      <p className="wl-card-m-target-value wl-value">
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
            ))}
          </div>
        </div>
      ) : (
        <div className="wl-desktop">
          <div className="wl-header">
            <h2>Dina bevakningar!</h2>
            <Button type="primary" onClick={() => console.log("Klickad!")}>
              + Fynda något nytt
            </Button>
          </div>

          <div className="wl-content">
            <div className="wl-tabs">
              <button className={"wl-tab" + (activeTab === "all" ? " wl-tab-active" : "")} onClick={() => setActiveTab("all")}>
                Alla ({watchlists.length})
              </button>
              <button className={"wl-tab" + (activeTab === "active" ? " wl-tab-active" : "")} onClick={() => setActiveTab("active")}>
                Aktiva (
                {watchlists.filter((item) => item.status === "active").length})
              </button>
              <button className={"wl-tab" + (activeTab === "finished" ? " wl-tab-active" : "")} onClick={() => setActiveTab("finished")}>
                Avslutade (
                {watchlists.filter((item) => item.status === "finished").length}
                )
              </button>
              <button className={"wl-tab" + (activeTab === "paused" ? " wl-tab-active" : "")} onClick={() => setActiveTab("paused")}>
                Pausade (
                {watchlists.filter((item) => item.status === "paused").length})
              </button>
            </div>
            <div className="wl-cards-d">
              {filteredItems.map((item) => (
                <div key={item.id} className="wl-card-d card">
                  <div className="wl-card-d-img">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="wl-card-d-details">
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <h3>{item.name}</h3>
                      <span
                        style={{
                          backgroundColor: "lightgray",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "5px",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="wl-card-d-store wl-small-text">
                      <FontAwesomeIcon
                        icon={faStore}
                        className="wl-store-icon"
                      />
                      {item.store}
                    </div>
                    <p className="wl-label-d wl-small-text">
                      Senast uppdaterad: {item.updated}
                    </p>
                  </div>
                  <div className="wl-card-d-pricing">
                    <p className="wl-label-d wl-small-text">Nuvarande pris</p>
                    <p className="wl-card-d-price">
                      <span className="wl-card-d-current wl-value">
                        {item.currentPrice} kr
                      </span>
                      <span className="wl-card-d-price-change">
                        <FontAwesomeIcon icon={faArrowUp} /> 100kr
                      </span>
                    </p>
                    <p className="wl-hint-d wl-small-text">
                      Sedan förra uppdateringen
                    </p>
                  </div>
                  <div className="wl-card-d-goal">
                    <p className="wl-label-d wl-small-text">Målpris</p>
                    <p className="wl-card-d-target wl-value">
                      <span>{item.targetPrice} kr</span>
                    </p>
                    <ProgressBar
                      currentPrice={item.currentPrice}
                      targetPrice={item.targetPrice}
                      className="desktop-progress-row"
                    />
                  </div>
                  <div className="wl-card-d-actions">
                    <Button href={item.url} variant="secondary">
                      Visa
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="fa-arrow-up-right-from-square wl-arrow-d"
                      />
                    </Button>
                    <div className="wl-actions">
                      <Button
                        variant="secondary"
                        onClick={() => console.log("Klickad!")}
                      >
                        Redigera
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
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Watchlist;
