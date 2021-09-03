<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  data() {
    const labelsArray = [
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
    ];
    const dataArray = [40, 30, 50, 25, 70, 40, 30, 50, 25, 70];
    return {
      chartdata: {
        labels: labelsArray,
        datasets: [
          {
            label: ["摂取カロリー"],
            backgroundColor: "#f87979",
            data: dataArray,
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
