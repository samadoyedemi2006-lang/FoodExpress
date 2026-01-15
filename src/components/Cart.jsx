import "./Cart.css";
import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart, increase, decrease }) {

  const total = (cart.reduce(
    (sum, item) => sum + ((item.price)/100).toFixed(2)* item.qty,
    0
  )).toFixed(2);

  return (
    <div className="cart-page">
      <title>Cart</title>
      <header className="header">
          <Link to="/"  className="cart-link"><h1 className="logo">FoodExpress</h1></Link>
          <h1>Your Cart</h1>
       <Link className="cart-link" to="/cart">
          <div className="cart">
          🛒 <span className="cart-count">{cart.length}</span>
        </div>
       </Link>
      </header>


      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div>
                <img className="imgdd" src={item.image}></img>
                <h4>{item.name}</h4>
          </div>
          
          <div>
            <button className="quty" onClick={() => decrease(item.id)}>-</button>
            <span>{item.qty}</span>
            <button className="quty" onClick={() => increase(item.id)}>+</button>
          </div>

          <p>₦{((item.price)/100).toFixed(2)}</p>

          <button className="remove" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      {cart.length===0?null:<h3>Total: ₦{total}</h3>}
    </div>
  );
}

export default Cart;
