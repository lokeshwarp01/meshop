import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mens" element={<Mens/>} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/product/:productId" element={<Product/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
