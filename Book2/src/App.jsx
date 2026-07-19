import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import RootLayout from "./layout/RootLayout";
import { SearchProvider } from "./SearchContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <SearchProvider>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<BookList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </SearchProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
