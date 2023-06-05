import {BrowserRouter,Routes,Route} from "react-router-dom"
import Employee from './Employee/Employee';
import './App.css';
import CreateEmployee from "./CreateEmployee/CreateEmployee";

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Employee/>}/>
      <Route path='/create' element={<CreateEmployee/>}/>
     </Routes>
    </BrowserRouter> 
  );
}

export default App;
