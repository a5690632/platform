import ajax from "../../utils/request";

export default {
  getTable() {
    return ajax.post("/api/user/list");
  },
  login(data) {
    return ajax.post("/api/user/login",data);
  }
};
