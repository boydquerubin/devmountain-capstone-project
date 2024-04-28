document.addEventListener("DOMContentLoaded", function () {
  let tipsFetched = false; // Initialize state to track if tips have been fetched

  document.getElementById("getTips").addEventListener("click", function () {
    if (!tipsFetched) {
      fetchTips();
      tipsFetched = true; // Update state to indicate tips have been fetched
    }
  });
  document.getElementById("addNewTip").addEventListener("click", addTip);
});

function fetchTips() {
  axios
    .get("http://localhost:3000/tips")
    .then((response) => {
      const tips = response.data;
      const tipsList = document.getElementById("tipsList");
      // tipsList.innerHTML = ""; // Clear existing tips
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
  event.preventDefault(); // Prevent default form submission if within a form
  const tipText = prompt("Enter a new money saving tip:");
  if (tipText) {
    axios
      .post("http://localhost:3000/tips", { text: tipText })
      .then((response) => {
        if (tipsFetched) {
          // Only refresh if tips have already been fetched
          console.log("addTip", fetchTips);
          fetchTips();
        }
      })
      .catch((error) => console.error("Error adding tip:", error));
  }
}

function updateTip(id, text) {
  axios
    .put(`http://localhost:3000/tips/${id}`, { text: text })
    .then((response) => {
      if (tipsFetched) {
        // Only refresh if tips have already been fetched
        // console.log("updateTip", fetchTips);
        fetchTips();
      }
    })
    .catch((error) => console.error("Error updating tip:", error));
}

function deleteTip(id) {
  axios
    .delete(`http://localhost:3000/tips/${id}`)
    .then((response) => {
      if (tipsFetched) {
        // Only refresh if tips have already been fetched
        // console.log("deleteTip", fetchTips);
        fetchTips();
      }
    })
    .catch((error) => console.error("Error deleting tip:", error));
}
