<template>
  <div class="card chart-card">
    <div class="chart-header">
      <h2>🏢 Users by Company</h2>
    </div>
    <div class="chart-body">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";
// import companycounts from "../src/calculations/companyCounts.js";

export default {
  name: "UserByCompanyChart",
  props: {
    users: { type: Array, required: true },
  },
  data() {
    return {
      chart: null,
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
    drawChart() {
      const companyCounts = {}

this.users.forEach(user => {
  const company = user.company.name

  if (companyCounts[company]) {
    companyCounts[company]++
  } else {
    companyCounts[company] = 1
  }
})



const labels = Object.keys(companyCounts)
const values = Object.values(companyCounts)

      const data = {
        labels,
        datasets: [
          {
            label: "User",
            data: values,
            backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
            borderWidth: 1,
          },
        ],
      };

      const config = {
        type: "bar",
        data,
        options: {
          scales: {
            x: {
                title:{
                    display:true,
                    text:"company"
                }
             },
            y: { beginAtZero: true,
                title:{
                    display:true,
                    text:"number of users"
                }
             },
          },
        },
      };

      if (this.chart) this.chart.destroy();
      this.chart = new Chart(this.$refs.chartCanvas, config);
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