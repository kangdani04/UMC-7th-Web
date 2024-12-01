// src/components/CartItem.jsx
import { ChevronDown, ChevronUp } from "../constants/icons";
import { useCartStore } from "../store/cartStore";

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const { increase, decrease, removeItem } = useCartStore();

  return (
    <article className="cart-item">
      <img src={img} alt={`${title} 이미지`} />
      <div>
        <h4>
          {title} | {singer}
        </h4>

        <h4 className="item-price">₩ {price}</h4>
      </div>
      <div>
        <button className="amount-btn" onClick={() => increase(id)}>
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>

        <button
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
              removeItem(id);
              return;
            }
            decrease(id);
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
