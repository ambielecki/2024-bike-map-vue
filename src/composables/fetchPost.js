import { useAlertStore } from "@/stores/alert";
import { addHeaders } from "./addHeaders";
import apiProvider from "@/providers/ApiProvider.js";

export async function useFetchPost(url, body, with_auth = false) {
    let options = {
        method: "POST",
        body: JSON.stringify(body),
    };

    options = addHeaders(options, with_auth);

    try {
        const response = await fetch(url, options);

        return await apiProvider.processApiResponse(response);
    } catch (error) {
        useAlertStore().addAlert('Something went wrong, please try again. If you continue to see this message, please contact support.', useAlertStore().danger);

        return null;
    }
}
