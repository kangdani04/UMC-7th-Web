// src/App.jsx
import { useEffect } from 'react';
import useCartStore from './store/cartStore';
import { useModalStore } from './store/modalStore';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Footer from './components/Footer';
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';

function App() {
  const { cartItems, calculateTotals } = useCartStore();
  const { isOpen } = useModalStore();

  useEffect(() => {
    if (cartItems.length > 0) {
      calculateTotals();
    }
  }, [cartItems, calculateTotals]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <CartContainer />
        {isOpen && (
          <ModalPortal>
            <Modal>
              <h4>정말 삭제하시겠습니까?</h4>
            </Modal>
          </ModalPortal>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
