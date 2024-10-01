<script setup>

import { onMounted, onUnmounted, ref } from "vue";
import L from "leaflet";

const name = defineModel('name');
const file = ref(null);

let map = {};
const polyLines = ref({});

onMounted(() => {
  map = L.map('map').setView([42.60204, -71.10673], 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

function handleFileChange($event) {
  const target = $event.target;
  if (target && target.files) {
    file.value = target.files[0];
  }
}

function upload() {
  let data = new FormData();
  console.log(name.value);
  data.append('name', name.value);
  data.append('file', file.value);

  fetch('http://bike-map-api.bielecki.test/api/routes', {
    method: 'POST',
    headers: {
      "Accept": "application/json",
    },
    body: data,
  })
    .then(response => response.json())
    .then(data => console.log(data));
}

</script>

<template>
<div class="columns">
  <div class="column is-full is-8-tablet">
    <div id="map"></div>
  </div>
  <div class="column is-full is-4-tablet">
    <div>
      <label>Name
        <input v-model="name" name="name" id="name" type="text">
      </label>
    </div>
    <div>
      <label>File<input @change="handleFileChange($event)" name="file" id="file" type="file"></label>
    </div>
    <div>
      <button @click="upload">Do it</button>
    </div>
  </div>
</div>
</template>

<style scoped>
#map {
  height: 40rem;
  width: 100%;
  max-width: 40rem
}
</style>