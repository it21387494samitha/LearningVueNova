<template>
  <div class="page">
    <h1 class="dashboard">Dashboard UI (Vue Task)</h1>
<p class="note"> <b>{{ note }}</b></p>
    <!-- ------------------------------------- this is for the Interpolation --------------------------------------------------------------- -->
    <!-- interpolation -->
    <p>Selected User: <b>{{ selectedUserName || "None" }}</b></p>


    <!-- ------------------------------------- this is for the V-bind --------------------------------------------------------------- -->
    <!-- v-bind -->
    <button :disabled="loading" @click="loadUsers">
      {{ loading ? "Loading..." : "Reload Users" }}
    </button>

    <button @click="note = '🚫⚠️Warning...You are in danger ⚠️☠️🚫 '">Set Note</button>

    <!-- -------------------------------------this is for the V-if --------------------------------------------------------------- -->
    
    <!-- v-if -->
    <p v-if="error" class="error">Error: {{ error }}</p>



    <!-- ------------------------------------- this is for the V-show --------------------------------------------------------------- -->
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
        <PieChart :users="users"  />
    </div>


    <p v-else class="hint">No users loaded yet.</p>

    
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
import PieChart from "./components/pieChart.vue";

export default {
  components: { UserForm, UserList, UserChart, UserByCompanyChart, UsersByCompanyChart, NewTestChart, PieChart },
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

.note b {
  display: inline-block;
  color: #b00020;
  font-size: 1.1rem;
  animation: pulseWarning 0.6s ease-in-out infinite alternate, shakeWarning 0.4s ease-in-out infinite;
  text-shadow: 0 0 8px rgba(176, 0, 32, 0.6), 0 0 16px rgba(255, 0, 0, 0.3);
  background: linear-gradient(90deg, #b00020, #ff4444, #ff0000, #b00020);
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulseWarning 0.6s ease-in-out infinite alternate, shakeWarning 0.5s ease-in-out infinite, dangerShimmer 1.5s linear infinite;
}

@keyframes pulseWarning {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.08);
    opacity: 0.7;
  }
}

@keyframes shakeWarning {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px) rotate(-1deg); }
  50% { transform: translateX(3px) rotate(1deg); }
  75% { transform: translateX(-2px) rotate(-0.5deg); }
}

@keyframes dangerShimmer {
  0% { background-position: -300% center; }
  100% { background-position: 300% center; }
}
.dashboard 
 {
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  color: #1a1a2e;
  letter-spacing: 1px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid #4361ee;
  text-transform: uppercase;
  animation: fadeSlideDown 0.8s ease-out both;
  background: linear-gradient(90deg, #1a1a2e, #4361ee, #1a1a2e);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeSlideDown 0.8s ease-out both, shimmer 3s linear infinite;
}

@keyframes fadeSlideDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
    letter-spacing: 8px;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: 1px;
  }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
button { padding: 8px 12px; margin: 10px 0; }

@media (max-width: 820px) { .grid { grid-template-columns: 1fr; } }
</style>