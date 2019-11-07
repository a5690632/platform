<template>
  <div>
    <template>
      <div class="box">
        <div>
          <el-tabs v-if="tabList" v-model="active" @tab-click="handleClick">
            <el-tab-pane
              v-for="item in tabList"
              :key="item.id"
              :label="item.label"
              :name="item.name"
            />
          </el-tabs>
        </div>
        <el-form
          v-if="formConfig.length>0"
          ref="ruleForm"
          :model="ruleForm"
          label-width="100px"
          class="Form"
          inline
        >
          <el-form-item
            v-for="item in formConfig"
            :key="item.name"
            :label="item.label"
            :prop="item.name"
          >
            <el-input
              v-if="item.type=='text'"
              v-model="ruleForm[item.name]"
              :placeholder="item.placeholder"
              :prefix-icon="item.icon"
              @change="item.changeMethod(ruleForm) "
            />
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column v-for="item in tableList" :key="item.label" :label="item.label">
            <template scope="scope">
              <div v-if="item.renderType===1" v-html="item.render(scope.row)" />
              <div v-else-if="item.renderType===2">
                <div
                  v-for="items in scope.row[item.name]"
                  :key="items.id"
                  :class="[items[item.className] == item.classData? item.className :''] "
                >{{ items[item.renderName] }}</div>
              </div>
              <div v-else-if="item.renderType===3">
                <el-button
                  class="btn"
                  v-for="items in item.renderButton"
                  :key="items.name"
                  :icon="items.icon"
                  :size="items.size"
                  :disabled="items.disabledData===scope.row[items.disabledName]&&typeof items.disabledName==='string'"
                  @click="items.renderButtonMethod(scope.row,items)"
                >{{items.name}}</el-button>
              </div>
              <div v-else-if="item.renderType==4">
                <el-button
                  class="btn"
                  v-if="renderButton.checkName===item.name&&renderButton.checkData==scope.row[item.name]"
                  :key="renderButton.name"
                  :icon="renderButton.icon"
                  :size="renderButton.size"
                  @click="items.renderButtonMethod(scope.row,renderButton)"
                >{{ renderButton.name }}</el-button>
                <span v-else>{{ renderButton.showData }}</span>
              </div>
              <div v-else>
                <span v-if="item.secondName">{{scope.row[item.name][item.secondName]}}</span>
                <span v-else>{{scope.row[item.name]}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            prev-text="上一页"
            next-text="下一页"
            background
            layout="prev,pager,next,total,jumper"
            :current-page="pageNumber"
            :page-size="pageSize"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script >
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableList: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      default: 12
    },
    tabList: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    formConfig: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pageNumber: 1,
      active: "",
      ruleForm: {}
    };
  },
  created() {
    if (this.activeName) {
      this.active = this.activeName;
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.pageNumber = page;
      this.$emit("get-data", {
        page: this.pageNumber,
        ...this.ruleForm
      });
    },
    handleClick() {
      this.ruleForm = {};
      this.$emit("get-data", {
        page: this.pageNumber,
        activeName: this.active
      });
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  background: rgba(255, 255, 255, 1);
  min-height: calc(100vh - 158px);
  padding: 24px 24px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .search-box {
    position: absolute;
    top: 25px;
    right: 50px;
    z-index: 1;
  }
  .search {
    cursor: pointer;
  }
  .btn {
    margin-right: 8px;
  }
}
</style>



