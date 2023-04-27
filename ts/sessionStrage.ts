
//check if there is submitt botton
if (document.getElementById("submit")) {
  const emailInput = document.getElementById("email")as HTMLInputElement;

  // When the submit button is clicked, save the email to sessionStorage
  document.getElementById("submit").addEventListener("click", function (event) {
      event.preventDefault();
      const email = emailInput.value;
      // keep to the sessionStorage
      sessionStorage.setItem("email", email); 
      console.log(sessionStorage.getItem("email"));
  });


  // Get the username input element
  const usernameInput = document.getElementById("username")as HTMLInputElement;
  // When the submit button is clicked, save the email to sessionStorage
  document.getElementById("submit").addEventListener("click", function (event) {
      event.preventDefault();
      const username = usernameInput.value;
      // keep to the sessionStorage
      sessionStorage.setItem("username", username); 
      console.log(sessionStorage.getItem("username"));
  });
}
else{
//navbar login user
console.log("---------",sessionStorage.getItem("username"));
  if (sessionStorage.getItem("username")) {
    document.getElementById("login-user").innerHTML = sessionStorage.getItem("username");
  }
}

