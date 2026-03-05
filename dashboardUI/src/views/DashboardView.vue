<template>
  <div class="dashboard-view">
    <!-- Reload + selected user -->
    <div class="toolbar">
      <button
        class="btn-primary reload-btn"
        :disabled="loading"
        @click="loadUsers"
      >
        <span v-if="loading" class="spinner"></span>
        {{ loading ? "Loading…" : "↻ Reload Data" }}
      </button>

      <div class="selected-badge" v-if="selectedUserName">
        👤 {{ selectedUserName }}
      </div>
    </div>

    <!-- Alert banners -->
    <div v-if="error" class="alert alert-error">
      <span class="alert-icon">⚠️</span>
      <span>{{ error }}</span>
      <button class="alert-close" @click="error = ''">✕</button>
    </div>

    <div v-if="note" class="alert alert-warning">
      <span class="alert-icon">📝</span>
      <span>{{ note }}</span>
      <button class="alert-close" @click="note = ''">✕</button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading && !users.length" class="loading-state">
      <div class="spinner-lg"></div>
      <p>Fetching user data…</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!users.length" class="empty-state">
      <div class="empty-icon">📭</div>
      <h3>No Users Loaded</h3>
      <p>Click "Reload Data" to fetch users from the API.</p>
    </div>

    <template v-else>
      <!-- ===== Stats Row ===== -->
      <section class="stats-row">
        <div class="stat-card stat-blue">
          <div class="stat-icon">👥</div>
          <div class="stat-body">
            <span class="stat-value">{{ users.length }}</span>
            <span class="stat-label">Total Users</span>
          </div>
        </div>
        <div class="stat-card stat-purple">
          <div class="stat-icon">🏢</div>
          <div class="stat-body">
            <span class="stat-value">{{ companyCount }}</span>
            <span class="stat-label">Companies</span>
          </div>
        </div>
        <div class="stat-card stat-green">
          <div class="stat-icon">🌐</div>
          <div class="stat-body">
            <span class="stat-value">{{ cityCount }}</span>
            <span class="stat-label">Cities</span>
          </div>
        </div>
        <div class="stat-card stat-orange">
          <div class="stat-icon">📧</div>
          <div class="stat-body">
            <span class="stat-value">{{ users.length }}</span>
            <span class="stat-label">Emails</span>
          </div>
        </div>
      </section>

      <!-- ===== Form Section ===== -->
      <section class="section-form">
        <UserForm
          :users="users"
          v-model:selectedUserId="selectedUserId"
          v-model:note="note"
        />
      </section>

      <!-- ===== Charts Grid ===== -->
      <section class="charts-grid">
        <div class="chart-item span-full">
          <UserList :users="users" :selectedUserId="selectedUserId" />
        </div>
        <div class="chart-item">
          <UserChart :users="users" />
        </div>
        <div class="chart-item">
          <UserByCompanyChart :users="users" />
        </div>
        <div class="chart-item">
          <UsersByCompanyChart :users="users" />
        </div>
        <div class="chart-item">
          <NewTestChart :users="users" />
        </div>
        <div class="chart-item span-full">
          <PieChart :users="users" />
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { fetchUsers } from "../api/userApi.js";
import UserForm from "../components/UserForm.vue";
import UserList from "../components/UserList.vue";
import UserChart from "../components/UserChart.vue";
import UserByCompanyChart from "../components/UsersByCompanyChart.vue";
import UsersByCompanyChart from "../components/CompanyUser.vue";
import NewTestChart from "../components/NewTest.vue";
import PieChart from "../components/pieChart.vue";

export default {
  name: "DashboardView",
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
    companyCount() {
      const set = new Set(this.users.map((u) => u.company?.name));
      return set.size;
    },
    cityCount() {
      const set = new Set(this.users.map((u) => u.address?.city));
      return set.size;
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
/* ========== TOOLBAR ========== */
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.reload-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
.selected-badge {
  padding: 6px 14px;
  background: #eef2ff;
  color: var(--color-primary);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
}

/* ========== SPINNER ========== */
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
}
.spinner-lg {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto 16px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ========== ALERTS ========== */
.alert {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  animation: slideDown 0.3s ease;
}
.alert-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
.alert-warning {
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
}
.alert-icon { font-size: 1.1rem; }
.alert-close {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  color: inherit;
  opacity: 0.6;
}
.alert-close:hover { opacity: 1; background: rgba(0,0,0,0.05); }

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ========== LOADING / EMPTY ========== */
.loading-state, .empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--color-text-secondary);
}
.empty-icon { font-size: 3rem; margin-bottom: 12px; }

/* ========== STATS ROW ========== */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px 24px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: transform var(--transition), box-shadow var(--transition);
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}
.stat-blue  .stat-icon { background: #eef2ff; }
.stat-purple .stat-icon { background: #f3e8ff; }
.stat-green  .stat-icon { background: #ecfdf5; }
.stat-orange .stat-icon { background: #fff7ed; }
.stat-body { display: flex; flex-direction: column; }
.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
}
.stat-label {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ========== FORM SECTION ========== */
.section-form {
  margin-bottom: 28px;
}

/* ========== CHARTS GRID ========== */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.chart-item.span-full {
  grid-column: 1 / -1;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 1200px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .charts-grid { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .stats-row { grid-template-columns: 1fr; }
}
</style>
