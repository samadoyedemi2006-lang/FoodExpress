import Home from "./components/Homepage";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Favourite from "./components/Liked";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  // CART STATE (with localStorage)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorite, setFavorite] = useState(() => {
    const savedFavorite = localStorage.getItem("favorite");
    return savedFavorite ? JSON.parse(savedFavorite) : [];
  });

  // STATE TO TRACK WHICH PRODUCT WAS ADDED
  const [addedId, setAddedId] = useState(null);
  const [liked, setLiked] = useState(null)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  // ADD TO CART
  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        ) 
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    // SHOW "ADDED" UNDER THIS PRODUCT
    setAddedId(product.id);

    // REMOVE MESSAGE AFTER 2 SECONDS
    setTimeout(() => {
      setAddedId(null);
    }, 2000);
  }
  function addToLike(product) {
    const existing = favorite.find(item => item.id === product.id);

    if (existing) {
      alert('Product already Added')
      return
    } else {
      setFavorite([...favorite, product]);
    }

    // SHOW "ADDED" UNDER THIS PRODUCT
    setLiked(product.id);

    // REMOVE MESSAGE AFTER 2 SECONDS
    setTimeout(() => {
      setLiked(null);
    }, 2000);
  }
  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id));
  }

   function removeFromLiked(id) {
    setFavorite(favorite.filter(item => item.id !== id));
  }

  function increase(id) {
    setCart(
      cart.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  function decrease(id) {
    setCart(
      cart.map(item =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  }

  return (
    <Routes>
      <Route path="/" element={
          <Home 
            addToCart={addToCart}
            addToLike={addToLike}
             liked={liked}
            cart={cart}
            addedId={addedId} 
          />
      } />

      <Route
        path="/menu"
        element={
          <Menu
            addToCart={addToCart}
            addToLike={addToLike}
            cart={cart}
            addedId={addedId}
            liked={liked}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            increase={increase}
            decrease={decrease}
          />
        }
      />

      <Route
        path="/favourite"
        element={
          <Favourite
            cart={cart}
            Favourite={favorite}
            removeFromLiked={removeFromLiked}
          />
        }
      />

    </Routes>
  );
}

export default App;
