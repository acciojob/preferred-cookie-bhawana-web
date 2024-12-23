//your JS code here. If required.
// Function to get a cookie value by name
function getCookie(name) {
  let cookieArr = document.cookie.split("; ");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (cookiePair[0] === name) {
      return cookiePair[1];
    }
  }
  return null;
}

// Function to set a cookie with a name, value, and expiration in days
function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Set expiry date
  let expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to apply user preferences from cookies
function applyPreferences() {
  const fontSize = getCookie("fontsize");
  const fontColor = getCookie("fontcolor");

  if (fontSize) {
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.getElementById("fontsize").value = fontSize;
  }

  if (fontColor) {
    document.documentElement.style.setProperty("--fontcolor", fontColor);
    document.getElementById("fontcolor").value = fontColor;
  }
}

// Handle form submission (save user preferences)
document.getElementById("preferences-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload on form submission

  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Save preferences in cookies
  setCookie("fontsize", fontSize, 365); // Save font size for 365 days
  setCookie("fontcolor", fontColor, 365); // Save font color for 365 days
});

// Apply preferences when the page loads
window.onload = applyPreferences;
