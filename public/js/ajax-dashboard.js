document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();

            const projectId = button.dataset.id;

            try {
                const response = await fetch(`/delete-project/${projectId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    const liElement = button.closest("li");
                    if (liElement) {
                        liElement.remove();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });
    });
});
