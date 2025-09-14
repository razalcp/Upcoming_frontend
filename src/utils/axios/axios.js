import axios from 'axios'

const organizerApi = axios.create({
    baseURL: "https://upcoming-backend.onrender.com/organizer",
    withCredentials: true
})
export { organizerApi }
