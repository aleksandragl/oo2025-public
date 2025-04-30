import './App.css';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import MainPage from './pages/MainPage';
import ManageSportspersons from './pages/ManageSportspersons';
import ManageResults from './pages/ManageResults';
import SingleSportsperson from  './pages/SingleSportsperson';
import SingleResult from  './pages/SingleResult';
import EditResult from './pages/EditResult';
import EditSportsperson from './pages/EditSportsperson';

function App() {
  return (
    <>
      <Menu />
      <Routes>
      <Route path="/" element={<MainPage />} />
        <Route path="/sportspersons" element={<ManageSportspersons />} />
        <Route path="/results" element={<ManageResults />} />
        <Route path="/admin/edit-result/:resultId" element={ <EditResult /> } />
        <Route path="/admin/edit-sportsperson/:sportspersonId" element={ <EditSportsperson /> } />
        <Route path="/results/:resultId" element={ <SingleResult /> } />
        <Route path="/sportspersons/:sportspersonId" element={ <SingleSportsperson /> } /> 
        <Route path="*" element={<div>Lehte ei leitud</div>} />
      </Routes>
    </>
  );
}

export default App;