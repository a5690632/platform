import ajax from "@/api/index.js";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const state = {
  token: getToken(),
  userInfo: [],
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },

  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },

  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, password, verificateCode } = userInfo;
    return new Promise(async (resolve, reject) => {
      try {
        let res = await ajax.common.login({
          userName: userName.trim(),
          password: password,
          verificateCode: verificateCode,
        });
        commit("SET_TOKEN", res.token);
        setToken(res.token);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  checkUserInfo({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await ajax.common.checkUserInfo();
        commit("SET_USERINFO", res.userInfo);
        commit("SET_ROLES", res.roles);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      try {
        await ajax.common.logout();
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        resetRouter();
        dispatch("tagsView/delAllViews", null, { root: true });
        resolve();
      } catch (error) {
        reject();
      }
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
