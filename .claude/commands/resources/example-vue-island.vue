<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  basePrice: number;
  includedUsers: number;
}>();

const users = ref(props.includedUsers);

const total = computed(() => {
  const extraUsers = Math.max(0, users.value - props.includedUsers);
  return props.basePrice + extraUsers * 12;
});
</script>

<template>
  <div>
    <label for="users">Users</label>
    <input id="users" v-model.number="users" type="number" min="1" />
    <p>Total monthly price: {{ total }}</p>
  </div>
</template>
