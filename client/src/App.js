import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './pages/Main';
import FormsView from './components/FormsView';
import EditForm from './pages/EditForm';



function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/forms' element={<FormsView/>}/>
      <Route path='/forms/:id' element={<EditForm/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;