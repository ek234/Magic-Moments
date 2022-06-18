import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Navbar  from "./templates/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
