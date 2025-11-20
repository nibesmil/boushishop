// src/components/ProductDetail.js
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div style={{ padding: 20 }}>상품을 찾을 수 없습니다.</div>;
  }

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

  const handleInquiry = () => {
    const subject = encodeURIComponent(`[문의] ${product.name}`);
    const body = encodeURIComponent(
      `안녕하세요, boushishop 상품 문의드립니다.\n\n상품명: ${product.name}\n브랜드: ${product.brand}\n\n내용을 입력해주세요 :)`
    );
    window.location.href = `mailto:20201092@vision.hoseo.edu?subject=${subject}&body=${body}`;
  };

  const handlePurchase = () => {
    alert(`'${product.name}' 구매 진행 페이지로 이동한다고 가정 🧾`);
    // 나중에 결제 페이지 만들면
    // navigate(`/checkout/${product.id}`);
  };

  return (
    <div className="detail">
      <div className="detail-inner">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <img src={product.img} alt={product.name} />

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
