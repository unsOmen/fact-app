import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import MatchPage from '../pages/MatchPage';
import AppLayout from './AppLayout';


const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/'>
          <Route path='' element={<SearchPage />}/>
          <Route path=':matchId' element={<MatchPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;