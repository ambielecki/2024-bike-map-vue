import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertStore = defineStore('alert', () => {
    const alerts = ref([]);
    const success = 'is-success';
    const warning = 'is-warning';
    const danger = 'is-danger';

    function removeAlert(key) {
        alerts.value.splice(key, 1);
    }

    function removeAllAlerts() {
        alerts.value = [];
    }

    function addAlert(message = '', type = success, time = 5) {
        alerts.value.push({
            type: type,
            message: message,
            time: time,
        });
    }

    function addValidationAlert(message = 'Validation Failed', errors = {}, type = success, time = 5) {
        alerts.value.push({
            type: type,
            message: message,
            time: time,
            errors: errors,
        });
    }

    return { alerts, removeAlert, removeAllAlerts, addAlert, addValidationAlert, success, warning, danger };
});