import axios from 'axios';

const base = axios.create({
    baseURL: "https://coders-camp-2019-team-alpha.herokuapp.com",
    //baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": 'application/json'
    }
});

export const reserve = async (body) => {
    return base.post('/reservation', JSON.stringify(body), {
        headers: {
            "x-auth-token": localStorage.getItem('x-auth-token')
        }
    });
}

export const login = async (body) => {
    return base.post('/login', JSON.stringify(body));
}

export const register = async (body) => {
    return base.post('/register', JSON.stringify(body));
}

export const account = async () => {
    return base.get(`/account/${localStorage.getItem('username')}`, {
        headers: {
            "x-auth-token": localStorage.getItem('x-auth-token')
        }
    });
}

export const roomsdates = async (week) => {
    return base.get(`/roomsdates/${week}`);
}