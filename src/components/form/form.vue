<template>
  <div>
    <el-form
      ref="form"
      :model="ruleForm"
      class="form"
      :label-width="formConfig.width"
      :rules="formConfig.rules"
    >
      <el-form-item v-for="item in fromList" :key="item.key" :label="item.label">
        <el-input
          v-model="form[item.key]"
          v-if="item.type==='input'"
          :placeholder="item.placeholder"
        ></el-input>

        <el-select
          v-model="form[item.key]"
          :placeholder="item.placeholder"
          v-if="item.type==='select'"
        >
          <el-option
            v-for="option in item.selectArray"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>

        <el-date-picker
          v-if="item.type='date'"
          v-model="form[item.key]"
          :type="item.dateType"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          format="yyyy 年 MM 月 dd 日"
        ></el-date-picker>

        <el-input
          type="textarea"
          v-model="form[item.key]"
          v-if="item.type==='textarea'"
          :placeholder="item.placeholder"
        ></el-input>

        <el-switch v-model="form[item.key]" v-if="item.type==='switch'"></el-switch>

        <el-radio-group v-model="form[item.key]" v-if="item.type==='radio'">
          <el-radio
            v-for="radio in item.radioArray"
            :key="radio.value"
            :label="radio.label"
            :value="radio.value"
          ></el-radio>
        </el-radio-group>

        <el-checkbox-group v-model="form[item.key]" v-if="item.type==='checkbox'">
          <el-checkbox
            v-for="checkbox in item.checkboxArray"
            :key="checkbox.value"
            :label="checkbox.label"
            :value="checkbox.value"
            :name="checkbox.value"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "form",
  props: {
    formConfig: {
      type: Object,
      required: true,
      default: () => {}
    },
    fromList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      form: {}
    };
  },
  methods: {
    onSubmit() {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>