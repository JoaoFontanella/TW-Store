import React, { useState, useContext } from 'react';
import './styles/Checkout.css';
import Header from './components/Header';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cpf, setCpf] = useState('');
  const [fullName, setFullName] = useState('');

  // Consumindo o contexto do carrinho
  const { cartItems } = useContext(CartContext);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dados do formulário:', {
      paymentMethod,
      cardNumber,
      expirationDate,
      cvv,
      cpf,
      fullName,
      selectedProducts: cartItems,
    });
  };

  return (
    <div className="checkout-container">
      <Header />
      <div className="products-section">
        <h2>Produtos Selecionados:</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} <br></br>- Qtd: {item.quantity}
            </li>
          ))}
        </ul>
        <p id='total'>Total: R$ {calculateTotalPrice()}</p>
      </div>

      <div className="payment-section">
        <h2>Escolha o Método de Pagamento:</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              id="card"
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={handlePaymentMethodChange}
            />{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="gray"
              className="bi bi-credit-card-2-back-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1z" />
            </svg>
            Cartão
          </label>
          <label>
            <input
              id="paypal"
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={handlePaymentMethodChange}
            />{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="gray"
              className="bi bi-paypal"
              viewBox="0 0 16 16"
            >
              <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.35.35 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91q.57-.403.993-1.005a4.94 4.94 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.7 2.7 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.7.7 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016q.326.186.548.438c.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.87.87 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.35.35 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32z" />
            </svg>
            PayPal
          </label>
          {paymentMethod === 'card' && (
            <div>
              <label>
                Número do Cartão:
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                Data de Expiração:
                <input
                  type="text"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
              </label>
              <label>
                CVV:
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Finalizar</button>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div>
              <label>
                CPF:
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </label>
              <label>
                Nome Completo:
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </label>
              <Link to="/Fim">
                <button id="fim" type="submit">
                  Finalizar
                </button>
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Checkout;
