import React, { useState } from "react";
import axios from 'axios';
import useAsync, { reducer } from "./useAsync";
import User from './User';

async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

function Users() {
    const [state, refetch] = useAsync(getUsers, [], true);
    const [userId, setUserId] = useState(null);

    const { loading, data: users, error } = state;

    if (loading) return <div>loading ...</div>
    if (error) return <div>error...</div>
    if (!users) return <button onClick={refetch}>데이터 가져오기</button>;

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
            <button onClick={refetch}>reload</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;
