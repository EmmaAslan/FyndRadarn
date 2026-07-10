import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./AddProduct.css";
import { useTranslation } from "react-i18next";
import productPreview from "../../data/productPreview";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const AddProduct = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleFetchProductInfo = () => {
    console.log("Fetching product information...");

    setLoading(true);
    setTimeout(() => {
      setProduct(productPreview);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="add-product-container">
      <div className="ap-wrapper">
        <h1>{t("header.add-product")}</h1>

        <form onSubmit={handleSubmit}>
          <p className="ap-input-label">Produktlänk</p>
          <div className="ap-fetch-product-container">
            <Input label="url" name="url" placeholder="Länk till produkt" value={url} onChange={(e) => setUrl(e.target.value)} />
            <Button variant="primary" buttonType="button" onClick={handleFetchProductInfo} disabled={!url.trim()}>
              Hämta produktinformation
            </Button>
          </div>

          {loading && <LoadingSpinner />}
          {product && (
            <div className="ap-product-wrapper">
              <div className="ap-divider"></div>
              <span className="ap-product-info-message">
                <FontAwesomeIcon icon={faCircleCheck} /> Produkt hittad!
              </span>

              <div className="ap-product">
                <div className="ap-product-image">
                  <img src={product.image} alt="Produkt" />
                </div>

                <div className="ap-product-details">
                  <h2 className="ap-product-name">{product.name}</h2>
                  <div className="ap-product-meta">
                    <div className="ap-product-meta-item">
                      <p className="ap-product-label">Nuvarande pris</p>
                      <p className="ap-product-price">{product.price} kr</p>
                    </div>

                    <div className="ap-product-meta-item">
                      <p className="ap-product-label">Butik</p>
                      <p className="ap-product-store">{product.store}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ap-target-price-container">
                <p className="ap-input-label">Målpris</p>

                <div className="ap-target-price-wrapper">
                  <Input label="Målpris" name="targetPrice" type="number" placeholder="Ange målpris i kronor" />

                  <Button variant="primary" buttonType="submit">
                    Skapa bevakning
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
