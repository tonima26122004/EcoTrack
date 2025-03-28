import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/chat/Chat';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

