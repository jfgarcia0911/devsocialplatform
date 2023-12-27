import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

function App() {
    return (
        <Router>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Landing/>} />
                </Routes>
        </Router>
    );
}

export default App;
