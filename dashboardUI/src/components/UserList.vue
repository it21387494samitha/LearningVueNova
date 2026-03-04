<template>
  <div class="card">
    <h2>User List</h2>

    <ul>
      <li
        v-for="u in users"
        :key="u.id"
        :class="{ active: String(u.id) === String(selectedUserId) }"
      >
        <div class="name">{{ u.name }}</div>
        <div class="email">{{ u.email }}</div>
      </li>
    </ul>

    <p v-if="!selectedUserId" class="hint">
      Select a user to highlight in the list.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    users: { type: Array, required: true },
    selectedUserId: { type: [String, Number], default: "" },
  },
};
</script>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 10px; padding: 14px; }
ul { list-style: none; padding: 0; margin: 0; }
li { padding: 10px; border-bottom: 1px solid #eee; }
li.active { background: #f3f6ff; }
.name { font-weight: 600; }
.email { color: #666; }
.hint { color: #666; margin-top: 10px; }
</style>