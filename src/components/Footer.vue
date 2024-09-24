<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
<footer class="has-background-black-ter has-text-white">
  <div class="content">
    <p><a href="https://andrewbielecki.com">&copy; {{ new Date().getFullYear() }} Andrew Bielecki</a></p>
    <p><a href="https://www.linkedin.com/in/andrew-bielecki-5835b5123/"><font-awesome-icon :icon="['fab', 'linkedin']" /> Connect on LinkedIn </a></p>
    <p><a href="https://github.com/ambielecki/2023-divelogrepeat/issues"><font-awesome-icon :icon="['fab', 'github']" /> Report Issues on GitHub</a></p>
  </div>
</footer>
</template>

<style scoped>
footer {
  padding: 1rem;
  margin-top: 5rem;
}

a {
  color: white;
  &:hover {
    color: lightgrey;
  }
}

.content p:not(:last-child) {
  margin-bottom: 0.25rem;
}

</style>