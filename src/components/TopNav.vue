<script setup lang="ts">
import { onMounted } from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

onMounted(() => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
});
</script>

<template>
<nav id="main_nav" class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand is-size-4">
    <router-link :to="{ name: 'home' }" class="navbar-item" data-test="navbar-home"><font-awesome-icon :icon="['fas', 'person-biking']"/> BikeTour</router-link>

    <a role="button" id="navbar_burger" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbar" class="navbar-menu">
    <div class="navbar-start">
      <router-link :to="{ name: 'map' }" class="navbar-item" data-test="map">Upload</router-link>
      <router-link :to="{ name: 'map_create' }" class="navbar-item" data-test="map_create">Map</router-link>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
<!--        <div v-if="!userStore.is_logged_in" class="field is-grouped">-->
<!--          <p class="control">-->
<!--            <router-link :to="{ name: 'register' }" data-test="sign_up">-->
<!--              <button class="button is-info is-light">-->
<!--                <strong>Sign Up</strong>-->
<!--              </button>-->
<!--            </router-link>-->
<!--          </p>-->
<!--          <p class="control">-->
<!--            <router-link :to="{ name: 'login' }" data-test="log_in">-->
<!--              <button class="button is-info is-light">-->
<!--                <strong>Log In</strong>-->
<!--              </button>-->
<!--            </router-link>-->
<!--          </p>-->
<!--        </div>-->
<!---->
<!--        <div v-else class="buttons">-->
<!--          <button @click="logOut" class="button is-info is-light" :class="{ 'is-loading': is_loading }" data-test="log_out">-->
<!--            <strong>Log Out</strong>-->
<!--          </button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
.toggle_span {
  margin-top: .5rem;

  > svg {
    height: 1.5rem;
  }
}

.notification:hover {
  box-shadow: 0 0.75em 1.5em -0.250em #3e8ed0, 0 0 0 1px #0a0a0a05;
}
</style>
