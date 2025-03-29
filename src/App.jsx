import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Trail from './components/trail/trail';
import './App.css';
import Ecotalk_carbon from './components/chat/Ecotalk_carbon';
import Ecotalk_diesease from './components/chat/Ecotalk_diesease';
import Ecotalk_identification from './components/chat/Ecotalk_identification';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/chat" element={<Chat />} />

          <Route path="/trail" element={<Trail />} />
=======
          <Route path="/ecotalk_carbon" element={<Ecotalk_carbon />} />
          <Route path="/ecotalk_diesease" element={<Ecotalk_diesease />} />
          <Route path="/ecotalk_identification" element={<Ecotalk_identification />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;

