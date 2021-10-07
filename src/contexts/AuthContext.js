import React, {createContext, useContext, useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

const authContext = createContext();

const fakeAuth = {
    isAuthenticated: false,
    signIn(cb) {
        fakeAuth.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', '1');
        setTimeout(cb, 100);
    },
    signOut(cb) {
        fakeAuth.isAuthenticated = false;
        localStorage.removeItem('isAuthenticated');
        setTimeout(cb, 100);
    }
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const redirectRoutes = ['/login', '/home', '/'];

    const signIn = cb => {
        return fakeAuth.signIn(() => {
            setUser("user");
            if (cb && typeof cb === 'function') {
                cb();
            }
        });
    };

    const signOut = cb => {
        return fakeAuth.signOut(() => {
            setUser(null);
            if (cb && typeof cb === 'function') {
                cb();
            }
        });
    };

    const redirectToHomeIfAuthenticated = () => {
        if (parseInt(localStorage.getItem('isAuthenticated'), 10) && redirectRoutes.includes(location.pathname)) {
            setUser("user");
            history.push("/home");
        }
    };

    useEffect(() => {
        redirectToHomeIfAuthenticated();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        user,
        signIn,
        signOut,
        redirectToHomeIfAuthenticated
    };
}

function ProvideAuth({children}) {
    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

function useAuth() {
    return useContext(authContext);
}

export {useAuth, ProvideAuth};