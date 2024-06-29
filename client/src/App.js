import { Route, Routes } from 'react-router-dom';

import FetchUser from './components/auth/FetchUser';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Register from './components/auth/Register';
import Dash from './components/dashboard/Dash';
import Home from './components/dashboard/Home';
import Notes from './components/notes/Notes';
import Payments from './components/payments/Payments';
import MainFooter from './components/shared/MainFooter';
import Navbar from './components/shared/Navbar';
import NoMatch from './components/shared/NoMatch';

const App = () => (
  <>
    <Navbar />
    <>
      <FetchUser>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/dash' element={<Dash />} />
            <Route path='/:id/payments' element={<Payments />} />
            <Route path='/:id/notes' element={<Notes />} />
          </Route>
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