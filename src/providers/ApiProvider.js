import { useAlertStore } from "@/stores/alert";

class ApiProvider {
    async processApiResponse(response) {
        if (!response) {
            return null;
        }

        if (response?.ok) {
            const json = await response.json();

            return json.data;
        } else {
            const json = await response.json();
            let message = 'Something went wrong, please try again. If you continue to see this message, please contact support.'

            if (json.message) {
                message = json.message;
            }

            if (response.status === 422) {
                const errors = json.data?.errors
                if (errors) {
                    useAlertStore().addValidationAlert(message, errors, useAlertStore().warning);
                    return null;
                }
            }

            useAlertStore().addAlert(message, useAlertStore().warning)

            return null;
        }
    }
}

export default new ApiProvider();