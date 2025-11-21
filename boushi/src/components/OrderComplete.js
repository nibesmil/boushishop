// src/components/OrderComplete.js
import { useLocation, useNavigate } from "react-router-dom";

function OrderComplete() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  // 새로고침 등으로 state가 없을 때
  if (!order) {
    return (
      <div className="order-complete">
        <h2>주문 정보가 없습니다.</h2>
        <p>주문 내역이 없거나 잘못된 접근입니다.</p>
        <button
          className="order-complete-btn primary"
          onClick={() => navigate("/")}
        >
          홈으로 가기
        </button>
      </div>
    );
  }

  const {
    mode,
    orderNumber,
    name,
    phone,
    memo,
    address,
    // single mode용
    quantity,
    productName,
    productBrand,
    productImg,
    // cart mode용
    items,
    // 공통 금액
    productPrice,
    shippingCost,
    finalPrice,
  } = order;

  const isCartMode = mode === "cart";

  return (
    <div className="order-complete">
      <h2 className="order-complete-title">주문이 완료되었습니다 🎉</h2>
      <p className="order-complete-sub">소중한 주문 감사합니다.</p>

      <div className="order-complete-box">
        {/* 🔹 왼쪽: 주문 상품 요약 */}
        <div className="order-complete-product">
          <h3>주문 상품</h3>

          {isCartMode ? (
            <>
              <p style={{ fontSize: "14px", color: "#777", marginBottom: 8 }}>
                총 {items.length}개 상품
              </p>
              {items.map((item) => (
                <div
                  className="order-complete-product-info"
                  key={item.id}
                  style={{ marginBottom: 8 }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="order-complete-image"
                  />
                  <div className="order-complete-product-text">
                    <p className="order-complete-brand">{item.brand}</p>
                    <p className="order-complete-name">{item.name}</p>
                    <p className="order-complete-qty">{item.price}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="order-complete-product-info">
              <img
                src={productImg}
                alt={productName}
                className="order-complete-image"
              />
              <div className="order-complete-product-text">
                <p className="order-complete-brand">{productBrand}</p>
                <p className="order-complete-name">{productName}</p>
                <p className="order-complete-qty">수량: {quantity}개</p>
              </div>
            </div>
          )}
        </div>

        {/* 🔹 오른쪽: 주문/결제 정보 */}
        <div className="order-complete-info">
          <h3>주문 정보</h3>
          <ul>
            <li>
              <span className="label">주문번호</span>
              <span className="value">{orderNumber}</span>
            </li>
            <li>
              <span className="label">주문자</span>
              <span className="value">{name}</span>
            </li>
            <li>
              <span className="label">연락처</span>
              <span className="value">{phone}</span>
            </li>
            <li>
              <span className="label">배송지</span>
              <span className="value">{address}</span>
            </li>
            {memo && (
              <li>
                <span className="label">요청사항</span>
                <span className="value">{memo}</span>
              </li>
            )}
          </ul>

          <h3>결제 금액</h3>
          <ul className="order-complete-price">
            <li>
              <span className="label">상품 금액</span>
              <span className="value">
                {productPrice.toLocaleString()}원
              </span>
            </li>
            <li>
              <span className="label">배송비</span>
              <span className="value">
                {shippingCost.toLocaleString()}원
              </span>
            </li>
            <li className="final">
              <span className="label">총 결제 금액</span>
              <span className="value">
                {finalPrice.toLocaleString()}원
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="order-complete-buttons">
        <button
          className="order-complete-btn primary"
          onClick={() => navigate("/")}
        >
          메인으로 가기
        </button>
        <button
          className="order-complete-btn ghost"
          onClick={() => navigate(-1)}
        >
          이전 페이지
        </button>
      </div>
    </div>
  );
}

export default OrderComplete;
