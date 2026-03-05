<template>
  <div class="card">
    <h2>Company Share (Pie %)</h2>

    <div class="actions">
      <button @click="randomize">Randomize</button>
      <button @click="addData">Add Data</button>
      <button @click="removeData">Remove Data</button>
      <button @click="resetToApi">Reset to API</button>
    </div>

    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  name: "UsersByCompanyPie",
  props: {
    users: { type: Array, required: true },
  },
  data() {
    return {
      chart: null,
      apiLabels: [],
      apiValues: [],
      apiColors: [],
    };
  },
  mounted() {
    this.drawChart();
  },
  watch: {
    users: {
      handler() {
        this.drawChart();
      },
      deep: true,
    },
  },
  methods: {
    // ---- helpers (replaces Utils.* from Chart.js docs) ----
    randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    makeColors(count) {
      // stable enough for demo; generates one color per slice
      const colors = [];
      for (let i = 0; i < count; i++) {
        colors.push(`hsla(${Math.random() * 360}, 70%, 60%, 0.75)`);
      }
      return colors;
    },

    // ---- build chart data from API users ----
    getCompanyCounts() {
      const counts = {};
      this.users.forEach((u) => {
        const company = u?.company?.name || "Unknown";
        counts[company] = (counts[company] || 0) + 1;
      });
      return counts;
    },

    // ---- create / recreate chart ----
    drawChart() {
      const companyCounts = this.getCompanyCounts();
      const labels = Object.keys(companyCounts);
      const values = Object.values(companyCounts);
      const colors = this.makeColors(labels.length);

      // cache the API-based state so "Reset to API" can restore it
      this.apiLabels = [...labels];
      this.apiValues = [...values];
      this.apiColors = [...colors];

      const total = values.reduce((a, b) => a + b, 0);

      const data = {
        labels,
        datasets: [
          {
            label: "Users",
            data: values,
            backgroundColor: colors,
            borderWidth: 1,
          },
        ],
      };

      const config = {
        type: "pie",
        data,
        plugins: [ChartDataLabels],
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Users by Company (%)" },

            // show % on slices
            datalabels: {
              color: "#111",
              formatter: (value) => {
                const pct = total ? (value / total) * 100 : 0;
                return `${pct.toFixed(1)}%`;
              },
            },
          },
        },
      };

      if (this.chart) this.chart.destroy();
      this.chart = new Chart(this.$refs.chartCanvas, config);
    },

    // ---- "actions" (Vue buttons) ----
    randomize() {
      if (!this.chart) return;

      // keep labels same; randomize values
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data = dataset.data.map(() => this.randInt(0, 100));
      });

      this.chart.update();
    },

    addData() {
      if (!this.chart) return;

      // add a new slice
      const nextIndex = this.chart.data.labels.length + 1;
      this.chart.data.labels.push(`Company #${nextIndex}`);

      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(this.randInt(0, 100));

        // add a color for new slice
        const newColor = this.makeColors(1)[0];
        if (Array.isArray(dataset.backgroundColor)) {
          dataset.backgroundColor.push(newColor);
        } else {
          dataset.backgroundColor = this.makeColors(this.chart.data.labels.length);
        }
      });

      this.chart.update();
    },

    removeData() {
      if (!this.chart) return;

      // remove last slice
      this.chart.data.labels.pop();

      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
        if (Array.isArray(dataset.backgroundColor)) dataset.backgroundColor.pop();
      });

      this.chart.update();
    },

    resetToApi() {
      if (!this.chart) return;

      this.chart.data.labels = [...this.apiLabels];
      this.chart.data.datasets[0].data = [...this.apiValues];
      this.chart.data.datasets[0].backgroundColor = [...this.apiColors];

      this.chart.update();
    },
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 14px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
}
button {
  padding: 6px 10px;
  cursor: pointer;
}
canvas {
  width: 100%;
  max-height: 360px;
}
</style>