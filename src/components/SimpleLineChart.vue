<script>
  import {Line} from 'vue-chartjs'

  export default {
    extends: Line,

    props: {
      topicId: {
        type: Number,
        required: true
      },
      offset: {
        type: Number,
        requierd: true
      }
    },

    methods: {
      getData: function () {
        var uri = process.env.API_URL + 'topic/' + this.topicId + '/records/' + this.offset + '/';
        var times = [];
        var values = [];
        var tempData = [];

        this.axios.get(uri).then((response) => {
          response.data.forEach(function (data) {
            times.push(this.$moment(data.created).format('YYYY MM DD HH:mm'));
            values.push(Math.round(data.value * 100)/100);
          }.bind(this));

          this.renderChart({
              labels: times,
              datasets: [
                {
                  borderColor: '#763626',
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
                  display: true,
                  maxTicksLimit: 4
                }],
                yAxes: [{
                  display: true,
                  ticks: {
                    suggestedMin: Math.min.apply(null, values) - 0.1,
                    suggestedMax: Math.max.apply(null, values) + 0.1
                  },
                  gridlines: {
                    color: "rgba(0, 0, 0, 0)"
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
              },
              tooltips: {
                intersect: false
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
