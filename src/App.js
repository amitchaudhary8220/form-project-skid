import { Route, Routes } from "react-router-dom";
import "./App.css";
import User from "./components/User";
import UserEdit from "./components/UserEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/useredit" element={<UserEdit />} />
    </Routes>
  );
}

export default App;
