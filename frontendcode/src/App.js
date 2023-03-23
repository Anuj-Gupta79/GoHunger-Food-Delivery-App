import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomePage from './Screen/HomePage';
import Login from './Screen/Login';

function App() {
  return (
    <Router>
    <div>
      <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/login' element={<Login/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
