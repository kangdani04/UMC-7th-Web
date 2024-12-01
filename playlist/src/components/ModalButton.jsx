// src/components/ModalButton.jsx
import { useCartStore } from "../store/cartStore";
import { useModalStore } from "../store/modalStore";

const ModalButton = () => {
  const { clearCart } = useCartStore();
  const { closeModal } = useModalStore();

  return (
    <div className="btn-container">
      <button
        type="button"
        className="btn confirm-btn"
        onClick={() => {
          clearCart();
          closeModal();
        }}
      >
        네
      </button>
      <button
        type="button"
        className="btn clear-btn"
        onClick={closeModal}
      >
        아니요
      </button>
    </div>
  );
};

export default ModalButton;
