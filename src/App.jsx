import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Trail from './components/trail/trail';
import './App.css';
import Ecotalk_carbon from './components/chat/Ecotalk_carbon';
import Ecotalk_diesease from './components/chat/Ecotalk_diesease';
import Ecotalk_identification from './components/chat/Ecotalk_identification';
import Forum from './components/forum/forum';
import Landing from './components/landing/landing';
import Login from './components/authentication/login/login';
import Fregister from './components/authentication/farmer/farmer_register';
import Flogin from './components/authentication/farmer/farmer_login';
import Uregister from './components/authentication/user/user_register';
import Ulogin from './components/authentication/user/user_login';

import Farmer from './components/farmer_console/farmer';
import MarketPrices from './components/farmer_console/market';
import Harb from './components/harb/Harb';
import Chatbot from './components/chatbot/chatbot';
function App() {
  return (

<div>
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/fregister" element={<Fregister />} />
      <Route path="/flogin" element={<Flogin />} />
      <Route path="/market" element={<MarketPrices />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trail" element={<Trail />} />
      <Route path="/forum" element={<Forum />} />
      <Route path ="/uregister" element={<Uregister />} />
      <Route path="/ulogin" element={<Ulogin />} />
      <Route path="/farmer" element={<Farmer />} />
      <Route path="/ecotalk_carbon" element={<Ecotalk_carbon />} />
      <Route path="/ecotalk_diesease" element={<Ecotalk_diesease />} />
      <Route path="/ecotalk_identification" element={<Ecotalk_identification />} />
      <Route path="/herb" element={<Harb />} />
      

    </Routes>
  </Router>

  
</div>
  );
}

export default App;
