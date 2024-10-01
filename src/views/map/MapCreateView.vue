<script setup>

import { ref } from "vue";

const name = defineModel('name');
const file = ref(null);

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
</template>