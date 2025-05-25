document.addEventListener("DOMContentLoaded", () => {
  const requestsList = document.querySelector("ul.requests-list");
  if (!requestsList) return;

  requestsList.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.classList.contains("requests-btn")) {
      e.preventDefault();

      const requestId = target.dataset.id;
      if (!requestId) return;

      try {
        const response = await fetch(`/delete-request/${requestId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const liElement = target.closest("li");
          if (liElement) {
            liElement.remove();
          }
        } else {
          console.log(error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
});
