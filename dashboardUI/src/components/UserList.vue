<template>
  <div class="card list-card">
    <div class="list-header">
      <h2>👥 User Directory</h2>
      <span class="badge">{{ users.length }} users</span>
    </div>

    <div class="list-body">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="u in users"
              :key="u.id"
              :class="{ active: String(u.id) === String(selectedUserId) }"
            >
              <td class="name-cell">
                <span class="user-avatar">{{ u.name.charAt(0) }}</span>
                {{ u.name }}
              </td>
              <td class="email-cell">{{ u.email }}</td>
              <td>{{ u.company?.name || '—' }}</td>
              <td>{{ u.address?.city || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-if="!selectedUserId" class="hint">
        Select a user from the form above to highlight them.
      </p>
    </div>
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
.list-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
}
.list-header h2 { margin: 0; font-size: 1rem; }
.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  background: var(--color-primary);
  color: #fff;
}
.list-body { padding: 0; }
.table-wrap { overflow-x: auto; }
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
thead {
  background: #f8fafc;
}
th {
  text-align: left;
  padding: 12px 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}
td {
  padding: 12px 20px;
  border-bottom: 1px solid #f1f5f9;
  color: var(--color-text);
}
tr:last-child td { border-bottom: none; }
tr:hover { background: #f8fafc; }
tr.active {
  background: #eef2ff;
  box-shadow: inset 3px 0 0 var(--color-primary);
}
.name-cell {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}
.email-cell { color: var(--color-text-secondary); }
.hint {
  color: var(--color-text-secondary);
  padding: 12px 24px;
  font-size: 0.85rem;
}
</style>