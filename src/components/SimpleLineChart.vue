<script>
  import {Line} from 'vue-chartjs'

  export default {
    extends: Line,

    props: {
      chartdata: {
        type: Array,
        required: true
      }
    },

    mounted() {
    console.log(this.chartdata);
    this.renderChart({
      labels: [1],
      datasets: [
        {
          backgroundColor: '#f87979',
          data: [2]
        }
      ]
    })
  }

  }
</script>
