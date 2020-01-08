import axios from 'axios';

export default axios.create({
    baseURL: "https://coders-camp-2019-team-alpha.herokuapp.com",
    headers: {
        "Content-Type": 'application/json'
    }
});