import { Route, Routes  } from "react-router";
import Home from "./pages/Home";

const App = () => { 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route />
      <Route /> */}
    </Routes>
  )
}

export default App;
