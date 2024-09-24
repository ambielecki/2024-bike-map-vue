<template>
<b-navbar>
  <template #brand>
    <b-navbar-item tag="router-link" :to="{ path: '/' }">
      BikeMap
    </b-navbar-item>
  </template>
  <template #start>
    <b-navbar-item tag="router-link" :to="{ name: 'map' }">
      Map
    </b-navbar-item>
    <b-navbar-item tag="router-link" :to="{ name: 'map_create' }">
      Upload
    </b-navbar-item>
  </template>

  <template #end>
<!--    <b-navbar-item tag="div">-->
<!--      <div class="buttons">-->
<!--        <a class="button is-primary">-->
<!--          <strong>Sign up</strong>-->
<!--        </a>-->
<!--        <a class="button is-light">-->
<!--          Log in-->
<!--        </a>-->
<!--      </div>-->
<!--    </b-navbar-item>-->
  </template>
</b-navbar>
</template>
<script setup lang="ts">
</script>