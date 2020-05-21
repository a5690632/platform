export default {
  props: {
    /**
     * @description 表格数据
     */
    pagination: {
      type: Object,
      default: null
    }
  },
  methods: {
    /**
     * @description 每页条数改变
     */
    handlePaginationSizeChange (pageSize) {
      this.$emit('pagination-size-change', pageSize)
    },
    /**
     * @description 当前页码改变
     */
    handlePaginationCurrentChange (data) {
      this.$emit('pagination-current-change', data)
    },
    /**
     * @description 上一页
     */
    handlePaginationPrevClick (data) {
      this.$emit('pagination-prev-click', data)
    },
    /**
     * @description 下一页
     */
    handlePaginationNextClick (data) {
      this.$emit('pagination-next-click', data)
    }
  }
}
