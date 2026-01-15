import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./menuu.css";
import { products } from "../../products";

function Menu({ addToCart, addToLike, cart, addedId, liked }) {
  const [hover, setHover] = useState(null);
  const [selectUnique, setSelectUnique] = useState("all");
  const observerRef = useRef(null);
  const cardsRef = useRef([]);

  const filteredProducts =
    selectUnique === "all"
      ? products
      : products.filter((item) => item.uniqueName === selectUnique);

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
      <div className="home">
        <header className="headerp">
          <Link to="/" className="logo-link">
            <h1 className="logo">FoodExpress</h1>
          </Link>

          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/favourite">Favourite</Link>
          </nav>

          <Link className="cchha" to="/cart">
            <div className="cart">
              🛒 <span className="cart-count">{cart.length}</span>
            </div>
          </Link>
        </header>
      </div>

      <h2>Our Menu</h2>
      <p>Discover our delicious selection of meals</p>

      <div className="nav-item">
        {["all", "Burger", "Cake", "Juice", "pasta", "pizza", "Salad", "sushi"].map(
          (cat) => (
            <button
              key={cat}
              className={selectUnique === cat ? "active" : ""}
              onClick={() => setSelectUnique(cat)}
            >
              {cat === "all" ? "All Items" : cat}
            </button>
          )
        )}
      </div>

      <section className="all-products">
        {filteredProducts.map((item, index) => (
          <div
            className="product-cards"
            key={item.id}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <span className="badge">Featured</span>

            <div
              className="product-image"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/${item.image})`,
                transform:
                  hover === item.id
                    ? "scale(1.05) translateY(-5px)"
                    : "scale(1)",
              }}
              onMouseEnter={() => setHover(item.id)}
              onMouseLeave={() => setHover(null)}
            />

            <h3>{item.name}</h3>
            <p className="real">{item.details}</p>

            <div className="rating">
              <img
                className="product-rating-stars"
                src={`${process.env.PUBLIC_URL}/images/ratings/rating-${
                  item.rating.stars * 10
                }.png`}
                alt="rating"
              />
              <span>{item.rating.stars.toFixed(1)}</span>
            </div>

            <p className="price">₦{(item.price / 100).toFixed(2)}</p>

            <div className="btns">
              <button className="add-btn" onClick={() => addToCart(item)}>
                Add 🛒
              </button>

              <button className="like-btn" onClick={() => addToLike(item)}>
                ❤
              </button>
            </div>

            {addedId === item.id && <p className="added-text">✔ Added</p>}
            {liked === item.id && <p className="added-text">❤ Liked</p>}
          </div>
        ))}
      </section>
    </>
  );
}

export default Menu;
