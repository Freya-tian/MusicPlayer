
import './App.css'
import {  useRef, useState } from 'react';

// import Homeview from './views/Homeview/Homeview';
import {  useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { AppDispatch ,RootState} from './store/store.js';
import { useDispatch,useSelector } from 'react-redux';
import {fetchhistoryList} from './store/PlayList/PlayList.js'
import { useEffect } from 'react';

function App() {

  const element = useRoutes(routes)
  const dispatch = useDispatch<AppDispatch>();
  const HistoryList = useSelector((state: RootState) =>
    state.PlayList
    )
 
  
  return element

 
}

export default App
