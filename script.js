//your JS code here. If required.
// Utility function to set a cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Utility function to get a cookie by name
function getCookie(name) {
  const decodedCookies = decodeURIComponent(document.cookie);
  const ca = decodedCookies.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name + "=") == 0) return c.substring(name.length + 1, c.length);
  }
  return "";
}

// Apply the saved font size and color if available
function applyPreferences() {
  const savedFontSize = getCookie("fontSize");
  const savedFontColor = getCookie("fontColor");

  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", savedFontSize + "px");
    document.getElementById("fontsize").value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    document.getElementById("fontcolor").value = savedFontColor;
  }
}

// Event listener for form submission
document.getElementById("preferences-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values from the input fields
  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Save the preferences in cookies
  setCookie("fontSize", fontSize, 365); // Save for 365 days
  setCookie("fontColor", fontColor, 365); // Save for 365 days

  // Apply preferences immediately
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);
});

// Apply preferences when the page loads
window.onload = applyPreferences;
