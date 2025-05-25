document.addEventListener("DOMContentLoaded", () => {
    const projectsList = document.querySelector("ul.dashboard-projects");
    if (!projectsList) return;

    projectsList.addEventListener("click", async (e) => {
        const target = e.target;
        if (target.classList.contains("delete-btn")) {
            e.preventDefault();

            const projectId = target.dataset.id;
            if (!projectId) return;

            try {
                const response = await fetch(`/delete-project/${projectId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    const liElement = target.closest("li");
                    if (liElement) {
                        liElement.remove();
                    }
                } else {
                    console.error("error!!!");
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
});
