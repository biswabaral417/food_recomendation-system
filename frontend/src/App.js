import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home'
import About from './components/About';
import Cart from './components/Cart';
// import Viewitems from './components/Viewitems';
import Foods from './components/Foods';
import SharedState from './contexts/SharedState';
import LoginModal from './components/LoginModal';
import Signup from './components/Signup';



function App() {
  const [loginModal, setLoginModal] = useState(false);
  const openLoginModal = () => {
    document.body.style.overflowY = "hidden";
    setLoginModal(true);

  }
  const closeLoginModal = () => {
    setLoginModal(false);
    document.body.style.overflowY = "scroll";
  }
  const [signUpModal, setSignUpModal] = useState(false);
  const openSignUpModal = () => {
    document.body.style.overflowY = "hidden";
    setSignUpModal(true);

  }
  const closeSignUpModal = () => {
    setSignUpModal(false);
    document.body.style.overflowY = "scroll";
  }




  return (
    <div>
      {signUpModal && <Signup closeSignUpModal={closeSignUpModal} openLoginModal={openLoginModal}/>}
      {loginModal &&
        <LoginModal closeLoginModal={closeLoginModal} openSignUpModal={openSignUpModal} />
      }
      <BrowserRouter>
        <SharedState>
          <Nav openLoginModal={openLoginModal}/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/foods' element={<Foods />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </SharedState>
      </BrowserRouter>
    </div>
  );
}

export default App;
