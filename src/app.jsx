import Login from './components/login/login';
import styles from './app.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Maker from './components/maker/maker';
function App({ authService, FileInput, cardRepository }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login authService={authService} />} />
          <Route path="/maker" element={<Maker cardRepository={cardRepository} FileInput={FileInput} authService={authService} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
