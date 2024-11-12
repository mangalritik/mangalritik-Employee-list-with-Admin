import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

import { useEffect, useCallback } from 'react';

function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer position='top-center' />
        <Header />
        <main className='min-h-[calc(100vh-57px)] pt-16'>
          <Outlet />
        </main>
        {/* <Footer/> */}
      </Context.Provider>
    </>
  );
}

export default App;
