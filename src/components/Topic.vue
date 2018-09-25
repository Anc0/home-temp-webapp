<template>
  <div class="component">
    <div class="row topic-tile">
      <div class="col">
        <div class="row">
          <h2 class="topic-title">
            <a href="/topic">{{topic.short_name}}</a>
          </h2>
        </div>
        <div class="row">
          <div class="col-3 d-none d-xl-block">

            <div class="stat-container">
              <div class="row">
                <div class="col">
                    <span>
                      Current
                    </span>
                </div>
              </div>
              <div class="row">
                <div class="col">
                <span>
                  {{currTemp}}
                </span>
                </div>
              </div>
            </div>

            <div class="stat-container">
              <div class="row">
                <div class="col">
                    <span>
                      Maximum
                    </span>
                </div>
              </div>
              <div class="row">
                <div class="col">
                <span>
                  {{maxTemp}}
                </span>
                </div>
              </div>
            </div>

            <div class="stat-container">
              <div class="row">
                <div class="col">
                    <span>
                      Average
                    </span>
                </div>
              </div>
              <div class="row">
                <div class="col">
                <span>
                  {{avgTemp}}
                </span>
                </div>
              </div>
            </div>

          </div>
          <div class="col-9 d-none d-xl-block">
            <simple-line-chart :topicId="topicId" :offset="offset" :height="200"></simple-line-chart>
          </div>
        </div>
        <div class="row">
          <div class="col d-xl-none">
            <simple-line-chart :topicId="topicId" :offset="offset" :height="200"></simple-line-chart>
          </div>
        </div>
        <div class="row">
          <div class="col d-xl-none">
                        <div class="stat-container">
              <div class="row">
                <div class="col">
                    <span>
                      Current
                    </span>
                </div>
              </div>
              <div class="row">
                <div class="col">
                <span>
                  {{currTemp}}
                </span>
                </div>
              </div>
            </div>

            <div class="stat-container">
              <div class="row">
                <div class="col">
                    <span>
                      Maximum
                    </span>
                </div>
              </div>
              <div class="row">
                <div class="col">
                <span>
                  {{maxTemp}}
                </span>
                </div>
              </div>
            </div>

            <div class="stat-container">
              <div class="row">
                <div class="col">
                    <span>
                      Average
                    </span>
                </div>
              </div>
              <div class="row">
                <div class="col">
                <span>
                  {{avgTemp}}
                </span>
                </div>
              </div>
            </div>

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
        avgTemp: 0,
      }
    },

    created: function () {
      this.getTopic();
      this.getRecords();
    },

    props: {
      topicId: {
        type: Number,
        required: true
      },
      offset: {
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

      getRecords() {
        var uri = process.env.API_URL + 'topic/' + this.topicId + '/records/' + this.offset + '/';
        var values = [];

        this.axios.get(uri).then((response) => {
          var maxTime = this.$moment(response.data[0].created);

          response.data.forEach(function (data) {
            values.push(data.value);
            if (this.$moment(data.created) > maxTime) {
              this.currTemp = data.value;
            }
          }.bind(this));
          this.currTemp = Math.round(this.currTemp * 100) / 100;

          this.maxTemp = Math.round(Math.max.apply(null, values) * 100) / 100;

          var sum = 0;
          var len = 0;
          values.forEach(function (data) {
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
  $stone: #336b87;
  $shadow: #2a3132;
  $autumn: #763626;

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

  .stat-container {
    background: $stone;
    border-radius: 10px;
    color: white;
    font-size: 32px;
    width: 80%;
    text-align: center;
    margin: 20px 40px 0 40px;
  }

  .stat-row {
    display: inline-block;
  }

  a {
    color: black;
    
    &:hover {
      color: $autumn;
      text-decoration: none;
    }
  }

</style>
