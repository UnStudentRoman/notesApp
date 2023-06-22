import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage';
import Theme from './components/ThemeButton';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';

function App() {
  const theTitle = 'Note List'
  const [isDark, setIsDark] = useState('container')


  const handleChangeHeader = (e) => {
    e ? setIsDark('container dark') : setIsDark('container');
  }

  return (
    <Router>
      <div className={isDark}>
        <div className='app'>
          <Header title={theTitle} onChangeTheme={handleChangeHeader} />
          <Routes>
            <Route path='/login' exact Component={LoginPage}/>
            <Route path='/' exact Component={NotesListPage}/>
            <Route path='/note/:id' Component={NotePage}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
