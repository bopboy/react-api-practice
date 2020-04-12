import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

async function getUser({ id }) {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}

export default function User({ id }) {
    const { data: user, error, isLoading } = useAsync({ promiseFn: getUser, id, watch: id });

    if (isLoading) return <div>loading ...</div>
    if (error) return <div>error...</div>
    if (!user) return null;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                email: {user.email}
                phone: {user.phone}
            </p>
        </div>
    );
}
