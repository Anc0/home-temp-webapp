<template>
  <div class="component">
    <div class="row topic-tile">
      <div class="col">
        <div class="row">
          <h2 class="topic-title">
            {{topic.name}}
          </h2>
        </div>
        <div class="row">
          <div class="col-3">
        <span>
          Max temperature: {{maxTemp}}<br>
          Daily average: {{avgTemp}}<br>
        </span>
          </div>
          <div class="col-9">
            <simple-line-chart :topicId="topicId" :height="200"></simple-line-chart>
          </div>
        </div>
      </div>

    </div>
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
        topic: {},
        maxTemp: 0,
        avgTemp: 0
      }
    },

    created: function () {
      this.getTopic();
    },

    props: {
      topicId: {
        type: Number,
        required: true
      }
    },

    methods: {
      getTopic() {
        var uri = 'http://192.168.1.14:8000/api/topic/' + this.topicId + '/';
        this.axios.get(uri).then((response) => {
          this.topic = response.data[0].fields;
        });
      },

      getRecords() {
        var uri = 'http://192.168.1.14:8000/api/topic/' + this.topicId + '/records/' + (24 * 3600) + '/';
        var values = [];

        this.axios.get(uri).then((response) => {
          response.data.forEach(function (data) {
            values.push(data.fields.value);
          });
          this.maxTemp = Math.max.apply(null, values);

          var sum = 0;
          var len = 0;
          values.forEach(function(data) {
            sum += data;
            len += 1;
          });
          this.avgTemp = sum / len;
        });
      }
    }
  }
</script>

<style lang="scss">
  $mist: #90afc5;

  .topic-title {
    text-align: center;
    width: 100%
  }

  .topic-tile {
    padding-top: 30px;
    padding-bottom: 30px;
    background: $mist;
    border-radius: 10px;
  }

</style>
