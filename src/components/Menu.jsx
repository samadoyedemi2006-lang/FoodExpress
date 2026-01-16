import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import "./menuu.css";
import { products } from "../../products";
import { FaBars, FaTimes, FaShoppingCart, FaHeart, FaArrowRight } from "react-icons/fa";

function Menu({ addToCart, addToLike, cart, addedId, liked }) {
  const [selectUnique, setSelectUnique] = useState("all");
  const observerRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts =
    selectUnique === "all"
      ? products
      : products.filter((items) => items.uniqueName === selectUnique);

 
  const cardsRef = useRef([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observerRef.current.observe(card);
    });

    return () => observerRef.current.disconnect();
  }, [filteredProducts]);

  return (
    <>
    <title>Menu</title>
      <div className="home">
        <header className="headerp">
          <Link to="/" className="logo-link">
            <h1 className="logo">FoodExpress</h1>
          </Link>

           <nav className={menuOpen ? "active" : ""}>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/favourite">Favourite</Link>
          </nav>

          <Link className="cchha" to="/cart">
            <div className="cart">
             <FaShoppingCart />
              <span className="cart-count">{cart.length}</span>
            </div>
          </Link>
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        </header>
      </div>

      
      <h2>Our Menu</h2>
      <p>Discover our delicious selection of meals</p>
      <div className="nav-item">
        
        <button
          className={selectUnique === "all" ? "active" : ""}
          onClick={() => setSelectUnique("all")}
        >
          All Items
        </button>
        <button
          className={selectUnique === "Burger" ? "active" : ""}
          onClick={() => setSelectUnique("Burger")}
        >
          Burger
        </button>
        <button
          className={selectUnique === "Cake" ? "active" : ""}
          onClick={() => setSelectUnique("Cake")}
        >
          Desserts
        </button>
        <button
          className={selectUnique === "Juice" ? "active" : ""}
          onClick={() => setSelectUnique("Juice")}
        >
          Drinks
        </button>
        <button
          className={selectUnique === "pasta" ? "active" : ""}
          onClick={() => setSelectUnique("pasta")}
        >
          Pasta
        </button>
        <button
          className={selectUnique === "pizza" ? "active" : ""}
          onClick={() => setSelectUnique("pizza")}
        >
          Pizza
        </button>
        <button
          className={selectUnique === "Salad" ? "active" : ""}
          onClick={() => setSelectUnique("Salad")}
        >
          Salad
        </button>
        <button
          className={selectUnique === "sushi" ? "active" : ""}
          onClick={() => setSelectUnique("sushi")}
        >
          Sushi
        </button>
      </div>

      <section className="all-products">
        {filteredProducts.map((items, index) => (
          <div
            className="product-cards"
            key={items.id}
            ref={(el) => (cardsRef.current[index] = el)} // ✅ assign ref for observer
          >
            <span className="badge">Featured</span>

            <div className="img-div2">
            <img className="product-image" src={items.image}></img>
          </div>

            <h3>{items.name}</h3>
            <p className="real">{items.details}</p>

            <div className="rating">
              <img
                className="product-rating-stars"
                src={`images/ratings/rating-${items.rating.stars * 10}.png`}
                alt="rating"
              />
              <span>{items.rating.stars.toFixed(1)}</span>
            </div>
            <p className="price">₦{(items.price / 100).toFixed(2)}</p>

            <div className="btns">
              <button className="add-btn" onClick={() => addToCart(items)}>
                Add <FaShoppingCart />
              </button>

              {addedId === items.id && <p className="added-text">✔ Added</p>}
              {liked === items.id && <p className="added-text">❤ Liked</p>}

              <button className="like-btn" onClick={() => addToLike(items)}>
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Menu;
