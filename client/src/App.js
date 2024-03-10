import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import Username from './components/Username';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import Profile from './components/Profile';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';
function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<>Root Router</>}/>
          <Route path='/register' element={< Register/>}/>
          <Route path='/username' element={< Username/>}/>
          <Route path='/recovery' element={< Recovery/>}/>
          <Route path='/reset' element={< Reset/>}/>
          <Route path='/profile' element={< Profile/>}/>
          <Route path='/password' element={< Password />}/>
          <Route path='*' element={< PageNotFound />}/>
          
        </Routes>
        
      </BrowserRouter>
    );
}

export default App;
