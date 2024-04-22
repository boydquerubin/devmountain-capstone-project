document.addEventListener("DOMContentLoaded", function () {
  setupGetStartedButton();
});

function setupGetStartedButton() {
  const getStartedButton = document.querySelector(".get-started-button");

  getStartedButton.addEventListener("click", function (event) {
    const nextTabSelector = this.getAttribute("data-next");
    const nextTab = document.querySelector(
      `.nav-link[href='${nextTabSelector}']`
    );
    if (nextTab) {
      new bootstrap.Tab(nextTab).show();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      console.error(
        "Target tab for Get Started button not found:",
        nextTabSelector
      );
    }
  });
}
