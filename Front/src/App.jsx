import { Route, Routes  } from "react-router";
import Home from "./pages/Home";
import TravelDetails from "./pages/TravelDetails";
import Travels from "./pages/Travels";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/travels" element={<Travels />} />
      <Route path="/travels/:id" element={<TravelDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App;
