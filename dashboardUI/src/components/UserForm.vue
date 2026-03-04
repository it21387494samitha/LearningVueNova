<template>
  <div class="card">
    <h2>Form</h2>

    <label>
      Select user:
      <select v-model="localSelected">
        <option value="">-- choose --</option>
        <option v-for="u in users" :key="u.id" :value="String(u.id)">
          {{ u.name }}
        </option>
      </select>
    </label>

    <label>
      Note:
      <input v-model="localNote" placeholder="Type a note..." />
    </label>

    <p class="preview">Preview: <b>{{ localNote }}</b></p>
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
.card { border: 1px solid #ddd; border-radius: 10px; padding: 14px; }
label { display: block; margin: 10px 0; }
input, select { width: 100%; padding: 8px; margin-top: 6px; }
.preview { margin-top: 8px; color: #444; }
</style>