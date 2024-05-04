import logo from './logo.svg';
// import './App.css';
import Header from './components/Header';
import UserFeature from './features/User';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import ProductFeature from './features/Product';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<>Home page</>} exact/>
        <Route path='/users/*' Component={UserFeature} />
        <Route path='/products/*' Component={ProductFeature} />
        <Route path='/*' Component={NotFound} />
      </Routes>
    </div>
  );
}

export default App;
