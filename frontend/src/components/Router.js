import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Event from '../pages/Event';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

function Router() {

  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="event" element={<Event />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
