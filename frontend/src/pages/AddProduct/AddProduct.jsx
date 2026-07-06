import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./AddProduct.css";
import { useTranslation } from "react-i18next";


const AddProduct = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t("header.add-product")}</h2>
      <form
        className="add-product-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Produkt tillagd!");
        }}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Input label="Produktnamn" name="productName" placeholder="Namn på produkt" />
        <Input label="Url" name="url" placeholder="Länk till produkt" />

        <div style={{ display: "flex", gap: "1rem" }}>
          <Input label="Nuvarande pris" name="currentPrice" type="number" placeholder="0" />
          <Input label="Målpris" name="targetPrice" type="number" placeholder="0" />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Input label="Butik" name="store" placeholder="Namn på butik" />
          <Input label="Bild-URL" name="imageUrl" placeholder="https://example.com/image.jpg" />
        </div>
        <Button variant="primary" buttonType="submit">
          Lägg till
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
