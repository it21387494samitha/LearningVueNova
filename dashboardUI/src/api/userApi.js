import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const client = axios.create({
    API_BASE_URL,
    timeout: 5000,
})



export async function fetchUsers() {
    try {
        const response = await client.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
