// src/components/Navbar.jsx
import useCartStore from "../store/cartStore";
import { CartIcon } from "../constants/icons";

const Navbar = () => {
  const { amount } = useCartStore();

  return (
    <nav>
      <div className="nav-center">
        <h3>PlayList</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
