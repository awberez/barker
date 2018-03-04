import axios from "axios";

export default {

  logIn: function(loginData) {
    return axios.post("/api/login", loginData);
  },

  signUp: function(signupData) {
    return axios.post("/api/signup", signupData);
  },  

  createUser: function(userData) {
    return axios.post("/api/newuser", userData);
  },

  getUser: function(userData) {
    return axios.get(`/api/profile/${userData.userId}`);
  },

  updateUser: function(userData) {
    return axios.post("/api/updateuser", userData);
  },

  updateDog: function(dogData) {
    return axios.post("/api/updatedog", dogData);
  },

  findMatches: function(userData) {
    return axios.get(`/api/matches/${userData.userId}`);
  },

  checkMatch: function(matchData) {
    return axios.post("/api/matchcheck", matchData);
  },

  addMatch: function(matchData) {
    return axios.post("/api/matchlist", matchData);
  },

};
