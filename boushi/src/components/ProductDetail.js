// src/components/ProductDetail.js
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import products from "../data/products";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  // 🔍 돋보기 관련 상태 + ref
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, visible: false });
  const imgRef = useRef(null);

  if (!product) {
    return <div style={{ padding: 20 }}>상품을 찾을 수 없습니다.</div>;
  }

  /* ------------------ 돋보기 관련 함수 ------------------ */
  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 마우스가 이미지 영역 안에 있을 때만 렌즈 보이기
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setLensPos({ x, y, visible: true });
    } else {
      setLensPos((prev) => ({ ...prev, visible: false }));
    }
  };

  const handleMouseLeave = () => {
    setLensPos((prev) => ({ ...prev, visible: false }));
  };

  /* ------------------ 기본 기능들 ------------------ */

  // 장바구니 담기
  const handleAddToCart = () => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    const alreadyInCart = existing.some((item) => item.id === product.id);

    if (!alreadyInCart) {
      existing.push(product);
      localStorage.setItem("cart", JSON.stringify(existing));
      alert("장바구니에 담겼습니다 🧺");
    } else {
      alert("이미 장바구니에 있는 상품입니다!");
    }
  };

  // 문의하기
  const handleInquiry = () => {
    const subject = encodeURIComponent(`[문의] ${product.name}`);
    const body = encodeURIComponent(
      `안녕하세요, boushishop 상품 문의드립니다.\n\n상품명: ${product.name}\n브랜드: ${product.brand}\n\n내용을 입력해주세요 :)`
    );
    window.location.href = `mailto:20201092@vision.hoseo.edu?subject=${subject}&body=${body}`;
  };

  // 구매하기
// 구매하기
const handlePurchase = () => {
    navigate(`/checkout/${product.id}`);
  };
  

  /* ------------------------------------------------ */

  return (
    <div className="detail">
      <div className="detail-inner">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* 🔥 돋보기용 이미지 전체 영역 */}
        <div
          className="zoom-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            ref={imgRef}
            src={product.img}
            alt={product.name}
            className="zoom-image"
          />

          {/* 🔍 렌즈 */}
          {lensPos.visible && (
            <div
              className="zoom-lens"
              style={{
                top: lensPos.y - 75,
                left: lensPos.x - 75,
                backgroundImage: `url(${product.img})`,
                backgroundSize: "200%", // 확대 배율
                backgroundPosition: `${-(lensPos.x * 0.5)}px ${-(lensPos.y * 0.5)}px`,
              }}
            ></div>
          )}
        </div>

        {/* 🔥 기존 텍스트 + 버튼 그대로 유지 */}
        <div className="detail-text">
          <h2>{product.brand}</h2>
          <h3>{product.name}</h3>
          <p className="detail-price">{product.price}</p>
          <p className="detail-desc">{product.desc}</p>

          <div className="button-center">
            <div className="detail-buttons">
              <button className="btn inquiry-btn" onClick={handleInquiry}>
                CONTACT US
              </button>
              <button className="btn buy-btn" onClick={handlePurchase}>
                BUY IT NOW
              </button>
              <button className="btn cart-btn" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
