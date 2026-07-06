import Button from "../../components/Button/Button";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import WatchCard from "../../components/WatchCard/WatchCard";
import useScreenSize from "../../hooks/useScreenSize";

import watchlists from "../../data/watchlists";
import updates from "../../data/updates";
import stats from "../../data/stats";

const Dashboard = () => {
  const screenSize = useScreenSize();

  return (
    <>
      {screenSize === "mobile" ? (
        <div className="dashboard-mobile">
          <div className="dashboard-header">
            <h2>Hej [namn]!</h2>
            <span>
              Välkommen till Fyndradarn. Här kan du se dina senaste fynd och
              uppdateringar.
            </span>

            <Button type="primary" onClick={() => console.log("Klickad!")}>
              + Fynda något nytt
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

          <h2 className="dashboard-section-title">Aktiva bevakningar</h2>
          <div className="dashboard-active-items">
            {watchlists.slice(0, 2).map((item) => (
              <WatchCard key={item.id} item={item} screenSize={screenSize} />
            ))}

            <Button type="primary" to="/watchlist">
              Se alla aktiva fynd
            </Button>
          </div>

          <h2 className="dashboard-section-title">Senaste uppdateringar</h2>
          <div className="dashboard-updates">
            {updates.slice(0, 2).map((update) => (
              <div key={update.id} className="update-card card">
                <h3>{update.title}</h3>
                <p>{update.product}</p>
                <p>{update.message}</p>
                <small>{update.time}</small>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="dashboard-desktop">
          <div className="dashboard-header">
            <h2>Hej [namn]!</h2>
            <span>
              Välkommen till Fyndradarn. Här kan du se dina senaste fynd och
              uppdateringar.
            </span>

            <Button type="primary" onClick={() => console.log("Klickad!")}>
              + Fynda något nytt
            </Button>
          </div>

          <div className="dashboard-stats">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-card card">
                <FontAwesomeIcon icon={stat.icon} />
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="dashboard-content">
            <section className="dashboard-section">
              <h2 className="dashboard-section-title">Aktiva bevakningar</h2>
              <div className="dashboard-active-items">
                {watchlists.slice(0, 3).map((item) => (
                  <WatchCard
                    key={item.id}
                    item={item}
                    screenSize={screenSize}
                  />
                ))}

                <Button
                  type="primary"
                  onClick={() => console.log("Klickad!")}
                  to="/watchlist"
                >
                  Se alla aktiva fynd{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="fa-arrow-right"
                  />
                </Button>
              </div>
            </section>

            <section className="dashboard-section">
              <h2 className="dashboard-section-title">Senaste uppdateringar</h2>
              <div className="dashboard-updates">
                {updates.map((update) => (
                  <div key={update.id} className="update-card card">
                    <div className="update-card-heading">
                      <span className={`update-badge ${update.type}`}>
                        {update.title}
                      </span>
                      <small>{update.time}</small>
                    </div>
                    <p>{update.product}</p>
                    <p>{update.message}</p>
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
