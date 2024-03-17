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
import {AuthorizeUser, ProtectRoute} from './middleware/auth';
function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={< Username/>}/>
          <Route path='/register' element={< Register/>}/>
          <Route path='/username' element={< Username/>}/>
          <Route path='/recovery' element={< Recovery/>}/>
          <Route path='/reset' element={< Reset/>}/>
          <Route path='/profile' element={<AuthorizeUser>< Profile/></AuthorizeUser>} />
          <Route path='/password' element={<ProtectRoute>< Password /></ProtectRoute>}/>
          <Route path='*' element={< PageNotFound />}/>
          
        </Routes>
        
      </BrowserRouter>
    );
}

export default App;
