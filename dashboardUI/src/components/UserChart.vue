<template>
  <div class="card">
    <h2>Chart.js in Vue</h2>
    <canvas ref="canvas"></canvas>
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
.card { border: 1px solid #ddd; border-radius: 10px; padding: 14px; }
canvas { width: 100%; max-height: 360px; }
</style>