<template>
  <div class="component">
    <h1>TOPICS</h1>
    <div v-for="topic in topics">
      <topic :topicId="topic"></topic>
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
        topics: []
      }
    },

    created: function () {
      this.getTopics();
    },

    methods: {
      getTopics() {
        var uri = 'http://192.168.1.14:8000/api/topics/';
        var topics = [];
        // Get all topics
        this.axios.get(uri).then((response) => {
          response.data.forEach(function (data) {
            topics.push(data.pk);
          });
          this.topics = topics;
        });

      },
    }
  }
</script>

<style>

</style>
