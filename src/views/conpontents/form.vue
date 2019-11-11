<template>
  <div>
    <Forms :form-config="formConfig" :form-list="formList"></Forms>
  </div>
</template>

<script>
import Forms from "../../components/form/form.vue";
export default {
  name: "form-view",
  components: {
    Forms
  },
  data() {
    return {
      formConfig: {},
      formList: []
    };
  },
  created() {
    console.log(1);
  }
};
</script>

<style lang="less" scoped>
</style>