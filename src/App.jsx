import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Trail from './components/trail/trail';
import './App.css';
import Ecotalk_carbon from './components/chat/Ecotalk_carbon';
import Ecotalk_diesease from './components/chat/Ecotalk_diesease';
import Ecotalk_identification from './components/chat/Ecotalk_identification';
import Forum from './components/forum/forum';

function App() {
  return (

<div>
  <Router>
    <Routes>
      <Route path="/chat" element={<Chat />} />

      <Route path="/trail" element={<Trail />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/ecotalk_carbon" element={<Ecotalk_carbon />} />
      <Route path="/ecotalk_diesease" element={<Ecotalk_diesease />} />
      <Route path="/ecotalk_identification" element={<Ecotalk_identification />} />

    </Routes>
  </Router>

  <Router>
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/ecotalk_carbon" element={<Ecotalk_carbon />} />
      <Route path="/ecotalk_diesease" element={<Ecotalk_diesease />} />
      <Route path="/ecotalk_identification" element={<Ecotalk_identification />} />

      {/* Eco-trail */}
      <Route path="/trail" element={<Trail />} />

    </Routes>
  </Router>
</div>
  );
}

export default App;
