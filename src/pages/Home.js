import React from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";
import UserList from "../components/UserList";

function Home() {
    const auth = useAuth();
    const history = useHistory();

    const handleLogOut = () => {
        auth.signOut(() => history.push("/login"));
    };

    return (
        <>
            <div className="w-full flex items-start sticky top-0">
                <div className="header-bar p-2 w-full bg-black flex items-center bg-indigo-600">
                    <svg className="h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M2 5.5h16v2H2zM2 9.5h16v2H2zM2 13.5h16v2H2z"></path>
                    </svg>
                    {auth.user ? (
                        <button
                            className="bg-green-500 hover:bg-green-700 ml-auto text-white font-bold cursor-pointer py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button>
                    ) : ''}
                </div>
            </div>
            <div className="user-list-container my-4">
                <UserList/>
            </div>
        </>
    )
}

export default Home;
