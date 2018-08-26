<template>
  <div class="component">
    <simple-line-chart :chartdata="this.chartdata"></simple-line-chart>
  </div>
</template>

<script>
  import SimpleLineChart from '@/components/SimpleLineChart';

  export default {
    components: {
      SimpleLineChart
    },

    data() {
      return {
        chartdata: function() {
          var uri = 'http://192.168.1.14:8000/api/topic/' + this.topic_id + '/records/';
          var times = [];
          var values = [];
          // Get all topics
          this.axios.get(uri).then((response) => {
            response.data.forEach(function (data) {
              times.push(data.fields.created);
              values.push(data.fields.value);
            });
            return [times, values]
          });
        }
      }
    },

    props: {
      topic_id: {
        type: Number,
        required: true
      }
    },

  }
</script>

<style>
</style>
