import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useContext } from 'react';
import './App.css';
import Nav from './components/userPanel/Nav';
import LoginModal from './components/userPanel/LoginModal';
import Signup from './components/userPanel/Signup';
import CombinedContext from './contexts/CombinedContext';



import AdminManagement from './components/adminPanel/AdminManagement';
import AdminPanelHome from './components/adminPanel/AdminPanelHome';
import AdminPanelServe from './components/adminPanel/AdminPanelServe';
import AdminRegister from './components/adminPanel/AdminRegister';

const AdminNav = lazy(() => import('./components/adminPanel/AdminNav'));

const Home = lazy(() => import('./components/userPanel/Home'));
const About = lazy(() => import('./components/userPanel/About'));
const Cart = lazy(() => import('./components/userPanel/Cart'));
const Foods = lazy(() => import('./components/userPanel/Foods'));


function App() {
  const { signUpModal, loginModal } = useContext(CombinedContext);
  const isAdmin = true;//fake one now used to do admin dev
  const isSuperuser = true;//alsofake to use in superuser panel

  return (
    <>
      <BrowserRouter>
        {signUpModal && <Signup />}
        {loginModal && <LoginModal />}
        {isAdmin ? <AdminNav /> : <Nav />}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/foods' element={<Foods />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element={<About />} />
            <Route path='/admin/Superuser' element={<AdminManagement isSuperuser={isSuperuser} />} />{/*used fake to dev for now*/}
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
