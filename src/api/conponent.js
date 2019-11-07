import request from "../plugins/axios"
import Vue from "vue"
class Fetch {
  post(url, data) {
    request({
      url,
      data,
      method: 'post',
    })
  }
  login() {

  }
  getTable() {
    this.post("/api/user/list")
  }
}

Vue.prototype.$api = new Fetch()
