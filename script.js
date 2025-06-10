// This script will check if the button can be found.
const warningContinueButton = document.getElementById('warning-continue-button');

if (warningContinueButton) {
  // If the button is found, this alert will appear.
  alert("The spirits can SEE the button!");

  // We will now add a simple click listener.
  warningContinueButton.addEventListener('click', () => {
    alert("VICTORY! The button has been CLICKED!");
  });

} else {
  // If the button is NOT found, this alert will appear.
  alert("The spirits are BLIND to the button! The ID in index.html may be wrong!");
}