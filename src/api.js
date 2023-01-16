import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL
const CLOUDNAME = process.env.REACT_APP_CLOUD_NAME

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

export async function getThoughts(id) {
    const url = `${BASE_URL}/get_thoughts`;
    const config = {
        withCredentials: true,
        params: {
            id: id
        }
    }
    const { data } = await axios.get(url, config);
    return data;
}

export async function getMoreThoughts(id, index) {
    const url = `${BASE_URL}/get_more_thoughts`;
    const config = { 
        withCredentials: true,
        params: {
            id: id,
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

export async function uploadImage(formData) {
    
    const imgData = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`, {
      method:"POST",
      body: formData
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        // Later, we should check that our response IS a valid response from Cloudinary (signature?)
        { data.public_id ? putImage(data) : console.log("Invalid.") }
        return data
    }).catch((err) => {
        console.log(err)
    })
    return imgData
}

export async function putImage(img) { 
    const url = `${BASE_URL}/upload_profile_image`;
    await axios.put(url, img, { withCredentials: true })
    .then((data) => {
        return data
    }).catch( err => {
        console.log(err);
    } )
}

export async function getImage(id) {
    const url = `${BASE_URL}/get_profile_image/${id}`
    const { data } = await axios.get(url, { withCredentials: true })
    return data
}

export async function getBuddies() {
    const url = `${BASE_URL}/get_buddies`
    const { data } = await axios.get(url, { withCredentials: true })
    return data.buddies
}

export async function checkReqUserCall() {
    const url = `${BASE_URL}/check_requser`;
    const { data } = await axios.get(url, {withCredentials: true});
    return data;
}