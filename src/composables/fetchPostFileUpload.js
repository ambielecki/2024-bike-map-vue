import { useAlertStore } from "@/stores/alert";
import apiProvider from "@/providers/ApiProvider.js";
import { useUserStore } from "@/stores/user.js";

export async function useFetchPostUploadFile(url, body, with_auth = false) {
    let headers = {
        "Accept": "application/json"
    };
    if (with_auth) {
        headers = {
            "Accept": "application/json",
            "Authorization": "Bearer " + useUserStore().access_token
        }
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        })

        return await apiProvider.processApiResponse(response);
    } catch (error) {
        useAlertStore().addAlert('Something went wrong, please try again. If you continue to see this message, please contact support.', useAlertStore().danger);

        return null;
    }
}
