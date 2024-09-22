<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, onUnmounted } from "vue";

let map = {};
let positions = {};

onMounted(() => {
  map = L.map('map_test').setView([42.60204, -71.10673], 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  fetch('http://bike-map-api.bielecki.test/api/test')
      .then(response => response.json())
      .then(data => {
            positions = data?.positions;
            let points = [];
            for (const timestamp in positions) {
              points.push([positions[timestamp].lat, positions[timestamp].lng]);
            }

            const polyline = L.polyline(points, {color: 'red'}).addTo(map);
            map.fitBounds(polyline.getBounds());
          }
      )
      .catch(error => console.log(error));
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

</script>

<template>
<div id="map_test"></div>
</template>

<style scoped>
#map_test {
  height: 40rem;
  width: 40rem
}
</style>