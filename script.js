// Diagnostic Script to Interrogate the Button
const button = document.getElementById('warning-continue-button');

if (button) {
  alert("The script can SEE the button.");
  button.addEventListener('click', () => {
    alert("The button CLICK has been registered!");
  });
} else {
  alert("The script CANNOT see the button.");
}