import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
//Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { useEffect } from 'react';


if(localStorage.token){
    setAuthToken(localStorage.token)
}

function App() {

    useEffect(()=> {
        store.dispatch(loadUser())
    },[])

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Landing />} />
                </Routes>

                <section className='container'>
                    <Alert />
                    <Routes>

                        <Route exact path='/register' element={<Register />} />
                        <Route exact path='/login' element={<Login />} />
                    </Routes>
                </section>
            </Router>
        </Provider>
    );
}

export default App;
