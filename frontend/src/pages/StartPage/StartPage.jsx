import "./StartPage.css";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { getWatchlists, getPriceHistory, previewWatchlist, createWatchlist, deleteWatchlist } from "../../services/watchlistService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SupportedStores from "../../components/SupportedStores/SupportedStores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faAngleDown, faAngleUp, faClockRotateLeft, faArrowDown, faArrowUp, faArrowRight, faXmark, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

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
  const [deletingWatchlist, setDeletingWatchlist] = useState(false);
  const [watchlistAction, setWatchlistAction] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
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

  const showFeedback = (message, type) => {
    setWatchlistAction({
      message,
      type,
    });

    setTimeout(() => {
      setWatchlistAction(null);
    }, 5000);
  };

  const handlePreviewProduct = async () => {
    setPreviewProduct(null);
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
      showFeedback("✓ Watchlist added successfully!", "success");
      setPreviewProduct(null);
      setProductUrl("");
    } catch (error) {
      console.error("Error creating watchlist:", error);
      setCreateErrorMessage(error.message);
    } finally {
      setCreatingWatchlist(false);
    }
  };

  const handleDeleteWatchlist = async (event, id) => {
    event.preventDefault();
    setDeletingWatchlist(true);
    setCreateErrorMessage("");

    try {
      await deleteWatchlist(id);

      setWatchlists((prevWatchlists) => prevWatchlists.filter((watchlist) => watchlist.id !== id));

      showFeedback("✓ Watchlist deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting watchlist:", error);
      setCreateErrorMessage(error.message);
    } finally {
      setDeletingWatchlist(false);
    }
  };

  return (
    <div className="start-page">
      <h1>Welcome to FyndRadarn</h1>
      <div className="feedback-message">
        {watchlistAction && <span className={`${watchlistAction.type}-message`}>{watchlistAction.message}</span>}
        {createErrorMessage && <span className="error-message">{createErrorMessage}</span>}
      </div>
      <div className="start-page-content">
        <div className="left-column">
          <div className="start-page-card left-card">
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
                }}
              />
              <Button type="button" onClick={handlePreviewProduct} disabled={!productUrl || !isValidCreateEmail || loadingPreview}>
                Preview product
              </Button>
              {loadingPreview && <LoadingSpinner />}

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
                          <span>{previewProduct.price.toFixed(2)} kr</span>
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
          <div>
            <SupportedStores />
          </div>
        </div>

        <div className="start-page-card right-card">
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
                    <div key={item.id} className="watchlist-card">
                      <div className="watchlist-item">
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
                          <button className="watchlist-item-delete" onClick={() => setConfirmDelete(item.id)} disabled={deletingWatchlist}>
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </div>
                      </div>

                      {confirmDelete === item.id ? (
                        <div className="confirm-delete-container">
                          <div className="confirm-delete-message">
                            <span>
                              <FontAwesomeIcon icon={faCircleExclamation} />
                            </span>
                            <span>Are you sure you want to delete this watchlist?</span>
                          </div>
                          <div className="confirm-delete-buttons">
                            <Button type="button" variant="secondary" onClick={() => setConfirmDelete(null)}>
                              Cancel
                            </Button>
                            <Button type="button" variant="danger" onClick={(event) => handleDeleteWatchlist(event, item.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      ) : (
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
                                            {formatPrice(historyItem.price_before_change)} kr <FontAwesomeIcon icon={faArrowRight} /> {formatPrice(historyItem.price_after_change)}{" "}
                                            kr
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
                      )}
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
