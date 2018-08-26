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
        var uri = 'http://192.168.1.14:8000/api/topic/' + this.topicId + '/records/';
        var times = [];
        var values = [];

        this.axios.get(uri).then((response) => {
          response.data.forEach(function (data) {

            console.log(this.$moment(data.fields.created).format());

            times.push(data.fields.created);
            values.push(data.fields.value);
          });

          this.renderChart({
            labels: times,
            datasets: [
              {
                backgroundColor: '#f87979',
                data: values
              }
            ]
          },
          {
            legend: {
              display: false
            }
          })
        });
      }
    },

    mounted() {
      this.getData.call();
    }

  }
</script>
