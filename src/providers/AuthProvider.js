import { useFetchPost } from "@/composables/fetchPost.js";

class AuthProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async getToken(body) {
        const data = await useFetchPost(this.base_api + '/login', body);

        if (data) {
           return data;
        }

        return false;
    }

    async logOut() {
        useFetchPost(this.base_api + '/logout',{}, true)
    }
}

export default new AuthProvider();