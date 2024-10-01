<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, onUnmounted, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ColorPicker from '@mcistudio/vue-colorpicker'
import '@mcistudio/vue-colorpicker/dist/style.css'
import RouteProvider from "@/providers/RouteProvider.js";

let map = {};
const routes = ref([]);
const polyLines = ref({});

onMounted(() => {
  map = L.map('map').setView([42.60204, -71.10673], 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  RouteProvider.getRoutes({
    'filters[condensed]': 1
  })
    .then(routesData => {
      if (routesData) {
        routes.value = routesData;
        routes.value.map(route => {
          route.color = {
            color: {r:255, g:0, b:0, a:1}
          }
          return route;
        });
      }
    });
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

  const polyLineToAdd = L.polyline(route.lat_lng, {color: route.color.hex, opacity: 0.25})
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

async function fetchFullMapData(id) {
  const routeWithData = await RouteProvider.getRoute(id);

  if (routeWithData) {
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

function handleColorChange(value) {

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
            <button class="button is-primary has-text-white" v-if="!route.added" @click="addToMap(route)">
              <font-awesome-icon :icon="['fas', 'plus']"/>
            </button>
            <button class="button has-background-danger-50 has-text-white" v-else @click="removeFromMap(route)">
              <font-awesome-icon :icon="['fas', 'minus']"/>
            </button>
          </p>
          <p class="control">
            <ColorPicker @colorChanged="handleColorChange" v-model="route.color"></ColorPicker>
          </p>
          <p class="text-p">{{ route.name }} {{ route.date }}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="columns">
  <div class="column is-full">
    <div class="field is-grouped">
      <p class="control">
        <button class="button is-primary has-text-white" @click="addAllRoutesToMap">Add All</button>
      </p>
      <p class="control">
        <button class="button has-background-danger-50 has-text-white" @click="removeAllRoutesFromMap">Remove All</button>
      </p>
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
</style>