import React, {useState} from "react";
import axios from "axios";
import useInView from 'react-cool-inview';
import {API_URL} from "../constants/global";
import UserItem from "./UserItem/index";
import SkeletonLoader from "./SkeletonLoader/index";

const NO_OF_USERS = 10;
let page = 0;

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    function callUserApi({observe, unobserve}) {
        unobserve();
        page += 1;
        setLoading(true);

        axios.get(`${API_URL}?page=${page}&results=${NO_OF_USERS}`)
            .then(function ({data}) {
                setUsers([...users, ...data.results]);
                setLoading(false);
                observe();
                setErrorMsg('');
            })
            .catch(function () {
                setErrorMsg('Oops! Something went wrong. Please try again');
                page -= 1;
            });
    }

    const {observe, unobserve} = useInView({
        onEnter: ({observe, unobserve}) => {
            callUserApi({observe, unobserve});
        }
    });

    return (
        <>
            <ul className="mx-4">
                {users.map((user, index) => (
                    <UserItem key={`user_${user.id.value}_${index}`} user={user}/>
                ))}
            </ul>
            <div ref={observe} id="observerElement"/>
            {loading ? (<div className="mx-4">
                <SkeletonLoader/>
            </div>) : ''}

            {errorMsg ? <span className="text-red-500 mt-4">{errorMsg}</span> : ''}
            {errorMsg ?
                (<button
                    className="flex my-5 bg-green-500 hover:bg-green-700 my-5 mx-auto text-white font-bold cursor-pointer py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => callUserApi({observe, unobserve})}
                >
                    Retry
                </button>) : ''}
        </>
    )
}

export default UserList;
