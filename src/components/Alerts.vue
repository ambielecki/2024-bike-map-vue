<script setup>
  import { useAlertStore } from "../stores/alert";
  import { onMounted } from "vue";

  onMounted(() => {
    setInterval(() => {
      if (useAlertStore().alerts.length > 0) {
        useAlertStore().decrementMessageTimes();
        useAlertStore().removeExpiredAlerts();
      }
    }, 1000);
  });
</script>

<template>
<div class="alert_container">
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
  padding-top: 4rem;
  width: 100%;
  z-index: 25;
  .notification {
    margin-bottom: 0.5rem;
  }
}
</style>