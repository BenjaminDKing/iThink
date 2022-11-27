import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL

// API calls: googleAuth, login, logout, get/post thought(s), check_requser (for debugging)

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

export async function deleteThought(id, user) {
    const url = `${BASE_URL}/delete_thought`;
    await axios.delete(url, { data: { id: id, user: user } }, {withCredentials: true});
}

export async function postThought(thought) {
    const url = `${BASE_URL}/create_thought`;
    await axios.post(url, thought, {withCredentials: true})
}

export async function checkReqUserCall() {
    const url = `${BASE_URL}/check_requser`;
    const { data } = await axios.get(url, {withCredentials: true});
    return data;
}