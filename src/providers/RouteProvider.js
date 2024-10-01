import { useFetchGet } from "@/composables/fetchGet.js";
import { useFetchPost } from "@/composables/fetchPost.js";

class RouteProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async getRoutes(params = {}) {
        const data = await useFetchGet(this.base_api + '/routes', params);

        if (data) {
            return data.routes;
        }

        return false;
    }

    async getRoute(id) {
        const data = await useFetchGet(this.base_api + '/routes/' + id);

        if (data) {
            return data.route;
        }

        return false;
    }
}

export default new RouteProvider();