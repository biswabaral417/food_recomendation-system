import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useContext } from 'react';
import './App.css';
import Nav from './components/userPanel/Nav';
import LoginModal from './components/userPanel/LoginModal';
import Signup from './components/userPanel/Signup';
import CombinedContext from './contexts/CombinedContext';


const AdminManagement = lazy(() => import('./components/adminPanel/AdminManagement'));
const AdminPanelHome = lazy(() => import('./components/adminPanel/AdminPanelHome'));
const AdminPanelServe = lazy(() => import('./components/adminPanel/AdminPanelServe'));
const AdminRegister = lazy(() => import('./components/adminPanel/AdminRegister'));
const AdminNav = lazy(() => import('./components/adminPanel/AdminNav'));

const Home = lazy(() => import('./components/userPanel/Home'));
const About = lazy(() => import('./components/userPanel/About'));
const Cart = lazy(() => import('./components/userPanel/Cart'));
const Foods = lazy(() => import('./components/userPanel/Foods'));

function App() {
  const { signUpModal, loginModal,userType } = useContext(CombinedContext);
  


  return (
    <>
      <BrowserRouter>
        {signUpModal && <Signup />}
        {loginModal && <LoginModal />}
        <Suspense fallback={<div>Loading...</div>}>
          {userType==="admin" ?
            (
              <Suspense fallback={<div>Loading Admin Nav...</div>}>
                <AdminNav />
              </Suspense>
            ) : (
              <Nav />
            )}
          <Routes>
            <Route path='/' element={<Home userType={userType} />} />
            <Route path='/foods' element={<Foods />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element={<About />} />
            <Route path='/admin/Superuser' element={<AdminManagement/>} />
            <Route path='/admin/' element={<AdminPanelHome />} />
            <Route path='/admin/serve' element={<AdminPanelServe />} />
            <Route path='/admin/register' element={<AdminRegister />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
