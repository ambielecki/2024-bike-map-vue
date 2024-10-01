import { useUserStore } from "@/stores/user";

export function addHeaders(options, with_auth = false) {
    if (with_auth) {
        options.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + useUserStore().access_token
        };
    } else {
        options.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
    }

    return options;
}