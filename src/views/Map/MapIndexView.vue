<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, onUnmounted, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

let map = {};
const routes = ref([]);
const polyLines = ref({});

onMounted(() => {
  map = L.map('map').setView([42.60204, -71.10673], 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  fetch('http://bike-map-api.bielecki.test/api/routes?filters[condensed]=1')
      .then(response => response.json())
      .then(data => {
            routes.value = data?.routes
            routes.value.map(route => {
              route.color = "#e6163c"
              return route;
            })
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

  const polyLineToAdd = L.polyline(route.lat_lng, {color: route.color, opacity: 0.25})
      .bindTooltip(route.date + ' ' + route.name);
  polyLines.value[route.id] = polyLineToAdd;
  polyLineToAdd.addTo(map);
}

function addAllRoutesToMap() {
  routes.value.forEach((route) => {
    if (!route.added) {
      addToMap(route);
    }
  })
}

function removeFromMap(route) {
  route.added = false;
  map.removeLayer(polyLines.value[route.id]);
}

function removeAllRoutesFromMap() {
  routes.value.forEach((route) => {
    if (route.added) {
      removeFromMap(route);
    }
  })
}

async function fetchFullMapData(id) {
  const response = await fetch('http://bike-map-api.bielecki.test/api/routes/' + id);
  const data = await response.json();

  const routeWithData = data.route;
  routeWithData.added = true;
  routes.value = routes.value.map((route) => {
    if (route.id === routeWithData.id) {
      routeWithData.color = route.color;
      return routeWithData;
    }

    return route;
  });

  return routeWithData;
}

</script>

<template>
<div class="columns">
  <div class="column is-full is-8-tablet">
    <div id="map"></div>
  </div>

  <div class="column is-full is-4-tablet">
    <div class="columns is-multiline is-flex route-container">
      <div v-for="route in routes" class="column is-full is-flex is-vcentered">
        <div class="field is-grouped">
          <p class="control">
            <b-button type="is-success" v-if="!route.added" @click="addToMap(route)"><font-awesome-icon :icon="['fas', 'plus']" /></b-button>
            <b-button type="is-danger" v-else @click="removeFromMap(route)"><font-awesome-icon :icon="['fas', 'minus']" /></b-button>
          </p>
          <p class="control">
            <b-colorpicker v-model="route.color" />
          </p>
          <p class="text-p">{{ route.name }} {{ route.date }}</p>
        </div>
      </div>

      <div class="column is-full">
        <div class="field is-grouped">
          <p class="control">
            <b-button type="is-success" @click="addAllRoutesToMap">Add All</b-button>
          </p>
          <p class="control">
            <b-button type="is-danger" @click="removeAllRoutesFromMap">Remove All</b-button>
          </p>
        </div>
      </div>
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

.route-container {
  align-content: center;
}

.text-p {
  padding-top: 0.4rem;
}
</style>