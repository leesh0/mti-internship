<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  data() {
    return {
      chartdata: {
        labels: [
          "8/25",
          "8/26",
          "8/27",
          "8/28",
          "8/29",
          "8/30",
          "8/31",
          "9/1",
          "9/2",
          "9/3",
        ],
        datasets: [
          {
            label: ["摂取カロリー"],
            backgroundColor: "#f87979",
            data: [40, 30, 50, 25, 70, 40, 30, 50, 25, 70],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "日",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 10,
              },
              scaleLabel: {
                display: true,
                labelString: "Kcal",
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
