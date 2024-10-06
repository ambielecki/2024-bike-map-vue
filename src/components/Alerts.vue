<script setup>
  import { useAlertStore } from "../stores/alert";
  import { computed, onMounted } from "vue";

  onMounted(() => {
    setInterval(() => {
      if (useAlertStore().alerts.length > 0) {
        useAlertStore().decrementMessageTimes();
        useAlertStore().removeExpiredAlerts();
      }
    }, 1000);
  });

  const show_clear = computed(() => {
    return useAlertStore().alerts.length > 1;
  })
</script>

<template>
<div class="alert_container">
  <div v-if="show_clear" id="clear_button_container">
    <button @click="useAlertStore().removeAllAlerts()" id="clear_button" class="button is-dark has-text-white is-small">
      Clear All<span @click="useAlertStore().removeAllAlerts()" id="clear_all_x" class="delete"></span>
    </button>
  </div>
  <TransitionGroup>
    <div
        v-for="(alert, key) in useAlertStore().alerts"
        :key="'alert' + key"
        :class="alert.type"
        class="notification"
        data-test="notification"
    >
      <button class="delete" @click="useAlertStore().removeAlert(key)" data-test="notification-dismiss"></button>
      {{ alert.message }}
      <div v-if="alert.errors" class="content">
        <ul>
          <li v-for="error in alert.errors">{{ error[0] }}</li>
        </ul>
      </div>
    </div>
  </TransitionGroup>
</div>
</template>

<style scoped>
.alert_container {
  position: absolute;
  width: 50%;
  padding-right: 0.5rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 769px) {
    right: 0;
  }
  z-index: 10001;
  bottom: 0;
  .notification {
    margin-bottom: 0.5rem;
  }
}

#clear_button_container {
  display: flex;
  justify-content: flex-end;
}

#clear_button {
  margin-bottom: 0.5rem;
}

#clear_all_x {
  margin-left: 0.5rem;
}
</style>