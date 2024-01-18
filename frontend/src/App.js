
import Navbar from "./components/navbar"
import {BrowserRouter,Routes,Route}  from "react-router-dom";
import Create from "./components/Create";
import Update from "./components/Update";
import Read from "./components/Read";
function App() {

  return <>
  <div className="App">
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route exact path="/" element={<Create />}/>
      <Route path="/all" element={<Read />}/>
      <Route path="/:id" element={<Update />}/>
    </Routes>
  </BrowserRouter>
  </div>
  </>
}

export default App;