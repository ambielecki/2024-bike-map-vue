<script setup>
import { useUserStore } from "@/stores/user";
import { useAlertStore } from "@/stores/alert";
import { ref, computed } from 'vue';
import validationProvider from "../../providers/ValidationProvider";
import router from "../../router";
import TextInput from "@/components/Inputs/TextInput.vue";
import { useHasErrors } from "@/composables/hasErrors.js";

const userStore = useUserStore();
const password = ref('');
const email = ref('');
const errors = ref({
  email: [],
  password: [],
});

const has_errors = computed(() => {
  return useHasErrors(errors);
});

const hide_login = ref(userStore.is_logged_in);
const is_loading = ref(false);

function validateForm() {
  errors.value = {
    email: [],
    password: [],
  }

  if (!email.value) {
    errors.value.email.push('Email is required.');
  }

  if (!validationProvider.validateEmail(email.value)) {
    errors.value.email.push('Must be a valid email.');
  }

  if (!password.value) {
    errors.value.password.push('Password is required.');
  }
}

async function login() {
  validateForm();

  if (has_errors.value) {
    return;
  }

  const success = await useUserStore().logIn(email.value, password.value);

  if (success) {
    useAlertStore().addAlert('Successfully logged in, welcome back.', useAlertStore().success);
    router.push({ name: 'home' });
  }
}

</script>

<template>
<div v-if="hide_login">
  You are already logged in
</div>
<div v-else class="columns is-centered">
  <div class="column is-half">
    <div class="columns is-multiline">
      <div class="column is-full">
        <p class="title is-4" data-test="login_header">Login</p>
      </div>
      <div class="column is-full">
        <TextInput
          input_label="Email"
          input_name="email"
          v-model="email"
          input_placeholder="Email Address"
          :errors="errors.email"
          is_stacked="true"
          @enter="login"
        />
      </div>
      <div class="column is-full">
        <TextInput
          input_label="Password"
          input_name="password"
          v-model="password"
          input_placeholder="Password"
          :errors="errors.password"
          type="password"
          is_stacked="true"
          @enter="login"
        />
      </div>
      <div class="column is-full">
        <div class="field is-grouped is-horizontal">
          <div class="control">
            <button class="button is-primary has-text-white" :class="{ 'is-loading': is_loading }" @click="login" data-test="login-button">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>