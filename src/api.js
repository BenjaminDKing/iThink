import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL

export async function googleAuthCall() {
    window.open(
        `${BASE_URL}/auth/google/callback`,
        "_self"
    )
}

export async function getUser() {
    const url = `${BASE_URL}/auth/login/success`;
    const { data } = await axios.get(url, {withCredentials: true});
    return data;
}

export async function getThoughts() {
    const url = `${BASE_URL}/get_thoughts`;
    const { data } = await axios.get(url, {withCredentials: true});
    return data;
}

export async function getMoreThoughts(index) {
    const url = `${BASE_URL}/get_more_thoughts`;
    const config = { 
        withCredentials: true,
        params: {
            index: index
        }
     }
    const { data } = await axios.get(url, config);
    return data;
}

export async function deleteThought(id, user) {
    const url = `${BASE_URL}/delete_thought`;
    const response = await axios.delete(url, { data: { id: id, user: user } }, {withCredentials: true});
    return response;
}

export async function postThought(thought) {
    const url = `${BASE_URL}/create_thought`;
    const response = await axios.post(url, thought, {withCredentials: true});
    return response;
}

export async function getProfile(id) {
    const url = `${BASE_URL}/get_profile/${id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
}

export async function checkReqUserCall() {
    const url = `${BASE_URL}/check_requser`;
    const { data } = await axios.get(url, {withCredentials: true});
    return data;
}