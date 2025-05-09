import { Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage'; 
import AddWord from './pages/AddWord'; 
import EditWord from './pages/EditWord';
import WordDetail from './pages/WordDetail'; 
import Menu from './components/Menu'; 
import ManagersPage from './pages/ManagersPage';
import ManagerDetail from './pages/ManagerDetail';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/add-word" element={<AddWord />} /> 
        <Route path="/edit-word/:wordId" element={<EditWord />} /> 
        <Route path="/managers" element={<ManagersPage />} />
        <Route path="/manager-detail/:managerId" element={<ManagerDetail />} />
        <Route path="/word-detail/:wordId" element={<WordDetail />} /> 
        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
      <ToastContainer />  
    </>
  );
}

export default App;
