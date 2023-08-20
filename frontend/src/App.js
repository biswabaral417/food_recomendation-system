import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import './App.css';
import Nav from './components/userPanel/Nav';
import Home from './components/userPanel/Home';
import About from './components/userPanel/About';
import Cart from './components/userPanel/Cart';
import Foods from './components/userPanel/Foods';
import LoginModal from './components/userPanel/LoginModal';
import Signup from './components/userPanel/Signup';
import CombinedContext from './contexts/CombinedContext';

function App() {
  const { signUpModal, loginModal } = useContext(CombinedContext);

  return (
    <div>
      <BrowserRouter>
        {signUpModal && <Signup />}
        {loginModal && <LoginModal />}
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/foods' element={<Foods />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
