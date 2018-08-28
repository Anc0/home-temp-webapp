<template>
  <div class="component">
    <h1>TOPICS</h1>
    <div v-for="topic in topics">
      <topic :topicId="topic" :offset="offset"></topic>
    </div>
    <div class="row">
      <div class="col">
        <span>Set number of days:</span>
        <select v-on:change="changeDays">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  import Topic from '@/components/Topic';

  export default {
    components: {
      topic: Topic
    },

    data() {
      return {
        topics: [],
        offset: 3600 * 24
      }
    },

    created: function () {
      this.getTopics();
    },

    methods: {
      getTopics() {
        var uri = process.env.API_URL + 'topics/';
        var topics = [];
        // Get all topics
        this.axios.get(uri).then((response) => {
          response.data.forEach(function (data) {
            topics.push(data.pk);
          });
          this.topics = topics;
        });
      },

      changeDays(e) {
        this.offset = e.target.value * 3600 * 24;
        console.log("Updating.");
        this.$forceUpdate();
      }
    }
  }
</script>

<style>

</style>
