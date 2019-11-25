<template>
  <div>
    <Table :table-data="tableData" :table-list="tableList" :total="total" @get-data="getData" />
  </div>
</template>

<script>
import Table from "../../components/table.vue";
export default {
  name: "",
  data() {
    return {
      tabList: [],
      tableData: [],
      tableList: [],
      formConfig: [],
      total: 0
    };
  },
  components: {
    Table
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$api.getTable();
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>