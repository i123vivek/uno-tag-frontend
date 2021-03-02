import React from 'react';
import './App.css';
import Signin from './../components/Signin';
import Register from './../components/Register';
import Home from './../components/Home';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to={'/Home'} className="navbar-brand" style={{ color: "white" }}>UnoTag</Link>
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item" key="login">
                                <Link to={'/Login'} className="nav-link" style={{ color: "white" }}>Login</Link>
                            </li>
                            <li className="nav-item" key="signup">
                                <Link to={'/Signup'} className="nav-link" style={{ color: "white" }}>Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                </nav> <br />
                <Switch>
                    <Route path='/Login' exact component={Signin} />
                    <Route path='/Signup' exact component={Register} />
                </Switch>
                <Switch>
                    <Route path='/Home' exact component={Home} />
                    <Route path='/' exact component={Signin} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}


export default App;