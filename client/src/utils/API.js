import axios from "axios";
/*import MockAdapter from 'axios-mock-adapter';

  const mock = new MockAdapter(axios);
  
  mock.onGet('/api/login').reply(200, {
    users: [
      { id: 1 }
    ]
  });

  mock.onGet('/api/user').reply(200, {
    users: [{
      firstName: "Alex",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      profile: "",
      dogName: "",
      breed: "",
      sex: "",
      age: "",
      weight: ""
    }]
  });


  mock.onPost('/api/newuser').reply(200, {
    users: [
      { id: 1 }
    ]
  });

  mock.onPost('/api/newuser').reply(200, {
    users: [
      { id: 2 }, { id: 3 }, { id: 4 }
    ]
  });*/

export default {

  logIn: function(loginData) {
    //return "1";
    return axios.get("/api/login", loginData);
  },

  signUp: function(signupData) {
    //return "1";
    return axios.post("/api/signup", signupData);
  },  

  createUser: function(userData) {
    //return "1";
    return axios.post("/api/newuser", userData);
  },

  getUser: function(userData) {
    return axios.get("/api/user", userData);
  },

  updateUser: function(userData) {
    return axios.post("/api/newuser", userData);
  },

  findMatches: function(searchData) {
    //return "1";
    return axios.get("/api/matches", searchData);
  },

};
