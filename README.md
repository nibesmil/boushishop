<img width="305" height="44" alt="Image" src="https://github.com/user-attachments/assets/89039665-f6d2-440f-9b1c-77a8acbc8361" />

# React 기반 UX 중심 E-Commerce 쇼핑 경험 구현 - boushishop 🧢
---

저의 애장품들을 판매합니다. (실제로 본인 소유 제품임)

본 프로젝트는 프론트엔드 클라이언트 설계에 집중한 개인 프로젝트입니다.

상품 목록 --> 제품 상세 페이지 --> 장바구니 --> 주문 및 결제 --> 주문 완료 까지

실제 쇼핑몰 UX 흐름을 React, Router, localStorage 기반으로 구현했습니다.

---
사용자 경험에 따른 UI 흐름 설계 및 상태 관리 역량을 보여주는 것을 목표로 하였고, 추후

1. 백엔드 연동 | REST API 기반 상품 주문 및 관리
2. 사용자 인증 | 로그인/회원가입 기능 구현
3. 장바구니 개선 | 수량 조절 및 금액 실시간 변화
4. 데이터베이스 | 실제 저장 기능 도입
5. 관리자 계정 | 관리자 계정 통해 실시간 상품 게시 및 가격 조정 등

구현 예정입니다. 감사합니다.

---
## 🛠 사용 기술 스택 🛠
1. Framework | **React** | SPA + 컴포넌트 UI 구축 |
2. Language | **JavaScript (ES6+)** | 비동기 처리 및 DOM 제어 |
3. Routing | **react-router-dom** | 상세 페이지/장바구니/결제 페이지 라우팅 |
4. State Management | **React Hook** | useState, useEffect, useLocation, useParams, useNavigate |
5. Data Storage | **localStorage** | 장바구니 데이터 영속 |
6. Styling | **CSS3** | UI 커스텀 디자인 |
7. Build Tool | **Create React App** | 개발 환경 자동 구성 |
8. Develop Tools | **Visual Studio Code**, **npm** | 개발 환경 및 패키지 |

---
## 📁 폴더 구조

 ```
boushishop/
 ├─ node_modules/
 ├─ public/
 ├─ src/
 │   ├─ components/
 │   │   ├─ Checkout.js          # 주문/결제 페이지 (단일/장바구니 통합)
 │   │   ├─ Modal.js             # Footer 정보 표시 컴포넌트
 │   │   ├─ OrderComplete.js     # 결제 완료 페이지
 │   │   ├─ ProductDetail.js     # 상세 페이지 + 돋보기 기능
 │   │   ├─ ProductList.js       # 상품 리스트 (카드 UI)
 │   │   └─ ShoppingCart.js      # localStorage 기반 장바구니
 │   │
 │   ├─ data/
 │   │   └─ products.js          # 정적 상품 데이터
 │   │
 │   ├─ App.js                   # 메인 라우팅 + 카테고리/검색/정렬 상태관리
 │   ├─ App.css                  # 전체 UI 스타일
 │   ├─ index.js                 # React 앱 엔트리 포인트
 │   └─ index.css                # Global style
 │
 ├─ package.json
 ├─ package-lock.json
 └─ README.md
```
---
## ✨ 구현 기능
✅ 카테고리 필터 (All, Cap, ACC, etc), 검색 기능, 정렬 (가격순/이름순 정렬) 기능

✅ 상세 페이지 내 상품 줌 렌즈 기능

✅ 장바구니 담기 / 개별 삭제 / 전체 비우기 기능

✅ 지역 및 도서산간 여부에 따라 배송비 자동 계산 (일반 : 4500 / 도서산간 : 6000)

✅ 주문 완료 페이지에서 주문 정보 시각화

✅ SPA 기반 부드러운 UX 흐름

---
## ⚙ 세팅 & 실행
```
npm install
cd boushishop --> cd boushi
npm start
```
👉 http://localhost:3000
 
---
## 🖥 프리뷰

**1. 메인 페이지** : 사용자는 메인 화면에서 원하는 패션 아이템을 쉽고 빠르게 찾을 수 있습니다.
- **카테고리 필터링 제공** : (CAP / ACC / etc...) 으로 탐색 경험 향상 통해 **사용자의 관심 영역을 즉시 좁혀볼 수 있음**
- **실시간 검색 기능 지원** : 브랜드명, 제품명 등 텍스트 검색 통해 **상품을 즉시 필터링**
- **정렬 기능 지원** : 🔤 이름 순 정렬 (A --> Z) / 💸 가격 순 정렬 (낮은 가격 --> 높은 가격)
- **카드 UI 기반 시각적 상품 리스트** : 제품 이미지, 브랜드, 가격이 한 눈에 들어오도록 구성
- **SPA 기반 부드러운 화면 전환** : React Router 활용한 UX 개선
<img src="https://github.com/user-attachments/assets/19d5ba6b-c717-4b5f-934a-994f26dd589d" width="750"/>

<br><br>

**2. 검색 기능** : 키워드 기반  검색 기능을 구현하여 **제품명과 브랜드를 실시간으로 필터링**합니다. 
- 입력 즉시 결과가 반영되어 탐색 효율을 높임
<img src="https://github.com/user-attachments/assets/0a0e6bb3-b5b3-4e31-a2f1-b8dceb426ecc" width="750"/>

<br><br>

**3. 상세 페이지** : 사용자가 선택한 상품의 정보를 직관적으로 확인할 수 있습니다.
- **돋보기 확대 기능** : 상품 이미지를 마우스 오버하면 **확대하여 디테일 확인** 가능
- **상품 정보 표시** : 브랜드, 제품명, 가격, 상세 설명을 시각적으로 전달
- **구매 관련 액션 제공**
  
  (1) ADD TO CART : localStorage 기반 장바구니 저장
  
  (2) BUY IT NOW : 해당 상품 단일 결제 페이지로 즉시 이동
  
  (3) CONTACT US : 이메일 문의 자동 생성 (mailto)
- **이전 페이지로 자연스러운 이동** : UX 친화적인 뒤로가기 버튼 제공
<img src="https://github.com/user-attachments/assets/d528bf05-8bb1-4bd0-a9df-27992a3ca3d6" width="750"/>

<br><br>

**4. 장바구니** : 사용자가 담은 상품을 한눈에 관리하고, 결제 과정으로 자연스럽게 이어지는 핵심 UX입니다.
- **localStorage 기반 장바구니 보존** : 페이지 새로고침 또는 브라우저 재접속 시에도 상품 유지됨
- **삭제 및 전체 비우기 기능** : 개별 및 전체 관리가 가능, **사용자 편의성 강화**
- **총 금액 자동 계산** : 문자열 가격에서 숫자만 추출하여 합산 로직 구현
- **단일 결제와 장바구니 결제 분기 처리** : 흐름에 따라 Checkout 페이지에 서로 다른 데이터를 전달함
  
  (단일 결제, 일괄 결제 로직이 분리되어 있습니다.)
<img src="https://github.com/user-attachments/assets/b9a1980f-a7d5-4cc9-8c68-f7657242e664" width="750"/>

<br><br>

**5. 주문 및 결제** : 사용자가 주문 정보를 입력하고 실제 결제 흐름으로 전환되는 핵심 단계입니다.
- 단일 상품 결제 / 장바구니 일괄 결제 **두가지 흐름을 지원**
- 시/도 선택에 따라 **도서산간 배송비 자동 계산** (일반 : 4500원 / 도서산간 : 6000원)
- 사용자가 입력한 데이터를 **form 상태로 관리**
- 주문 정보를 결제 완료 페이지에 **React Router state로 전달**
- 결제 처리 중 로딩 UI를 표시하여 신뢰도를 강화 

**주문 / 결제 화면**

<img src="https://github.com/user-attachments/assets/b6e1aa50-d16a-432a-9800-571cc1c66017" width="750"/>

<br><br>

**결제 완료 화면**
<br><br>
<img src="https://github.com/user-attachments/assets/9737d45d-af1b-412e-8d71-a34d134187c1" width="750"/>

---

## 👤 개발
**ansanthesoloist**

**20201092@vision@hoseo.edu**

좋은 하루 되세요.
