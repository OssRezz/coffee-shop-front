import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductPage from "./pages/products/ProductPage";
import { SyncCart } from "./components/Cart/SyncCart";
import CheckOutPage from "./pages/checkouts/CheckoutPage";
import TransactionDetailPage from "./pages/transactions/TransactionDetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductPage />}></Route>
            <Route path="/checkout" element={<CheckOutPage />}></Route>
            <Route
              path="/transactions/detail/:transactionId"
              element={<TransactionDetailPage />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <SyncCart />
    </>
  );
}

export default App;
