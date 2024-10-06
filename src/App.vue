<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue';
import {useAlertStore} from "@/stores/alert.js";
import { useUserStore } from "./stores/user";
import Footer from "@/components/Footer.vue";
import TopNav from "@/components/TopNav.vue";
import Alerts from "@/components/Alerts.vue";

setInterval(() => {
  if (useUserStore().is_logged_in) {
    if (useUserStore().getMillisecondsUntilExpiration() <= (30 * 60000)) {
      if (useUserStore().getMillisecondsUntilExpiration() <= 0) {
        useUserStore().reset();
        useAlertStore().addAlert(
          'Your session has expired, please log in again',
          {},
          useAlertStore().warning,
        );
      } else {
        useUserStore().refreshToken();
      }
    }
  }
}, 60000);

onMounted(() => {
  useUserStore().checkCachedToken();
})

const route = useRoute();

const is_home_page = computed(() => {
  return route.path === '/';
});

const container_class = computed(() => {
  return !is_home_page.value ? 'container app_container' : '';
});

</script>

<template>
<div class="main_container">
  <TopNav/>
  <Alerts/>
  <div :class="container_class" id="router_div">
    <RouterView/>
  </div>

</div>
<Footer/>
</template>

<style>
.main_container {
  min-height: calc(100vh - 3.5rem);
}

#router_div {
  padding-top: 5rem;
}
</style>
