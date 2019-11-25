<template>
  <div>
    <Forms :form-config="formConfig" :form-list="formList" @onsubmit="submit"></Forms>
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
      formConfig: {
        rules: {
          name: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
        }
      },
      formList: [
        {
          key: "name",
          type: "input",
          label: "姓名："
        },
        {
          key: "region",
          type: "select",
          label: "活动区域：",
          config: {
            option: [
              {
                label: "区域1",
                value: "1"
              },
              {
                label: "区域2",
                value: "2"
              }
            ]
          }
        },
        {
          key: "datetime",
          type: "datetime",
          label: "时间：",
          config: {
            type: "datetimerange"
          }
        },
        {
          key: "delivery",
          type: "switch",
          label: "开关"
        },
        {
          key: "checkbox",
          type: "checkbox",
          label: "多选",
          config: {
            option: [
              {
                label: "区域1",
                value: "1"
              },
              {
                label: "区域2",
                value: "2"
              }
            ]
          }
        }
      ]
    };
  },
  created() {},
  methods: {
    submit(from) {
      console.log(from);
    }
  }
};
</script>

<style lang="less" scoped>
</style>