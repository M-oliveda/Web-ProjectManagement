export function getAccesToken() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return sessionStorage.getItem("token");
  }
}

export function removeAccesToken() {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    return;
  } else {
    sessionStorage.removeItem("token");
    return;
  }
}
