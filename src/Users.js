import React, { useReducer, useEffect } from "react";
import axios from 'axios';
import useAsync, { reducer } from "./useAsync";

async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

function Users() {
    const [state, refetch] = useAsync(getUsers, [], true);

    const { loading, data: users, error } = state;

    if (loading) return <div>loading ...</div>
    if (error) return <div>error...</div>
    if (!users) return <button onClick={refetch}>데이터 가져오기</button>;

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.id} {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={refetch}>reload</button>
        </>
    );
}

export default Users;
