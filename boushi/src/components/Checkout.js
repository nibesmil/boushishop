// src/components/Checkout.js
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";

const REGION_DATA = {
  "서울특별시": [
    "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "동대문구",
    "동작구", "도봉구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구",
    "종로구", "중구", "중랑구"
  ],
  "인천광역시": ["중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
  "경기도": [
    "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시",
    "성남시", "수원시", "안산시", "안성시", "안양시", "양주시", "여주시", "오산시", "용인시", "의왕시", "의정부시", "이천시",
    "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "연천군"
  ],
  "강원특별자치도": [
    "강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군",
    "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"
  ],
  "대전광역시": ["동구", "중구", "서구", "유성구", "대덕구"],
  "세종특별자치시": ["조치원읍", "금남면", "부강면", "소정면", "연기면", "연동면", "연서면", "장군면", "전동면", "전의면"],
  "충청북도": ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "단양군", "음성군"],
  "충청남도": [
    "천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"
  ],
  "광주광역시": ["동구", "서구", "남구", "북구", "광산구"],
  "전라북도": [
    "군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군",
    "진안군"
  ],
  "전라남도": [
    "광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군",
    "신안군", "영광군", "영암군", "완도군", "장성군", "진도군", "함평군", "해남군", "화순군"
  ],
  "대구광역시": ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군", "군위군"],
  "경상북도": [
    "경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시", "고령군",
    "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"
  ],
  "부산광역시": [
    "중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구",
    "수영구", "사상구", "기장군"
  ],
  "울산광역시": ["중구", "남구", "동구", "북구", "울주군"],
  "경상남도": [
    "창원시", "진주시", "김해시", "양산시", "거제시", "통영시", "사천시", "밀양시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군",
    "거창군", "합천군"
  ],
  "제주특별자치도": ["서귀포시", "제주시"]
};

// 🔹 도서산간 지역 판별 함수
function isRemoteArea(province, city) {
  if (!province) return false;
  if (province === "제주특별자치도") return true;

  const remoteList = [
    { province: "인천광역시", city: "강화군" },
    { province: "인천광역시", city: "옹진군" },
    { province: "전라남도", city: "신안군" },
    { province: "전라남도", city: "완도군" },
    { province: "전라남도", city: "진도군" },
    { province: "전라남도", city: "고흥군" },
    { province: "경상북도", city: "울릉군" },
  ];

  return remoteList.some(
    (item) => item.province === province && item.city === city
  );
}

function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // 장바구니에서 온 경우: location.state.items 에 담겨 있음
  const cartItems = location.state?.items || null;
  const isCartMode = !!cartItems && !id; // /checkout/cart 일 때

  const product = !isCartMode
    ? products.find((p) => p.id === Number(id))
    : null;

  const [name, setName] = useState("");
  const [province, setProvince] = useState(""); // 도 / 광역시
  const [city, setCity] = useState(""); // 시 / 군 / 구
  const [detailAddress, setDetailAddress] = useState(""); // 상세주소
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1); // 단일상품 모드에서만 사용
  const [memo, setMemo] = useState("");

  // 잘못된 접근 처리
  if (!isCartMode && !product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  if (isCartMode && (!cartItems || cartItems.length === 0)) {
    return (
      <div className="checkout">
        <h2>주문 / 결제</h2>
        <p>장바구니 정보가 없습니다.</p>
        <button onClick={() => navigate("/")}>메인으로 가기</button>
      </div>
    );
  }

  const cities = REGION_DATA[province] || [];

  // 🔹 금액 계산
  let totalPrice = 0;

  if (isCartMode) {
    // 장바구니 전체 금액
    totalPrice = cartItems.reduce((sum, item) => {
      const priceNum = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
      return sum + priceNum;
    }, 0);
  } else {
    // 단일 상품 금액 (수량 반영)
    const priceNum = parseInt(product.price.replace(/[^0-9]/g, ""), 10) || 0;
    totalPrice = priceNum * quantity;
  }

  // 🔹 배송비 계산
  const shippingCost =
    province && city ? (isRemoteArea(province, city) ? 6000 : 4500) : 0;

  // 🔹 총 결제 금액
  const finalPrice = totalPrice + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !province || !city || !detailAddress || !phone) {
      alert("이름, 도/시, 상세주소, 연락처를 모두 입력해주세요 🙂");
      return;
    }

    const fullAddress = `${province} ${city} ${detailAddress}`;
    const orderNumber = `ORD-${Date.now()}`;

    let orderData;

    if (isCartMode) {
      // ✅ 장바구니 일괄 구매
      orderData = {
        mode: "cart",
        orderNumber,
        name,
        phone,
        memo,
        address: fullAddress,
        province,
        city,
        detailAddress,
        items: cartItems,
        productPrice: totalPrice,
        shippingCost,
        finalPrice,
      };
    } else {
      // ✅ 단일 상품 구매
      const priceNum = parseInt(product.price.replace(/[^0-9]/g, ""), 10) || 0;

      orderData = {
        mode: "single",
        orderNumber,
        name,
        phone,
        memo,
        address: fullAddress,
        province,
        city,
        detailAddress,
        quantity,
        productName: product.name,
        productBrand: product.brand,
        productImg: product.img,
        unitPrice: priceNum,
        productPrice: totalPrice, // 수량 반영된 상품 금액
        shippingCost,
        finalPrice,
      };
    }

    navigate("/order-complete", {
      state: { order: orderData },
    });
  };

  return (
    <div className="checkout">
      <h2>주문 / 결제</h2>

      <div className="checkout-box">
        {/* 🔹 좌측: 상품 요약 */}
        <div className="checkout-summary">
          {isCartMode ? (
            <>
              <h3>장바구니 상품 ({cartItems.length}개)</h3>
              {cartItems.map((item) => (
                <div className="checkout-cart-item" key={item.id}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="checkout-image"
                  />
                  <div className="checkout-info">
                    <p className="checkout-brand">{item.brand}</p>
                    <p className="checkout-name">{item.name}</p>
                    <p className="checkout-price">{item.price}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <img
                src={product.img}
                alt={product.name}
                className="checkout-image"
              />

              <div className="checkout-info">
                <p className="checkout-brand">{product.brand}</p>
                <p className="checkout-name">{product.name}</p>
                <p className="checkout-price">{product.price}</p>
              </div>
            </>
          )}
        </div>

        {/* 🔹 우측: 주문자 정보 */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>주문자 정보</h3>

          <label>
            이름
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
            />
          </label>

          {/* 도 / 광역시 선택 */}
          <label>
            도 / 광역시
            <select
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                setCity(""); // 도 바꾸면 시 초기화
              }}
            >
              <option value="">선택하세요</option>
              {Object.keys(REGION_DATA)
                .filter((key) => key !== "")
                .map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
            </select>
          </label>

          {/* 시 / 군 / 구 선택 */}
          <label>
            시 / 군 / 구
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!province}
            >
              <option value="">선택하세요</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          {/* 상세 주소 */}
          <label>
            상세 주소
            <input
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="도로명 주소, 동/호수 등"
            />
          </label>

          <label>
            연락처
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
            />
          </label>

          {/* 단일 상품 모드에서만 수량 입력 */}
          {!isCartMode && (
            <label>
              수량
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value) || 1))
                }
              />
            </label>
          )}

          <label>
            요청사항 (선택)
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="배송 요청사항을 적어주세요"
            />
          </label>

          {/* 🔹 금액 요약 */}
          <div className="checkout-total">
            <div>상품 금액: {totalPrice.toLocaleString()}원</div>
            <div>
              배송비:{" "}
              {province && city
                ? `${shippingCost.toLocaleString()}원${
                    isRemoteArea(province, city) ? " (도서산간지역)" : ""
                  }`
                : "지역 선택 후 표시"}
            </div>
            <div>
              총 결제 금액: <strong>{finalPrice.toLocaleString()}원</strong>
            </div>
          </div>

          <div className="checkout-buttons">
            <button
              type="button"
              className="checkout-cancel"
              onClick={() => navigate(-1)}
            >
              돌아가기
            </button>
            <button type="submit" className="checkout-submit">
              주문하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
