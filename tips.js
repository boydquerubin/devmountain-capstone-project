let tipsFetched = false;
document.addEventListener("DOMContentLoaded", function () {
  // console.log("1");
  if (!tipsFetched) {
    fetchTips(); // Initialize state to indicate that tips have not been fetched yet
  }
});

document.getElementById("getTips").addEventListener("click", function () {
  // console.log("2");
  if (!tipsFetched) {
    fetchTips();
    tipsFetched = true; // Update state to indicate that tips have been fetched
  }
});

document.getElementById("addNewTip").addEventListener("click", addTip);

// Call fetchTips directly after page load
fetchTips();
tipsFetched = true; // Update state as tips are fetched on page load

function fetchTips() {
  // console.log("3");
  axios
    .get("http://localhost:3000/tips")
    .then((response) => {
      const tips = response.data;
      const tipsList = document.getElementById("tipsList");
      tipsList.innerHTML = ""; // Clear existing tips before repopulating
      tips.forEach((tip) => {
        const li = document.createElement("li");
        li.textContent = tip.text;
        li.id = `tip-${tip.id}`;

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTip(tip.id);
        deleteBtn.classList.add("button", "delete-button");

        // Create update button
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.onclick = () => {
          const newText = prompt("Enter new tip text:", tip.text);
          if (newText) {
            updateTip(tip.id, newText);
          }
        };
        updateBtn.classList.add("button", "update-button");

        li.appendChild(updateBtn);
        li.appendChild(deleteBtn);
        tipsList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching tips:", error));
}

function addTip(event) {
  // console.log("4");
  event.preventDefault(); // Prevent default form submission
  const tipText = prompt("Enter a new money saving tip:");
  if (tipText) {
    console.log("what the hell");
    axios
      .post("http://localhost:3000/tips", { text: tipText })
      .then((response) => {
        fetchTips();
      })
      .catch((error) => console.error("Error adding tip:", error));
  }
}

function updateTip(id, text) {
  // console.log("5");
  axios
    .put(`http://localhost:3000/tips/${id}`, { text: text })
    .then((response) => {
      fetchTips(); // Refresh the tips list regardless of the previous state
    })
    .catch((error) => console.error("Error updating tip:", error));
}

function deleteTip(id) {
  // console.log("6");
  axios
    .delete(`http://localhost:3000/tips/${id}`)
    .then((response) => {
      fetchTips(); // Refresh the tips list regardless of the previous state
    })
    .catch((error) => console.error("Error deleting tip:", error));
}
