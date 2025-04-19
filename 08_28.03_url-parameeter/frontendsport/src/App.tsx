import './App.css';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import MainPage from './pages/MainPage';
import ManageSportspersons from './pages/ManageSportspersons';
import ManageResults from './pages/ManageResults';

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sportspersons" element={<ManageSportspersons />} />
        <Route path="/results" element={<ManageResults />} />
        <Route path="*" element={<div>Lehte ei leitud</div>} />
      </Routes>
    </>
  );
}

export default App;