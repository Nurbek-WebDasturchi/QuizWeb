/**
 * TestPlatform — Global Utility Functions
 */

// Show alert
function showAlert(type, message) {
  const alertEl = document.createElement("div");
  alertEl.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 shadow-lg rounded-pill z-3`;
  alertEl.style.minWidth = "300px";
  alertEl.style.zIndex = "9999";
  alertEl.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alertEl);
  setTimeout(() => alertEl.remove(), 4000);
}

// Auth guard
function checkAuth() {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "login.html";
  }
  return JSON.parse(user);
}

// Format date
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Share function
function shareLink(testId) {
  const url = window.location.origin + "/test.html?share=" + testId;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
    showAlert("success", "Havola nusxalandi!");
  } else {
    prompt("Havolani nusxalang:", url);
  }
}

// Test initialization for shared links
function loadSharedTest() {
  const params = new URLSearchParams(window.location.search);
  const share = params.get("share");
  if (share) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      const tests = JSON.parse(
        localStorage.getItem("tests_" + user.email) || "[]"
      );
      const test = tests.find((t) => t.id === share);
      if (test) {
        localStorage.setItem("currentTest", JSON.stringify(test));
      }
    }
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  loadSharedTest();
});
