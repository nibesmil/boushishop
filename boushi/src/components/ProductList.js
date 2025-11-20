// src/components/ProductList.js
import { useNavigate } from "react-router-dom";

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

export default ProductList;
