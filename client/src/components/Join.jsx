import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Join = () => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');

    return (
        <div>
            <h1>Join the room</h1>
            <input type="text" placeholder={"name"} value={name} onChange={(event) => setName(event.target.value)}/>
            <input type="text" placeholder={"room"} value={room} onChange={(event) => setRoom(event.target.value)}/>
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null}
                  to={`/chat?name=${name}&room=${room}`}>
                Sign in
            </Link>
        </div>
    );
};

export default Join;
