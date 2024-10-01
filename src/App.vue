<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue';
import {useAlertStore} from "@/stores/alert.js";
import { useUserStore } from "./stores/user";
import Footer from "@/components/Footer.vue";
import TopNav from "@/components/TopNav.vue";
import Alerts from "@/components/Alerts.vue";

setInterval(() => {
  console.log('lub-dub');
  if (useUserStore().is_logged_in) {
    if (useUserStore().getMillisecondsUntilExpiration() <= (30 * 60000)) {
      if (useUserStore().getMillisecondsUntilExpiration() <= 0) {
        useUserStore().reset();
        useAlertStore().addAlert(
          'Your session has expired, please log in again',
          useAlertStore().warning,
        );
      } else {
        console.log('refresh');
        // AuthProvider.refreshToken()
        //   .then((response) => {
        //     useUserStore().setToken(response.access_token, response.expires_in);
        //   });
      }
    }
  }
}, 60000);

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
