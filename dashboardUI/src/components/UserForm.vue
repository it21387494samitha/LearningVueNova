<template>
  <div class="card form-card">
    <div class="form-header">
      <h2>⚡ Quick Controls</h2>
    </div>

    <div class="form-body">
      <div class="form-group">
        <label class="form-label">Select User</label>
        <select v-model="localSelected" class="form-select">
          <option value="">-- choose a user --</option>
          <option v-for="u in users" :key="u.id" :value="String(u.id)">
            {{ u.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Note</label>
        <input v-model="localNote" placeholder="Type a note…" class="form-input" />
      </div>

      <div v-if="localNote" class="preview-box">
        <span class="preview-label">Preview</span>
        <p class="preview-text">{{ localNote }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  props: {
    users: { type: Array, required: true },
    selectedUserId: { type: [String, Number], default: "" },
    note: { type: String, default: "" },
  },
  emits: ["update:selectedUserId", "update:note"],
  data() {
    return {
      localSelected: String(this.selectedUserId || ""),
      localNote: this.note,
    };
  },
  watch: {
    localSelected(val) {
      this.$emit("update:selectedUserId", val);
    },
    localNote(val) {
      this.$emit("update:note", val);
    },
    selectedUserId(val) {
      this.localSelected = String(val || "");
    },
    note(val) {
      this.localNote = val;
    },
  },
};
</script>

<style scoped>
.form-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.form-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
}
.form-header h2 {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text);
}
.form-body {
  padding: 20px 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.form-group {
  flex: 1;
  min-width: 200px;
}
.form-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}
.form-select, .form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  background: var(--color-surface);
  color: var(--color-text);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-select:focus, .form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.12);
}
.preview-box {
  width: 100%;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--color-primary);
}
.preview-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}
.preview-text {
  margin: 4px 0 0;
  font-weight: 500;
  color: var(--color-text);
}
</style>