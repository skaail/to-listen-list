import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

function App() {
  return (
    <>

    <Sidebar />

    
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
