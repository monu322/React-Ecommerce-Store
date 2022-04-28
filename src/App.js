
import './App.scss';

import Navigation from './components/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './components/sign-in/sign-in.component';

import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signin' element={<SignIn/>} />
      </Routes> 
    </>
  );
}

export default App;
