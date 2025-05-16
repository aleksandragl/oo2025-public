import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import UsersPage from "./pages/UsersPage";
import Menu from "./components/Menu";
import AddUserPage from "./pages/AddUserPage";
import LoginPage from "./pages/LoginPage";  

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<MainPage />} />
        <Route path="/users/:id" element={<UsersPage />} />
        <Route path="/users/add" element={<AddUserPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="*" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
