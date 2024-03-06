import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Login } from './components/Auth/Login';
import { DefaultLayout } from './components/views/layouts/DefaultLayout';

function App() {
  return (
    < DefaultLayout>
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home content</h1>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<h1>register</h1>}/>
      </Routes>
    </Router>
    </DefaultLayout>
  );
}

export default App;
