import "./styles/styles.css";
import { useState } from "react";
import Button from "./components/Buttons";
import Alert from "./components/Alert";
import Modal from "./components/Modal";
import Card from "./components/Card";
import products from "./data/products";
import StatsCard from "./components/StatsCard";
export default function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setProducts] = useState(products);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setProducts(allProducts.filter((p) => p.id !== selectedProduct.id));
    setShowModal(false);
    setShowAlert(true);
  };

  const totalProducts = allProducts.length;
  const totalStock = allProducts.reduce(
    (sum, product) => sum + product.stock,
    0
  );
  const totalInventoryValue = allProducts.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  return (
    <div className="App">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3>Confirm Deletion</h3>
        <p>
          Are you sure you want to delete{" "}
          <strong>{selectedProduct?.name}</strong>?
        </p>

        <Button label="Confirm" variant="danger" onClick={confirmDelete} />
        <Button
          label="Cancel"
          variant="secondary"
          onClick={() => setShowModal(false)}
        />
      </Modal>

      <h1>Product Management Dashboard</h1>
      <p>Monitor product inventory and perform management actions.</p>

      <div className="stats-container">
        <StatsCard title="Total Products" value={totalProducts} />
        <StatsCard title="Total Stock" value={totalStock} />
        <StatsCard title="Inventory Value" value={`₹${totalInventoryValue}`} />
      </div>

      <hr />

      <Alert
        type="success"
        message="Product deleted successfully!"
        show={showAlert}
      />

      <div className="cards-container">
        {allProducts.map((product) => (
          <Card key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>

            <Button
              label="Delete"
              variant="danger"
              onClick={() => handleDeleteClick(product)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
