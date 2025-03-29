import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Trail from './components/trail/trail';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/trail" element={<Trail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

