import "./Cart.css";
import { Link } from "react-router-dom";
import { FaShoppingCart,FaBoxOpen } from "react-icons/fa";
function Favourite({cart, Favourite, removeFromLiked }) {


  return (
    <div className="cart-page">
      <title>Favourite</title>
       <header className="header">
                <Link to="/"  className="cart-link"><h1 className="logo">FoodExpress</h1></Link>
                <h1>Favourite</h1>
             <Link className="cart-link" to="/cart">
                <div className="cart">
                <FaShoppingCart/> <span className="cart-count">{cart.length}</span>
              </div>
             </Link>
            </header>
      {Favourite.length === 0 && <><FaBoxOpen/> <p>Favourite is empty </p></>}

      {Favourite.map(item => (
        <div key={item.id} className="cart-item">
          <div>
                <img className="imgdd" src={item.image}></img>
                <h4>{item.name}</h4>
          </div>

          <p>₦{((item.price)/100).toFixed(2)}</p>

          <button className="remove" onClick={() => removeFromLiked(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favourite;
