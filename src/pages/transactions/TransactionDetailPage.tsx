import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetByTransactionId } from "../../modules/transactions/controllers/get-by-transaction-id.controller";
import CoffeeShopLogo from "../../assets/images/logo_coffee_shop.png";
import { JellyTriangle } from "@uiball/loaders";
import { getStatusInfo } from "../../utils/getStatusInfo";
import { showErrorAlert } from "../../utils/showErrorAlert";
import { formatCOP } from "../../utils/formatCOP";

const TransactionDetailPage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      const result = await GetByTransactionId(transactionId!);

      if (!result.success || !result.data) {
        navigate("/");
        showErrorAlert("Transaction not found", result.errors || []);
        return;
      }

      setTransaction(result.data);
      setLoading(false);
    };

    fetchTransaction();
  }, [transactionId]);

  if (loading)
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <JellyTriangle size={60} speed={1.3} color="#212529" />
        <p className="mt-3 fw-semibold">Loading transaction...</p>
      </div>
    );

  const sale = transaction.sales?.[0];
  const date = new Date(transaction.createdAt).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const {
    icon: StatusIcon,
    label,
    className,
  } = getStatusInfo(transaction.status);

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2
          className={`fw-bold d-flex align-items-center justify-content-center gap-2 mb-5 ${className}`}
        >
          <StatusIcon size={28} />
          {label}
        </h2>
        <p className="mb-1 text-muted">
          Reference: <strong>{transaction.reference}</strong>
        </p>
        <p className="text-muted">Date: {date}</p>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <div className="card shadow-sm rounded-4 p-3">
            <h5 className="mb-2 fw-semibold">Delivery information</h5>
            <p className="mb-1">
              <strong>Address:</strong> {sale?.address}
            </p>
            <p className="mb-0">
              <strong>Total pay:</strong> ${sale?.totalAmount}
            </p>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        {sale?.details.map((detail: any, i: number) => {
          const product = detail.product;
          const imageSrc = product.image
            ? `${import.meta.env.VITE_API_BASE_URL}/uploads/products/${
                product.image
              }`
            : CoffeeShopLogo;

          return (
            <div key={i} className="col-12 col-md-6 col-lg-auto d-flex justify-content-center mb-5">
              <div className="card h-100 shadow-sm border-0 rounded-4 card-product">
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="card-img-top rounded-top-4"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = CoffeeShopLogo)}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">
                    Quantity: {detail.quantity}
                  </p>
                  <p className="card-text text-success fw-semibold">
                    {formatCOP(detail.price)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-dark rounded-pill px-4"
          onClick={() => navigate("/")}
        >
          Back to products
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
