import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {ProvideAuth, useAuth} from "./contexts/AuthContext";
import './styles/App.css';
import NotFoundPage from "./pages/NotFoundPage";

function PrivateRoute({children, ...rest}) {
    let auth = useAuth();

    return (
        <Route
            {...rest}
            render={({location}) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

function RedirectRouteIfAuthenticated({children, ...rest}) {
    let auth = useAuth();

    return (
        <Route
            {...rest}
            render={({location}) =>
                !auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/home",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

function App() {
    return (
        <main className="app-container max-w-6xl mx-auto">
            <Router>
                <ProvideAuth>
                    <Switch>
                        <RedirectRouteIfAuthenticated exact path="/login">
                            <Login/>
                        </RedirectRouteIfAuthenticated>
                        <PrivateRoute exact path="/home">
                            <Home/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/">
                            <Home/>
                        </PrivateRoute>
                        <Route path="*">
                            <NotFoundPage/>
                        </Route>
                    </Switch>
                </ProvideAuth>
            </Router>
        </main>
    );
}

export default App;
