import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import LoginScreen from './pages/login';
import HomeScreen from './pages/home';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Reducer from './redux/reducer';
const store = configureStore({
  reducer: Reducer
});
function App() {
  return (

    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginScreen />} />
          <Route exact path="/home" element={<HomeScreen />} />
        </Routes>

      </Router>
    </Provider>
  );
}

export default App;
