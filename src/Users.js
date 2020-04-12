import React, { useState } from "react";
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';

async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

function Users() {
    const [userId, setUserId] = useState(null);
    const { data: users, error, isLoading, reload, run } = useAsync({ deferFn: getUsers })

    if (isLoading) return <div>loading ...</div>
    if (error) return <div>error...</div>
    if (!users) return <button onClick={run}>데이터 가져오기</button>;

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={
                        () => setUserId(user.id)
                    }>
                        {user.id} {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={reload}>reload</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;
