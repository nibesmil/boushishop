// src/App.js
import "./App.css";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import products from "./data/products";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Modal from "./components/Modal";

function App() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("none");
  const navigate = useNavigate();

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
        return a.name.localeCompare(b.name);
      }
      if (sortType === "price") {
        const numA = parseInt(a.price.replace(/[^0-9]/g, ""), 10);
        const numB = parseInt(b.price.replace(/[^0-9]/g, ""), 10);
        return numA - numB;
      }
      return 0;
    });

  return (
    <div className="App">
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

      <div className="category-nav">
        <span onClick={() => setCategory("all")}>All</span>
        <span onClick={() => setCategory("cap")}>Cap</span>
        <span onClick={() => setCategory("acc")}>ACC</span>
        <span onClick={() => setCategory("etc")}>etc...</span>
      </div>

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

      <Routes>
        <Route path="/" element={<ProductList products={filteredProducts} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      <Modal />
    </div>
  );
}

export default App;
