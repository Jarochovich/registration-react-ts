import './App.css';
import Layout from './Components/Layout/Layout';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import ResetPass from './Components/ResetPass/ResetPass';

function App() {

  return (
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element ={<SignUp />}/>
              <Route path='/sign-up' element ={<SignUp />}/>
              <Route path='/sign-in' element = {<SignIn />}/>
              <Route path='/reset-password' element = {<ResetPass />}/>
              <Route path='*' element={<h1>Not found page</h1>} />
          </Route>
        </Routes>
  );
}

export default App;
