import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductPage from "./pages/products/ProductPage";
import { SyncCart } from "./components/Cart/SyncCart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <SyncCart />
    </>
  );
}

export default App;
