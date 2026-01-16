import "./Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { homepage } from "../../homepage";
import { features } from "../../features";

function Home({addToCart, cart, addedId,liked,addToLike}) {

  
  const newList = []
  homepage.forEach(items => {
      newList.push(
      <div className="product-card" key={items.id}>
          <div className="img-div">
            <img className="img-placeholder pizza" src={items.image}></img>
          </div>
          <h4>{items.name}</h4>
          <p>{items.details}</p>
      </div>
    )
  })

 
  return (
    <div className="home">
      <title>Home</title>
          <header className="headerm">
          <Link to="/"  className="cart-link"><h1 className="logo">FoodExpress</h1></Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
           <Link to="/favourite">Favourite</Link>
        </nav>

       <Link className="cart-link" href="/cart">
          <div className="cart">
          🛒 <span className="cart-count">{cart.length}</span>
        </div>
       </Link>
      </header>

      <section className="hero">
        <div className="hero-content">
            <h2>Delicious Food Delivered Fast</h2>
            <p>Order pizza, burgers & drinks from your favorite place</p>
           <Link to="/menu"><button className="order-btn">Order Now</button></Link>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products">
        <h2>Browser Categories</h2>
        <p>Explore our diverse selection of cuisines</p>

        <div className="product-grid">
          {newList}
        </div>
      </section>
    {console.log(features)}
      <section className="featured">
        <h2 className="section-title">Featured Dishes</h2>
        <p className="section-title">Our most popular items handpicked for you</p>
         <div className="featured-grid">
  {features.map(items => (
    <div className="product-card2" key={items.id}>
      
      <span className="badge">Featured</span>
      
          <div className="img-div2">
            <img className="product-image" src={items.image}></img>
          </div>
          
          <h3>{items.name}</h3>
          <p className="real">{items.details}</p>

          <div className="rating">
            <img className="product-rating-stars" src={`images/ratings/rating-${items.rating.stars * 10}.png`} />
            <span>{((items.rating.stars * 10)/10).toFixed(1)}</span>
          </div>

          <p className="price">₦{((items.price)/100).toFixed(2)}</p>
            <div className="btns">
                <button className="add-btn" onClick={() => addToCart(items)}>Add 🛒</button>

                 {addedId === items.id && (
                  <p className="added-text">✔ Added</p>
                )}

                {liked === items.id && (
                  <p className="added-text">❤ Liked</p>
                )}
              <button className="like-btn" onClick={() => addToLike(items)}>❤</button>
            </div>
        
    </div>
  ))}
</div>
      </section>
       <div className="view">
         <Link to="/menu"><button><span>View Full Menu ➡</span></button></Link>
        </div>
      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 FoodExpress. All Rights Reserved.</p>
      </footer>
       
    </div>
  );
}

export default Home;
