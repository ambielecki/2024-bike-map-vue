import { useFetchGet } from "@/composables/fetchGet.js";
import { useFetchPostUploadFile } from "@/composables/fetchPostFileUpload.js";

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

    async postRoute(name, file) {
        let body = new FormData();
        body.append('name', name);
        body.append('file', file);

        const data = await useFetchPostUploadFile(this.base_api + '/routes', body, true);

        if (data) {
            return data.route;
        }

        return false;
    }
}

export default new RouteProvider();