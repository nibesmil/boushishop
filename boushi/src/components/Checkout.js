// src/components/Checkout.js
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";

const REGION_DATA = {
  "": [],
  "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "동대문구",
    "동작구", "도봉구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구",
    "종로구", "중구", "중랑구"
  ],
  "인천광역시": [],
  "부산광역시": ["해운대구", "수영구", "부산진구"],
  "대구광역시": ["수성구", "달서구"],
  "경기도": ["고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시",
    "성남시", "수원시", "안산시", "안성시", "안양시", "양주시", "여주시", "오산시", "용인시", "의왕시", "의정부시", "이천시",
    "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "연천군"
  ],
  "충청남도": ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
  "충청북도": ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "단양군", "음성군"],
  "경상남도": ["창원시", "진주시", "김해시", "양산시", "거제시", "통영시", "사천시", "밀양시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군",
    "거창군", "합천군"
  ],
};

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const [name, setName] = useState("");
  const [province, setProvince] = useState("");       // 도 / 광역시
  const [city, setCity] = useState("");               // 시 / 군 / 구
  const [detailAddress, setDetailAddress] = useState(""); // 상세주소
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [memo, setMemo] = useState("");

  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const priceNum = parseInt(product.price.replace(/[^0-9]/g, ""), 10) || 0;
  const totalPrice = priceNum * quantity;

  const cities = REGION_DATA[province] || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !province || !city || !detailAddress || !phone) {
      alert("이름, 도/시, 상세주소, 연락처를 모두 입력해주세요 🙂");
      return;
    }

    const fullAddress = `${province} ${city} ${detailAddress}`;

    // 실제로는 여기서 서버에 주문 정보 전송
    alert(
      `주문 완료!\n\n` +
        `상품: ${product.name}\n` +
        `수량: ${quantity}개\n` +
        `주소: ${fullAddress}\n` +
        `총 금액: ${totalPrice.toLocaleString()}원`
    );

    navigate("/");
  };

  return (
    <div className="checkout">
      <h2>주문 / 결제</h2>

      <div className="checkout-box">
        {/* 🔹 좌측: 상품 요약 */}
        <div className="checkout-summary">
          <img src={product.img} alt={product.name} className="checkout-image" />

          <div className="checkout-info">
            <p className="checkout-brand">{product.brand}</p>
            <p className="checkout-name">{product.name}</p>
            <p className="checkout-price">{product.price}</p>
          </div>
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

          <label>
            요청사항 (선택)
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="배송 요청사항을 적어주세요"
            />
          </label>

          <div className="checkout-total">
            총 결제 금액: <strong>{totalPrice.toLocaleString()}원</strong>
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
