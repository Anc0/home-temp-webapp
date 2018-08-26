<template>
  <div class="component">
    <simple-line-chart :topicId="topicId" :height="200"></simple-line-chart>
  </div>
</template>

<script>
  import SimpleLineChart from '@/components/SimpleLineChart';

  export default {
    components: {
      SimpleLineChart
    },

    props: {
      topicId: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style>
</style>
