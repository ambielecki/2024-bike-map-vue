<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, onUnmounted, ref } from "vue";

let map = {};
const routes = ref([]);
const polyLines = ref({});

onMounted(() => {
  map = L.map('map_test').setView([42.60204, -71.10673], 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  fetch('http://bike-map-api.bielecki.test/api/routes?filters[]=no_lat_lng')
      .then(response => response.json())
      .then(data => {
            routes.value = data?.routes
          }
      )
      .catch(error => console.log(error));
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

async function addToMap(route) {
  route.added = true;
  if (!Object.prototype.hasOwnProperty.call(route, 'lat_lng')) {
    route = await fetchFullMapData(route.id);
  }

  const polyLineToAdd = L.polyline(route.lat_lng, {color: 'red', opacity: 0.25});
  polyLines.value[route.id] = polyLineToAdd;
  polyLineToAdd.addTo(map);
}

function removeFromMap(route) {
  route.added = false;
  map.removeLayer(polyLines.value[route.id]);
}

async function fetchFullMapData(id) {
  const response = await fetch('http://bike-map-api.bielecki.test/api/routes/' + id);
  const data = await response.json();

  const routeWithData = data.route;
  routeWithData.added = true;
  routes.value = routes.value.map((route) => {
    if (route.id === routeWithData.id) {
      return routeWithData;
    }

    return route;
  });

  return routeWithData;
}

</script>

<template>
<div id="map_test"></div>
<div v-for="route in routes">
  Route Date: {{ route.date }}
  <button v-if="!route.added" @click="addToMap(route)">Add to Map</button>
  &nbsp<button v-if="route.added" @click="removeFromMap(route)">Remove from Map</button>
</div>
</template>

<style scoped>
#map_test {
  height: 40rem;
  width: 40rem
}
</style>