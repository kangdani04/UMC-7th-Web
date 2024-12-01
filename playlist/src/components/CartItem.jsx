import { ChevronDown, ChevronUp } from "../constants/icons";
import { useDispatch } from "react-redux";
import { increase, decrease, removeItem, clearCart } from "../features/cart/cartSlice";

const CartItem = ({ id, title, singer, price, img, amount }) => {
    const dispatch = useDispatch();

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
                <button className="amount-btn" onClick={() => dispatch(increase(id))}>
                    <ChevronUp />
                </button>
                <p className="amount">{amount}</p>

                <button className="amount-btn" onClick={() => {
                    if (amount === 1) {
                        dispatch(removeItem(id));
                        return;
                    }
                    dispatch(decrease(id));
                }}>
                    <ChevronDown />
                </button>
            </div>
        </article>
    );
};

export default CartItem;