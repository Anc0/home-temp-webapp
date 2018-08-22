<template>
  <div class="component">
    <line-chart :data="values"></line-chart>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        values: []
      }
    },

    created: function () {
      this.getTopic();
    },

    props: {
      topic_id: {
        type: Number,
        required: true
      }
    },

    methods: {
      getTopic() {
        var uri = 'http://192.168.1.14:8000/api/topic/' + this.topic_id + '/records/';
        var values = [];

        // Get all topics
        this.axios.get(uri).then((response) => {
          console.log(response);
          response.data.forEach(function (data) {
            values.push([data.fields.created, data.fields.value]);
          });
          this.values = values;
        });

      },
    }
  }
</script>

<style>
</style>
