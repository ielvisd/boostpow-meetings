<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

</script>

<template>
  <q-btn class="text-white mr-4" flat dense round :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
    aria-label="Menu" @click="$q.dark.toggle()
    " />
</template>
