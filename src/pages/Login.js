import React, {useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

function Login() {
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {from} = location.state || {from: {pathname: "/home"}};

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (userName === 'foo' && password === 'bar') {
            auth.signIn(() => {
                history.replace(from);
            });
        } else {
            setErrorMessage('Try username as "foo" and password as "bar"');
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-xs">
                <h1 className="text-2xl lg:text-4xl mb-5">Login</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Username" required
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            onKeyDown={() => setErrorMessage('')}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="******************" required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={() => setErrorMessage('')}
                        />
                    </div>
                    {errorMessage ? (<p className="text-red-500 mb-3 text-sm">{errorMessage}</p>) : ''}
                    <div className="flex items-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;