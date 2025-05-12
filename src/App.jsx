import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SegmentCreator from './pages/SegmentCreator.jsx';
import CampaignHistory from './pages/CampaignHistory.jsx';
import Login from './pages/Login.jsx';
import DataIngestion from './pages/DataIngestion';
import AuthSuccess from './pages/AuthSuccess';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/dataIngestion"
          element={
            <ProtectedRoute>
              <DataIngestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/segment"
          element={
            <ProtectedRoute>
              <SegmentCreator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <CampaignHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
