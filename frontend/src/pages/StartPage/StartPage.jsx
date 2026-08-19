import "./StartPage.css";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { getWatchlists, getPriceHistory, previewWatchlist, createWatchlist } from "../../services/watchlistService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faAngleDown, faAngleUp, faClockRotateLeft, faArrowDown, faArrowUp, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const StartPage = () => {
  const [createEmail, setCreateEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [previewProduct, setPreviewProduct] = useState(null);
  const [productUrl, setProductUrl] = useState("");
  const [watchlists, setWatchlists] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [clickedButton, setClickedButton] = useState(false);
  const [expandedHistoryId, setExpandedHistoryId] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);
  const [creatingWatchlist, setCreatingWatchlist] = useState(false);
  const [watchlistCreated, setWatchlistCreated] = useState(false);
  const [createErrorMessage, setCreateErrorMessage] = useState("");
  const [searchErrorMessage, setSearchErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidSearchEmail = emailRegex.test(searchEmail);
  const isValidCreateEmail = emailRegex.test(createEmail);

  const handleGetWatchlists = async (event) => {
    event.preventDefault();
    setSearchErrorMessage("");
    setLoadingWatchlist(true);
    try {
      const data = await getWatchlists(searchEmail);

      setWatchlists(data);

      const historyData = [];
      for (const item of data) {
        const history = await getPriceHistory(item.id);
        historyData.push({
          watchlistId: item.id,
          history,
        });
      }

      setPriceHistory(historyData);
      setClickedButton(true);
    } catch (error) {
      console.error("Error fetching watchlists:", error);
      setSearchErrorMessage(error.message);
      setClickedButton(false);
    } finally {
      setLoadingWatchlist(false);
    }
  };

  const toggleHistory = (id) => {
    setExpandedHistoryId((currentId) => (currentId === id ? null : id));
  };

  const formatPrice = (price) =>
    Number(price).toLocaleString("sv-SE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handlePreviewProduct = async () => {
    setPreviewProduct(null);
    setWatchlistCreated(false);
    setLoadingPreview(true);
    setCreateErrorMessage("");

    try {
      const preview = await previewWatchlist({ product_url: productUrl });
      setPreviewProduct(preview);
    } catch (error) {
      console.error("Error fetching preview:", error);
      setCreateErrorMessage(error.message);
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleCreateWatchlist = async (event) => {
    event.preventDefault();
    setCreatingWatchlist(true);
    setCreateErrorMessage("");

    const watchlistData = {
      email: createEmail,
      product_url: productUrl,
    };

    try {
      const data = await createWatchlist(watchlistData);

      setWatchlists((prevWatchlists) => [data, ...prevWatchlists]);
      setWatchlistCreated(true);
      setPreviewProduct(null);
      setProductUrl("");
    } catch (error) {
      console.error("Error creating watchlist:", error);
      setCreateErrorMessage(error.message);
    } finally {
      setCreatingWatchlist(false);
    }
  };

  return (
    <div className="start-page">
      <h1>Welcome to FyndRadarn</h1>
      <div className="start-page-content">
        <div className="start-page-card">
          <h2>Create a new Watchlist</h2>
          <form className="create-watchlist-form" onSubmit={handleCreateWatchlist}>
            <Input label="Create Email" name="email" type="email" placeholder="Your email" value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} />
            <Input
              label="Product URL"
              name="url"
              type="text"
              placeholder="Add product URL"
              value={productUrl}
              onChange={(e) => {
                setProductUrl(e.target.value);
                setWatchlistCreated(false);
              }}
            />
            <Button type="button" onClick={handlePreviewProduct} disabled={!productUrl || !isValidCreateEmail || loadingPreview}>
              Preview product
            </Button>
            {loadingPreview && <LoadingSpinner />}

            {watchlistCreated && <span className="success-message">✓ Product added successfully!</span>}

            {createErrorMessage && <span className="error-message">{createErrorMessage}</span>}

            {!loadingPreview && previewProduct && !createErrorMessage && (
              <>
                <div className="divider"></div>

                <div className="product-preview-container">
                  <div className="product-preview">
                    <img className="product-preview-image" src={previewProduct.image} alt={previewProduct.title} />

                    <div className="product-preview-content">
                      <span>{previewProduct.title}</span>

                      <div className="preview-price">
                        <small>Current price: </small>
                        <span>{previewProduct.price} kr</span>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={creatingWatchlist}>
                    Add to Watchlist {creatingWatchlist && <LoadingSpinner />}
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="start-page-card">
          <h2>My Watchlists</h2>
          <form className="search-watchlists-form" onSubmit={handleGetWatchlists}>
            <Input label="Search Email" name="email" type="email" placeholder="Your email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
            <Button type="submit" disabled={!isValidSearchEmail || loadingWatchlist}>
              Search for Watchlists {loadingWatchlist && <LoadingSpinner />}
            </Button>
          </form>

          {searchErrorMessage && <span className="error-message">{searchErrorMessage}</span>}

          {clickedButton && (
            <>
              <div className="divider"></div>

              {watchlists.length > 0 ? (
                <div className="watchlists-container">
                  {watchlists.map((item) => (
                    <div className="watchlist-card">
                      <div key={item.id} className="watchlist-item">
                        <img className="watchlist-item-image" src={item.product_image} alt={item.product_title || item.product_url} />
                        <div className="watchlist-item-content">
                          <h4>{item.product_title || item.product_url}</h4>
                          <span className="watchlist-item-store">
                            <FontAwesomeIcon icon={faStore} /> {item.store || "Unknown Store"}
                          </span>
                          <div className="watchlist-item-price-date">
                            <span className="watchlist-item-start">
                              <b>Start:</b> {item.start_price} kr
                            </span>
                            <span className="watchlist-item-dot">·</span>
                            <span className="watchlist-item-latest">
                              <b>Latest:</b> {item.latest_price} kr
                            </span>
                            <span className="watchlist-item-dot">·</span>
                            <span className="watchlist-item-date">
                              {item.last_price_change_at
                                ? new Date(item.last_price_change_at).toLocaleString("sv-SE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
                                : "No price changes"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="watchlist-history">
                        <button className="toggle-history-button" onClick={() => toggleHistory(item.id)}>
                          <span>
                            <FontAwesomeIcon icon={faClockRotateLeft} /> Price changes
                          </span>
                          <span>
                            {expandedHistoryId === item.id ? "Hide history" : "Show history"} <FontAwesomeIcon icon={expandedHistoryId === item.id ? faAngleUp : faAngleDown} />
                          </span>
                        </button>
                        {expandedHistoryId === item.id && (
                          <div className="watchlist-history-container">
                            {priceHistory.find((historyItem) => historyItem.watchlistId === item.id)?.history.length > 0 ? (
                              priceHistory
                                .find((historyItem) => historyItem.watchlistId === item.id)
                                ?.history.map((historyItem) => {
                                  const priceDifference = historyItem.price_after_change - historyItem.price_before_change;
                                  return (
                                    <div key={historyItem.id} className="watchlist-history-item">
                                      <div className="history-item-icon-prices">
                                        <span className={priceDifference > 0 ? "difference-red" : "difference-green"}>
                                          <FontAwesomeIcon icon={priceDifference < 0 ? faArrowDown : faArrowUp} />
                                        </span>
                                        <span>
                                          {formatPrice(historyItem.price_before_change)} kr <FontAwesomeIcon icon={faArrowRight} /> {formatPrice(historyItem.price_after_change)} kr
                                        </span>
                                      </div>
                                      <div className="history-item-date-price">
                                        <span>
                                          {new Date(historyItem.changed_at).toLocaleString("sv-SE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                        <span className={priceDifference > 0 ? "difference-red" : "difference-green"}>
                                          {priceDifference > 0 ? "+" : ""}
                                          {formatPrice(priceDifference)} kr
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })
                            ) : (
                              <div className="message">No price changes to show</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <span className="message">No watchlists could be found </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
