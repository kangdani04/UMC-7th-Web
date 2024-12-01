// src/components/CartContainer.jsx
import CartItem from "./CartItem";
import useCartStore from "../store/cartStore";
import { useModalStore } from "../store/modalStore";

const CartContainer = () => {
  const { cartItems, total, amount, clearCart } = useCartStore();
  const { openModal } = useModalStore();

  return (
    <section className="cart">
      <header>
        <h2>선택한 음반</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            총 가격 <span>₩ {total}원</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={openModal}>
          장바구니 초기화
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
