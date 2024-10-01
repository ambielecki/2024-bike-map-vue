<script setup>
const props = defineProps(['input_label', 'input_name', 'input_placeholder', 'errors', 'type', 'modelValue', 'is_stacked']);
const emit = defineEmits(['update:modelValue', 'enter']);

function update() {
  emit('update:modelValue', event.target.value);
}
</script>

<template>
<div v-if="!is_stacked" class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label" :for="input_name">{{ input_label }}</label>
  </div>

  <div class="field-body">
    <div class="field">
      <div class="control">
        <input
          class="input"
          :name="input_name"
          :type="type ?? 'text'"
          :value="modelValue"
          :placeholder="input_placeholder"
          @input="update"
        >
      </div>
    </div>
  </div>
</div>
<div v-else class="field">
  <label class="label" :for="input_name">{{ input_label }}</label>
  <div class="control">
    <input
      class="input"
      :name="input_name"
      :type="type ?? 'text'"
      :value="modelValue"
      :placeholder="input_placeholder"
      @input="update"
      @keyup.enter="$emit('enter')"
    >
  </div>
</div>

<div v-if="errors && errors.length > 0" class="field is-grouped is-horizontal">
  <div v-if="!is_stacked" class="field-label is-normal">

  </div>
  <div class="field-body">
    <div class="control">
      <p class="help is-danger" v-for="error in errors">
        {{ error }}
      </p>
    </div>
  </div>
</div>

</template>