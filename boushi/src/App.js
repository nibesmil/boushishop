// src/App.js
import "./App.css";
import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import products from "./data/products";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import OrderComplete from "./components/OrderComplete"; // ✅ 추가
import Modal from "./components/Modal";

function App() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("none");
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로 체크
  const isDetailPage = location.pathname.startsWith("/product/");
  const isCheckoutPage = location.pathname.startsWith("/checkout/");
  const isOrderCompletePage = location.pathname.startsWith("/order-complete"); // ✅ 추가

  // 🔹 필터 + 정렬 적용
  const filteredProducts = products
    .filter((p) => {
      const matchesCategory =
        category === "all" ? true : p.category === category;

      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortType === "name") {
        return a.name.localeCompare(b.name); // 이름순 정렬
      }
      if (sortType === "price") {
        const numA = parseInt(a.price.replace(/[^0-9]/g, ""), 10);
        const numB = parseInt(b.price.replace(/[^0-9]/g, ""), 10);
        return numA - numB; // 가격 낮은 순
      }
      return 0; // 정렬 안 함
    });

  // ✅ Checkout / 주문완료 페이지에서는 상단 카테고리/검색 숨기기
  const hideCategoryAndSearch = isCheckoutPage || isOrderCompletePage;

  return (
    <div className="App">
      {/* 상단 네비게이션 바 */}
      <div className="black-nav">
        <h4
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setCategory("all");
            setSearch("");
            setSortType("none");
            navigate("/");
          }}
        >
          boushishop ぼうし
        </h4>
      </div>

      {/* 🔹 카테고리 바 (체크아웃 / 주문완료 페이지에서는 숨김) */}
      {!hideCategoryAndSearch && (
        <div className="category-nav">
          <span
            onClick={() => {
              setCategory("all");
              navigate("/");
            }}
          >
            All
          </span>
          <span
            onClick={() => {
              setCategory("cap");
              navigate("/");
            }}
          >
            Cap
          </span>
          <span
            onClick={() => {
              setCategory("acc");
              navigate("/");
            }}
          >
            ACC
          </span>
          <span
            onClick={() => {
              setCategory("etc");
              navigate("/");
            }}
          >
            etc...
          </span>
          <span
            onClick={() => {
              setCategory("shoppingcart");
              navigate("/");
            }}
          >
            🛒
          </span>
        </div>
      )}

      {/* 🔥 검색창 + 정렬 버튼
          - 상세페이지 X
          - 장바구니 X
          - 체크아웃 X
          - 주문완료 X
      */}
      {!isDetailPage &&
        category !== "shoppingcart" &&
        !hideCategoryAndSearch && (
          <>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search 🔍"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="sort-box">
              <button onClick={() => setSortType("name")}>이름순 정렬</button>
              <button onClick={() => setSortType("price")}>가격순 정렬</button>
            </div>
          </>
        )}

      {/* 라우팅 영역 */}
      <Routes>
        <Route
          path="/"
          element={
            category === "shoppingcart" ? (
              <ShoppingCart />
            ) : (
              <ProductList products={filteredProducts} />
            )
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* ✅ 단일 상품 결제 */}
        <Route path="/checkout/:id" element={<Checkout />} />
        {/* ✅ 장바구니 일괄 결제 */}
        <Route path="/checkout/cart" element={<Checkout />} />
        <Route path="/order-complete" element={<OrderComplete />} />
      </Routes>

      <Modal />
    </div>
  );
}

export default App;
