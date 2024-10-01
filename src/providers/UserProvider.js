import { useFetchGet } from "@/composables/fetchGet.js";
import { useUserStore } from "@/stores/user.js";

class UserProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async getUser() {
        const data = await useFetchGet(this.base_api + '/user', {}, true);

        if (data) {
            return data.user;
        }

        return false;
    }
}

export default new UserProvider();