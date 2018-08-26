<script>
  import {Line} from 'vue-chartjs'

  export default {
    extends: Line,

    props: {
      topicId: {
        type: Number,
        required: true
      }
    },

    methods: {
      getData: function () {
        var uri = 'http://192.168.1.14:8000/api/topic/' + this.topicId + '/records/' + (24 * 3600) + '/';
        var times = [];
        var values = [];


        this.axios.get(uri).then((response) => {
          response.data.forEach(function (data) {
            times.push(data.fields.created);
            values.push(data.fields.value);
          }.bind(this));

          this.renderChart({
              labels: times,
              datasets: [
                {
                  borderColor: '#f87979',
                  data: values,
                  fill: false,
                  cubicInterpolationMode: 'monotone'
                }
              ]
            },
            {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: false
                }],
                yAxes: [{
                  display: true,
                  ticks: {
                    suggestedMin: Math.min.apply(null, values) - 0.1,
                    suggestedMax: Math.max.apply(null, values) + 0.1
                  }
                }]
              },
              elements: {
                point: {
                  radius: 0
                }
              },
              layout: {
                padding: {
                  left: 10,
                  right: 10,
                  top: 10,
                  bottom: 10
                }
              }
            })
        })
      }
    },

    mounted() {
      this.getData();
    }

  }
</script>
