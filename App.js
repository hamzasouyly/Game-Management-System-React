import './App.css';
import 'suneditor/dist/css/suneditor.min.css';
import Navbar from './layout/Navbar';
import Slider from './layout/Slider';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Classes from './pages/Classes';
import CreateClass from './pages/CreateClass';
import ShowClass from './pages/ShowClass';
import EditClass from './pages/EditClass';
import Spells from './pages/spells/Spells';
import CreateSpell from './pages/spells/CreateSpell';
import EditSpell from './pages/spells/EditSpell';
import Specialisation from './pages/specialisation/Specialisation';
import CreateSpecialisation from './pages/specialisation/CreateSpecialisation';
import EditSpecialisation from './pages/specialisation/EditSpecialisation';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Roles from './pages/roles/Roles';
import CreateRole from './pages/roles/CreateRole';
import EditRole from './pages/roles/EditRole';
import NotFound from './pages/NotFound';


function App() {

  const token = localStorage.getItem('auth_token');

  if(!token){
    return (
      <div>
        <BrowserRouter>
          <Routes>
        {/* login logout */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

  return (
    
      <div className="App">

          
        <BrowserRouter>
        <Navbar />
        <Slider />
          <Routes>
            
            {/* dashboard */}
            <Route path="/" element={<Dashboard />} />
            {/* classes */}
            <Route path="/classes" element={<Classes />} />
            <Route path="/CreateClass" element={<CreateClass />} />
            <Route path="/show/:slug" element={<ShowClass />} />
            <Route path="/edit/:slug" element={<EditClass />} />

            {/* spells */}
            <Route path="/spells" element={<Spells />} />
            <Route path="/CreateSpell" element={<CreateSpell />} />
            <Route path="/spell/edit/:slug" element={<EditSpell />} />

            {/* specialisation */}
            <Route path="/specialisations" element={<Specialisation />} />
            <Route path="/CreateSpecialisation" element={<CreateSpecialisation />} />
            <Route path="/specialisation/edit/:slug" element={<EditSpecialisation />} />
            {/* Roles */}
            <Route path="/roles" element={<Roles />} />
            <Route path="/CreateRole" element={<CreateRole />} />
            <Route path="/role/edit/:slug" element={<EditRole />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

            

          </Routes>
        </BrowserRouter>
       
      </div>
  );
}

export default App;
