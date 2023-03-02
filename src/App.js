import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Profile from './pages/Profile';
import List from './pages/List';
import Review from './pages/Review';
import Ranking from './pages/Ranking';
import Aleatorio from './pages/Aleatorio';

function App() {
  return (
    <div className='flex flex-row'>

    <Sidebar />

    
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/list' element={<List />} />
        <Route path='/review' element={<Review />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/aleatorio' element={<Aleatorio />} />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
