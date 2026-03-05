<template>
  <div class="card chart-card">
    <div class="chart-header">
      <h2>📊 Name Length Chart</h2>
    </div>
    <div class="chart-body">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  props: {
    users: { type: Array, required: true },
  },
  data() {
    return { chart: null };
  },
  mounted() {
    this.draw();
  },
  watch: {
    users: {
      handler() {
        this.draw();
      },
      deep: true,
    },
  },
  methods: {
    draw() {
      const labels = this.users.map((u) => u.name);
      const values = this.users.map((u) => u.name.length);

      if (this.chart) this.chart.destroy();

      this.chart = new Chart(this.$refs.canvas, {
        type: "bar",
        data: {
          labels,
          datasets: [{ label: "Name Length", data: values }],
        },
        options: { responsive: true },
      });
    },
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  },
};
</script>

<style scoped>
.chart-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.chart-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
}
.chart-header h2 { margin: 0; font-size: 1rem; }
.chart-body { padding: 20px 24px; }
canvas { width: 100%; max-height: 360px; }
</style>