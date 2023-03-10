<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { inject } from 'vue';

export default defineComponent({
  name: 'App',
  data () {
    return {
    };
  },
  setup () {
    const plausible = inject('plausible');
    return {
      plausible,
    };
  },
})
</script>
