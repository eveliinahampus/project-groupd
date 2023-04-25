// Get the email input element
const emailInput = document.getElementById("email") as HTMLInputElement;
// When the submit button is clicked, save the email to sessionStorage
document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault(); 
  const email = emailInput.value; 

  sessionStorage.setItem("email", email); // keep to the sessionStorage
  // 他の処理を追加する
  console.log(sessionStorage.getItem("email"));

});
console.log(sessionStorage.getItem("email"));


// Get the username input element
const usernameInput = document.getElementById("username") as HTMLInputElement;
// When the submit button is clicked, save the email to sessionStorage
document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();
  const username = usernameInput.value; 

  sessionStorage.setItem("username", username); // keep to the sessionStorage
  // 他の処理を追加する
  console.log(sessionStorage.getItem("username"));

});
console.log(sessionStorage.getItem("username"));



