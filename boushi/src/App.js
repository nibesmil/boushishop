import "./App.css";
import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    category: "cap",
    img: "/img/곤니치와.jpg",
    brand: "Conichiwa bonjour",
    name: "곤니치와봉쥬르 올림픽 볼캡",
    price: "20,000 Won",
    desc: "Size : OS\nCondition : 10/10\n레트로한 디자인의 볼캡입니다.\n",
  },
  {
    id: 2,
    category: "cap",
    img: "/img/나이키.jpg",
    brand: "Nike ACG",
    name: "나이키 ACG 나일론 볼캡",
    price: "45,000 Won",
    desc: "Size : OS\nCondition : 8/10\n나일론 소재로 제작되어 편하게 착용하기 좋습니다.\n",
  },
  {
    id: 3,
    category: "cap",
    img: "/img/더콜디스트.jpg",
    brand: "thecoldestmoment",
    name: "더콜디스트모먼트 볼캡",
    price: "20,000 Won",
    desc: "Size : 58.5\nCondition : 8/10\n무신사 품절 제품이고, 대두인 사람도 편하게 착용 가능합니다.\n",
  },
  {
    id: 4,
    category: "cap",
    img: "/img/무탠다드.jpg",
    brand: "Musinsa Standard",
    name: "무신사 스탠다드 이어플랩 볼캡",
    price: "15,000 Won",
    desc: "Size : OS\nCondition : 10/10\n무난한 이어플랩 볼캡입니다.\n귀를 감싸주어 따뜻한 착용감을 선사합니다.",
  },
  {
    id: 5,
    category: "cap",
    img: "/img/심웍스.jpg",
    brand: "CEEMWORKS",
    name: "심웍스 트러커 볼캡",
    price: "25,000 Won",
    desc: "Size : OS\nCondition : 9/10\n대두인 사람도 편한 착용이 가능하고, 레트로한 무드가 인상적인 볼캡입니다.",
  },
  {
    id: 6,
    category: "cap",
    img: "/img/뉴에라.jpg",
    brand: "New Era",
    name: "뉴에라 시카고 화이트삭스 스냅백",
    price: "40,000 Won",
    desc: "Size : M-L\nCondition : 9/10\n앞으로 쓰는 것 보단 뒤로 쓰는 것이 훨씬 멋드러집니다.\n이 모자를 쓰고 갱스터가 되어보세요.",
  },
  {
    id: 7,
    category: "cap",
    img: "/img/크롬하츠.jpg",
    brand: "Nptsss",
    name: "Nptsss 크롬하츠 볼캡",
    price: "65,000 Won",
    desc: "Size : OS\nCondition : 10/10\nNptsss에서 한정으로 풀었던 크롬하츠 볼캡입니다.\n제니가 써서 유명한 브랜드예요.\n이 가격에 절대 못 구합니다.",
  },
  {
    id: 8,
    category: "cap",
    img: "/img/오클리.jpg",
    brand: "OAKLEY",
    name: "오클리 47브랜드 볼캡",
    price: "50,000 Won",
    desc: "Size : OS\nCondition : 9/10\n무난무난하게 이쁜 모자입니다, 가운데 오클리 빅로고가 매력적이예요.",
  },
  {
    id: 9,
    category: "etc",
    img: "/img/포터탱커.jpg",
    brand: "Yosida Porter",
    name: "요시다포터 탱커 S/L 크로스백",
    price: "200,000 Won",
    desc: "Size : OS\nCondition : 8.5/10\n요즘 영포티 필수 브랜드입니다.\n이 가방 없는 40대면 영포티 자격을 상실합니다.\n저렴하게 판매해요.",
  },
  {
    id: 10,
    category: "etc",
    img: "/img/포터.jpg",
    brand: "Yosida Porter",
    name: "요시다포터 탱커 카드지갑",
    price: "130,000 Won",
    desc: "Size : OS\nCondition : 8/10\n사이즈는 컴팩트한데 안에 카드 수납 많이 할 수 있어서 좋습니다.\n개인적으로 지퍼지갑이 최고~",
  },
  {
    id: 11,
    category: "etc",
    img: "/img/몽벨.jpg",
    brand: "mont-bell",
    name: "몽벨 트레킹 선글라스 실버 메탈릭 라이트 그레이",
    price: "120,000 Won",
    desc: "Size : OS\nCondition : 10/10\n제니가 써서 유명해진 아이템입니다.\n저한텐 안 어울려서 바로 판매해요 ㅠㅠ",
  },
  {
    id: 12,
    category: "etc",
    img: "/img/리끌로우.jpg",
    brand: "RECLOW",
    name: "리끌로우 블루라이트 반무테 안경",
    price: "35,000 Won",
    desc: "Size : OS\nCondition : 9/10\n이 안경을 착용하면 똑똑해보입니다. 어떻게 아냐고요?\n사실 저도 잘 모르겠습니다.\n저렴하게 급처분합니다.",
  },
];

function App() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      category === "all" ? true : p.category === category;

    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
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
    navigate("/");
  }}
>
  boushishop ぼうし
</h4>

</div>
      <div className="category-nav">
        <span onClick={() => setCategory("all")}>All</span>
        <span onClick={() => setCategory("cap")}>Cap</span>
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

      {/* / → 리스트,  /product/:id → 상세 */}
      <Routes>
        <Route
          path="/"
          element={<ProductList products={filteredProducts} />}
        />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      <Modal />
    </div>
  );
}

/* ▶ 상품 리스트 */
function ProductList({ products }) {
  const navigate = useNavigate();

  return (
    <div className="boushi-list">
      {products.map((item) => (
        <div
          className="boushi"
          key={item.id}
          onClick={() => navigate(`/product/${item.id}`)}
          style={{ cursor: "pointer" }}
        >
          <img src={item.img} alt={item.name} />
          <p>{item.brand}</p>
          <p>{item.name}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
}

/* ▶ 상품 상세 페이지 */
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div style={{ padding: 20 }}>상품을 찾을 수 없습니다.</div>;
  }

  // 장바구니 담기 (localStorage 사용)
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

  // 문의하기 (메일 열기)
  const handleInquiry = () => {
    const subject = encodeURIComponent(`[문의] ${product.name}`);
    const body = encodeURIComponent(
      `안녕하세요, boushishop 상품 문의드립니다.\n\n상품명: ${product.name}\n브랜드: ${product.brand}\n\n내용을 입력해주세요 :)`
    );
    window.location.href = `mailto:20201092@vision.hoseo.edu?subject=${subject}&body=${body}`;
  };

  // 구매하기 (지금은 알림만)
  const handlePurchase = () => {
    alert(`'${product.name}' 구매 진행 페이지로 이동한다고 가정 🧾`);
    // 예: 나중에 결제 페이지 만들면
    // navigate(`/checkout/${product.id}`);
  };

  return (
    <div className="detail">
      <div className="detail-inner">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← 뒤로가기
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
                문의하기
              </button>
              <button className="btn buy-btn" onClick={handlePurchase}>
                구매하기
              </button>
              <button className="btn cart-btn" onClick={handleAddToCart}>
                장바구니
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ▶ 푸터/모달 */
function Modal() {
  return (
    <div className="model">
      <p> boushishop by neebesmil </p>
      <p> Address : 충청남도 아산시 배방읍 호서로 </p>
      <p> contact : 20201092@vision.hoseo.edu </p>
    </div>
  );
}

export default App;
