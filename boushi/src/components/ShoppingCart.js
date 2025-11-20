// src/components/ShoppingCart.js
import { useEffect, useState } from "react";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  // 처음 마운트될 때 localStorage에서 장바구니 불러오기
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(stored);
  }, []);

  // 개별 상품 삭제
  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 전체 비우기
  const handleClear = () => {
    if (!window.confirm("장바구니를 전부 비울까요?")) return;
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // 총 가격 계산 (문자열에서 숫자만 뽑아서 더하기)
  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
    return sum + (isNaN(priceNum) ? 0 : priceNum);
  }, 0);

  return (
    <div className="cart">
      <h2>장바구니 🧺</h2>

      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="cart-info">
                  <p className="cart-brand">{item.brand}</p>
                  <p className="cart-name">{item.name}</p>
                  <p className="cart-price">{item.price}</p>
                </div>
                <button
                  className="cart-remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <p className="cart-total">
              총 합계: {totalPrice.toLocaleString()} 원
            </p>
            <button className="cart-clear-btn" onClick={handleClear}>
              장바구니 비우기
            </button>
            <button
              className="cart-order-btn"
              onClick={() => alert("주문/결제 페이지로 이동한다고 가정 🙂")}
            >
              주문하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
