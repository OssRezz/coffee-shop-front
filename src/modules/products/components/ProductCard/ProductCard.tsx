import { useState } from "react";
import "./ProductCard.css";
import { ProductCardProps } from "./product-card-props";

export const ProductCard = ({ product }: ProductCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const descriptionLimit = 100;
  const isLongDescription = product.description.length > descriptionLimit;

  const handleToggle = () => setShowMore(!showMore);
  const imageSrc = product.image
    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/products/${product.image}`
    : "https://placehold.co/600x400";
  return (
    <div className="card shadow-sm border-0 rounded-4 px-3 h-100 card-product">
      <img
        src={imageSrc}
        className="card-img-top rounded-top-4 p-3"
        alt={product.name}
        loading="lazy"
        onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400")}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold">{product.name}</h5>

        <div className="position-relative">
          <div
            className={`description-wrapper ${
              showMore ? "expanded" : "collapsed"
            }`}
          >
            <p className="card-text text-muted small description m-0">
              {product.description}
            </p>
          </div>

          {isLongDescription && (
            <button
              onClick={handleToggle}
              className="btn btn-link p-0 mt-1 text-primary small see-more"
            >
              {showMore ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold fs-5 text-success">
              ${product.price / 100}
            </span>
            <span className="badge bg-primary">Stock: {product.quantity}</span>
          </div>
          <a href="#" className="btn btn-dark w-100 rounded-pill">
            Añadir al carrito
          </a>
        </div>
      </div>
    </div>
  );
};
