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
  async login() {
    let res = await this.post("/api/user/login")
    if (res.cdoe === 1) {
      localStorage.setItem("token", res.data)
    }
  }
  async layout() {
    let res = await this.post("/api/user/layout")
    if (res.cdoe === 1) {
      localStorage.removeItem("token", res.data)
    }
  }
  getTable() {
    this.post("/api/user/list")
  }
}

Vue.prototype.$api = new Fetch()
