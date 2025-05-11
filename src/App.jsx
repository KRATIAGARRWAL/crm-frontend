import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SegmentCreator from './pages/SegmentCreator.jsx';
import CampaignHistory from './pages/CampaignHistory.jsx';
import Login from './pages/Login.jsx';
import DataIngestion from './pages/DataIngestion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataIngestion" element={<DataIngestion />} />
        <Route path="/segment" element={<SegmentCreator />} />
        <Route path="/campaigns" element={<CampaignHistory />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
