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
            <div class="row">
              <div class="col">
                <h4>Current temperature</h4>
                <span>{{currTemp}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h4>Max temperature</h4>
                <span>{{maxTemp}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h4>Daily average</h4>
                <span>{{maxTemp}}</span>
              </div>
            </div>
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
        currTemp: 0,
        maxTemp: 0,
        avgTemp: 0
      }
    },

    created: function () {
      this.getTopic();
      this.getRecords(24);
    },

    props: {
      topicId: {
        type: Number,
        required: true
      }
    },

    methods: {
      getTopic() {
        var uri = process.env.API_URL + 'topic/' + this.topicId + '/';
        this.axios.get(uri).then((response) => {
          this.topic = response.data[0].fields;
        });
      },

      getRecords(offset) {
        var uri = process.env.API_URL + 'topic/' + this.topicId + '/records/' + (offset * 3600) + '/';
        var values = [];

        this.axios.get(uri).then((response) => {
          var maxTime = this.$moment(response.data[0].fields.created);

          response.data.forEach(function (data) {
            values.push(data.fields.value);
            if(this.$moment(data.fields.created) > maxTime) {
              this.currTemp = data.fields.value;
            }
          }.bind(this));

          this.maxTemp = Math.round(Math.max.apply(null, values) * 100)/100;

          var sum = 0;
          var len = 0;
          values.forEach(function(data) {
            sum += data;
            len += 1;
          });
          this.avgTemp = Math.round((sum / len) * 100) / 100;

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
    margin-bottom: 30px;
  }

</style>
