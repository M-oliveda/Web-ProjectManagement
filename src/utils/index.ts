export function get_access_token() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return sessionStorage.getItem("token");
  }
}

export function remove_access_token() {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    return;
  } else {
    sessionStorage.removeItem("token");
    return;
  }
}
