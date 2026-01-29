alert("Hello, ice cream!");

//When you assign a property to a function you don't put parentheses or else it will run immediately
document.getElementById("ice-cream-form").onsubmit = () => {
  clearErrors();

  let isValid = true;

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let flavor = document.getElementById("flavor").value.trim();
  let cone = document.getElementById("cone").value.trim();

  //first name validation
  if (!name) {
    document.getElementById("err-name").style.display = "block";
    isValid = false;
  }

  //email validation
  if (!email) {
    document.getElementById("err-email").style.display = "block";
    isValid = false;
  }

  //flavor validation
  if (!flavor) {
    document.getElementById("err-flavor").style.display = "block";
    isValid = false;
  }

  //cone validation
  if (!cone) {
    document.getElementById("err-cone").style.display = "block";
    isValid = false;
  }

  //scrolls back to top of page on incomplete submission
  if (!isValid) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return isValid;
};

function clearErrors() {
  let errors = document.getElementsByClassName("err");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}