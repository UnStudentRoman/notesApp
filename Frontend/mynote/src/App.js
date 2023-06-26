import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage';
import LoginPage from './pages/LoginPage';
import PrivateRoutes from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  const theTitle = 'Notes'
  const [isDark, setIsDark] = useState('container')


  const handleChangeHeader = (e) => {
    e ? setIsDark('container dark') : setIsDark('container');
  }

  return (
    <Router>
      <AuthProvider>
        <div className={isDark}>
          <div className='app'>
            <Header title={theTitle} onChangeTheme={handleChangeHeader} />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element={<NotesListPage/>} path='/' exact />
                <Route element={<NotePage/>} path='/note/:id' exact />
              </Route>
              <Route element={<LoginPage/>} path='/login'/>
              {/* <Route path='/' exact Component={NotesListPage}/>
              <Route path='/note/:id' Component={NotePage}/> */}
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
