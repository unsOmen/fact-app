import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MatchPage from './pages/MatchPage';
import AppLayout from './components/AppLayout';


const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<SearchPage />} />
          <Route path=':matchId' element={<MatchPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
