import Home from './components/dashboard/Home';
import NoMatch from './components/shared/NoMatch';
import Navbar from './components/shared/Navbar';
import MainFooter from './components/shared/MainFooter';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FetchUser from './components/auth/FetchUser';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { Routes, Route } from 'react-router-dom';

const App = () => (
  <>
    <Navbar />
    <>
      <FetchUser>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NoMatch />} />
        </Routes>
      </FetchUser>
    </>
    <MainFooter />
  </>
)

export default App;