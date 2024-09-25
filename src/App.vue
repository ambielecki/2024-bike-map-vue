<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue';
import Footer from "@/components/Footer.vue";
import TopNav from "@/components/TopNav.vue";

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
