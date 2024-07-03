import { Route,Routes } from 'react-router-dom';
import './App.css';
 import { LoginPage } from './pages/LoginPage';
 import { NewFeed } from './pages/NewFeedPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchPage } from './pages/SearchPage';
function App() {
  return (
    <div className="App" style={{fontSize:"28px"}}>
       <Routes>
        <Route path="/" element={<NewFeed/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path='profile/:id' element={<ProfilePage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
