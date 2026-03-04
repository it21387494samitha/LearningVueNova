<template>
  <div class="page">
    <h1>Dashboard UI (Vue Task)</h1>

    <!-- interpolation -->
    <p>Selected User: <b>{{ selectedUserName || "None" }}</b></p>

    <!-- v-bind -->
    <button :disabled="loading" @click="loadUsers">
      {{ loading ? "Loading..." : "Reload Users" }}
    </button>

    <button @click="note = 'Hello from Vue!'">Set Note</button>
    <!-- v-if -->
    <p v-if="error" class="error">Error: {{ error }}</p>

    <!-- v-show -->
    <p v-show="loading" class="hint">Fetching users…</p>

    <UserForm
      :users="users"
      v-model:selectedUserId="selectedUserId"
      v-model:note="note"
    />

    <div v-if="users.length" class="grid">


      <UserList :users="users" :selectedUserId="selectedUserId" />
      <UserChart :users="users" />
       <UserByCompanyChart :users="users" />
        <UsersByCompanyChart :users="users" />
        <NewTestChart :users="users"/>
    </div>


    <p v-else class="hint">No users loaded yet.</p>

    <p class="note">Your Note: <b>{{ note }}</b></p>
  </div>
</template>

<script>
import { fetchUsers } from "./api/userApi.js";
import UserForm from "./components/UserForm.vue";
import UserList from "./components/UserList.vue";
import UserChart from "./components/UserChart.vue";
import UserByCompanyChart from "./components/UsersByCompanyChart.vue";
import UsersByCompanyChart from "./components/CompanyUser.vue";
import NewTestChart from "./components/NewTest.vue";

export default {
  components: { UserForm, UserList, UserChart, UserByCompanyChart, UsersByCompanyChart, NewTestChart },
  data() {
    return {
      users: [],
      loading: false,
      error: "",
      selectedUserId: "",
      note: "",
    };
  },
  computed: {
    selectedUserName() {
      const u = this.users.find((x) => String(x.id) === String(this.selectedUserId));
      return u ? u.name : "";
    },
  },
  async mounted() {
  
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.loading = true;
      this.error = "";
      try {
       
        this.users = await fetchUsers();
      } catch (e) {
        this.error = e?.message || "Failed to fetch users";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.page { max-width: 980px; margin: 30px auto; padding: 0 16px; font-family: system-ui; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
.error { color: #b00020; }
.hint { color: #666; }
.note { margin-top: 18px; }
button { padding: 8px 12px; margin: 10px 0; }
@media (max-width: 820px) { .grid { grid-template-columns: 1fr; } }
</style>