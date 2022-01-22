function handleLogin(email, password) {
  axios.post("/auth/signin", {
    email,
    password
  })
  .then(response => {
    console.log(response);
  })
}

document.getElementById("btn-login").addEventListener("click", handleLogin);