import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { CoinPage } from './pages/CoinPage';
import { styled } from '@mui/system';
import './App.css';

const HomeComponent = styled('div')({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});


function App() {

  return (

    <BrowserRouter>
      <HomeComponent>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coins/:id' element={<CoinPage />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </HomeComponent>
    </BrowserRouter >
  );
}

export default App;
