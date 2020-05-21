import ajax from "../../utils/request";

export default {
  getTable() {
    return ajax.post("/api/user/list");
  },
};
