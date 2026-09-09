import { useState } from "react";
import { getStores } from "../../services/storeService";
import Button from "../Button/Button";

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
    <div>
      <Button onClick={handleGetStores}>Get Supported Stores</Button>

      {showStores && (
        <ul>
          {stores.map((store) => (
            <li key={store.name}>{store.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SupportedStores;
