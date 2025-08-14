import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Kids from './pages/Kids/Kids';
import Mens from './pages/Mens/Mens';
import Womens from './pages/Womens/Womens';
import Cart from './pages/Cart/Cart';
import LoginSignup from './pages/LoginSignup/LoginSignup';
import NotFound from './components/NotFound/NotFound';
import { Footer } from './components/Footer/Footer';
import Product from './pages/Product/Product';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && 
        item.selectedSize === product.selectedSize && 
        item.selectedColor === product.selectedColor
      );
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + product.quantity;
        if (newQuantity > (product.stock || 10)) {
          toast.error(`Only ${product.stock || 10} available in stock!`);
          return prevItems;
        }
        
        toast.success(`${product.title} quantity updated to ${newQuantity}!`);
        return prevItems.map(item =>
          item.id === product.id && 
          item.selectedSize === product.selectedSize && 
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      if (product.stock <= 0) {
        toast.error(`${product.title} is out of stock!`);
        return prevItems;
      }
      
      toast.success(`${product.title} added to cart!`);
      return [...prevItems, { ...product }];
    });
  };

  const removeFromCart = (product) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(
        item.id === product.id && 
        item.selectedSize === product.selectedSize && 
        item.selectedColor === product.selectedColor
      ))
    );
    toast.error(`${product.title} removed from cart!`);
  };

  const updateQuantity = (product, quantity) => {
    if (quantity < 1) return;
    if (quantity > (product.stock || 10)) {
      toast.error(`Only ${product.stock || 10} available in stock!`);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === product.id && 
        item.selectedSize === product.selectedSize && 
        item.selectedColor === product.selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar cartCount={cartCount} />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="*" element={<NotFound />} />
          <Route 
            path="/product/:productId" 
            element={<Product addToCart={addToCart} />} 
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;