const Auth = {

  login(nombre) {
    localStorage.setItem("ow_user", nombre);
  },

  logout() {
    localStorage.removeItem("ow_user");
  },

  getUser() {
    return localStorage.getItem("ow_user");
  },

  isLogged() {
    return !!localStorage.getItem("ow_user");
  }

};