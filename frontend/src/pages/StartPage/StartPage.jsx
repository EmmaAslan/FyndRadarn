import "./StartPage.css";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { getWatchlists, createWatchlist } from "../../services/watchlistService";

const StartPage = () => {
  const [createEmail, setCreateEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [watchlists, setWatchlists] = useState([]);

  const handleGetWatchlists = async (event) => {
    event.preventDefault();

    try {
      const data = await getWatchlists();

      setWatchlists(data);
    } catch (error) {
      console.error("Error fetching watchlists:", error);
    }
  };

  const handleCreateWatchlist = async (event) => {
    event.preventDefault();

    const watchlistData = {
      email: createEmail,
      product_url: productUrl,
    };

    try {
      const data = await createWatchlist(watchlistData);
      setWatchlists((prevWatchlists) => [...prevWatchlists, data]);
    } catch (error) {
      console.error("Error creating watchlist:", error);
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
            <Input label="Product URL" name="url" type="text" placeholder="Add product URL" value={productUrl} onChange={(e) => setProductUrl(e.target.value)} />

            <Button type="submit">Add to Watchlist</Button>
          </form>
        </div>
        <div className="start-page-card">
          <h2>My Watchlists</h2>
          <form className="search-watchlists-form" onSubmit={handleGetWatchlists}>
            <Input label="Search Email" name="email" type="email" placeholder="Your email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
            <Button type="submit">Search for Watchlists</Button>
          </form>

          <div className="divider"></div>

          <div className="watchlists-container">
            {watchlists.map((item) => (
              <div key={item.id} className="watchlist-item">
                <div className="watchlist-item-content">
                  <h4>{item.product_title || item.product_url}</h4>
                  <div className="watchlist-item-info">
                    <span>Start: {item.start_price} kr</span>
                    <span>Latest: {item.latest_price} kr</span>
                  </div>
                </div>
                <span className="watchlist-item-date">{item.last_price_change_at}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
