/* eslint-disable require-jsdoc */
import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Homepage } from './pages/Homepage';
import { NotFound } from './pages/NotFound';
import { My } from './pages/My';
import { Details } from './pages/Details';

function App() {
  return (
    <>
    
   
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/my" element={<My />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
