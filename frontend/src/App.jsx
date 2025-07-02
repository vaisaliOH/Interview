import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Home from '../pages/Home';
import AddQuestion from '../pages/AddQuestion';
import EditQuestion from '../pages/EditQuestion';
import Navbar from '../components/Navbar';
import QuestionList from '../pages/QuestionList';
import Analytics from '../pages/Analytics';
import Revision from '../pages/Revision';
import CompanyTest from '../pages/CompanyTest';
import Register from '../pages/Register';
import Login from '../pages/Login';
import LandingPage from '../pages/LandingPage';
import FloatingChatbot from '../pages/FloatingChatbot';
import { isAuthenticated } from './auth';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && isAuthenticated() && <Navbar />}
      {!isAuthPage && isAuthenticated() && <FloatingChatbot />}
      <div className="p-4">{children}</div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route
            path="/home"
            element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/add"
            element={isAuthenticated() ? <AddQuestion /> : <Navigate to="/home" />}
          />
          <Route
            path="/view"
            element={isAuthenticated() ? <QuestionList /> : <Navigate to="/view" />}
          />
          <Route
            path="/edit/:id"
            element={isAuthenticated() ? <EditQuestion /> : <Navigate to="/home" />}
          />
          <Route
            path="/analytics"
            element={isAuthenticated() ? <Analytics /> : <Navigate to="/analytics" />}
          />
          <Route
            path="/revision"
            element={isAuthenticated() ? <Revision /> : <Navigate to="/revision" />}
          />
          <Route
            path="/company-test"
            element={isAuthenticated() ? <CompanyTest /> : <Navigate to="/company-test" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
