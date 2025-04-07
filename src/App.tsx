import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductPage from "./pages/products/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
