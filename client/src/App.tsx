import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/auth/sign-up/Signup";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
