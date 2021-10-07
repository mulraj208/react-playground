import React from "react";
import './style.css';

function UserItem({user}) {
    const {first, last, title} = user.name;
    const fullName = `${title} ${first} ${last}`;

    return (
        <li className="py-2 px-4 text-left flex items-center border-b">
            <span className="full-name mr-3 text-base lg:text-lg">{fullName}</span>
            <img className="ml-auto h-12 w-12 border-radius-50-percent object-cover" src={user.picture.thumbnail} alt={fullName}/>
        </li>
    )
}

export default UserItem;
