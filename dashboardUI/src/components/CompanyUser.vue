<template>
  <div class="card chart-card">
    <div class="chart-header">
      <h2>📈 Bar Chart (Rounded)</h2>
      <button class="header-action" @click="randomize">↻ Randomize</button>
    </div>
    <div class="chart-body">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  name: "UsersByCompanyChart",
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    getMonths(count = 7) {
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      return months.slice(0, count);
    },

    getRandomNumbers({ count, min, max }) {
      const arr = [];
      for (let i = 0; i < count; i++) {
        const n = Math.floor(Math.random() * (max - min + 1)) + min;
        arr.push(n);
      }
      return arr;
    },

    transparentize(rgbString, alpha = 0.5) {
      const m = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!m) return rgbString;
      const r = m[1], g = m[2], b = m[3];
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },

    createChart() {
      const DATA_COUNT = 7;
      const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

      const labels = this.getMonths(DATA_COUNT);

      const CHART_COLORS = {
        red: "rgb(255, 99, 132)",
        blue: "rgb(54, 162, 235)",
      };

      const data = {
        labels,
        datasets: [
          {
            label: "Fully Rounded",
            data: this.getRandomNumbers(NUMBER_CFG),
            borderColor: CHART_COLORS.red,
            backgroundColor: this.transparentize(CHART_COLORS.red, 0.5),
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
          },
          {
            label: "Small Radius",
            data: this.getRandomNumbers(NUMBER_CFG),
            borderColor: CHART_COLORS.blue,
            backgroundColor: this.transparentize(CHART_COLORS.blue, 0.5),
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
          },
        ],
      };

      const config = {
        type: "bar",
        data,
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Chart.js Bar Chart (Vue)" },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      };

      if (this.chart) this.chart.destroy();
      this.chart = new Chart(this.$refs.chartCanvas, config);
    },

    randomize() {
      if (!this.chart) return;

      const min = -100;
      const max = 100;
      const count = this.chart.data.labels.length;

      this.chart.data.datasets.forEach((dataset) => {
        dataset.data = this.getRandomNumbers({ count, min, max });
      });

      this.chart.update();
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chart-header h2 { margin: 0; font-size: 1rem; }
.header-action {
  font-size: 0.8rem;
  padding: 6px 12px;
}
.chart-body { padding: 20px 24px; }
canvas { width: 100%; max-height: 360px; }
</style>