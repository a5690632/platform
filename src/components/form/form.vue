<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      class="form"
      :label-width="formConfig.width"
      :rules="formConfig.rules"
    >
      <el-form-item v-for="item in formList" :key="item.key" :label="item.label" :prop="item.key">
        <el-input v-model="form[item.key]" v-if="item.type==='input'"></el-input>
        <el-select v-model="form[item.key]" v-if="item.type==='select'">
          <el-option
            v-for="option in item.config.option"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>

        <el-date-picker
          v-if="item.type=='datetime'"
          :type="item.config.type"
          v-model="form[item.key]"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>

        <el-input type="textarea" v-model="form[item.key]" v-if="item.type==='textarea'"></el-input>

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
          {{item.config.option}}
          <!-- <el-checkbox
            v-for="checkbox in item.config.option"
            :key="checkbox.value"
            :name="checkbox.value"
          >{{checkbox.label}}</el-checkbox>-->
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
  name: "forms",
  props: {
    formConfig: {
      type: Object,
      required: true,
      default: () => {}
    },
    formList: {
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
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("onsubmit", this.form);
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