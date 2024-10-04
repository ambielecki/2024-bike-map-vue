<script setup>

import { computed, ref } from "vue";
import TextInput from "@/components/Inputs/TextInput.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import RouteProvider from "@/providers/RouteProvider.js";

const name = defineModel('name');
const file = ref(null);
const file_name = computed(() => {
  if (file.value) {
    return file.value.name;
  }

  return "No file selected..."
});

const errors = {
  name: [],
};

function handleFileChange($event) {
  const target = $event.target;
  if (target && target.files) {
    file.value = target.files[0];
  }
}

async function upload() {
  const route = await RouteProvider.postRoute(name.value, file.value);
  console.log(route);
}

</script>

<template>
<div class="columns is-centered">
  <div class="column is-half">
    <div class="columns is-multiline">
      <div class="column is-full">
        <p class="title is-4" data-test="login_header">Upload New Ride</p>
      </div>
      <div class="column is-full">
        <TextInput
          input_label="Name"
          input_name="name"
          v-model="name"
          input_placeholder="Ride Name"
          :errors="errors.name"
          is_stacked="true"
          @enter="upload"
        />
      </div>
      <div class="column is-full">
        <div class="file has-name is-fullwidth">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" @change="handleFileChange($event)">
            <span class="file-cta">
                <span class="file-icon">
                  <font-awesome-icon :icon="['fas', 'fa-upload']" />
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
            <span class="file-name">
                {{ file_name }}
              </span>
          </label>
        </div>
      </div>

      <div class="column is-full">
        <div class="field is-grouped is-horizontal">
          <div class="control">
            <button class="button is-primary has-text-white" :class="{ 'is-loading': is_loading }" @click="upload" data-test="login-button">Upload Ride</button>
          </div>
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
</style>