import { useState } from "react";
import "./ProductCard.css";
import { ProductCardProps } from "./product-card-props";
import { AddToCartButton } from "./AddToCartButton";
import CoffeeShopLogo from "../../../../assets/images/logo_coffee_shop.png";
import { formatCOP } from "../../../../utils/formatCOP";

export const ProductCard = ({ product }: ProductCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const descriptionLimit = 100;
  const isLongDescription = product.description.length > descriptionLimit;

  const handleToggle = () => setShowMore(!showMore);
  const imageSrc = product.image
    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/products/${product.image}`
    : CoffeeShopLogo;

  return (
    <div className="card shadow-sm border-0 rounded-4 px-3 h-100 card-product">
      <img
        src={imageSrc}
        className="card-img-top rounded-top-4 p-3"
        alt={product.name}
        loading="lazy"
        onError={(e) => (e.currentTarget.src = CoffeeShopLogo)}
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
              {showMore ? "See less" : "See more"}
            </button>
          )}
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold fs-5 text-success">
              {formatCOP(product.price / 100)}
            </span>
            <span className="badge bg-primary">Stock: {product.quantity}</span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};
