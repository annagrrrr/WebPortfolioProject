document.addEventListener("DOMContentLoaded", () => {
    const projectsWrapper = document.querySelector(".dashboard-projects-wrapper");
    document.querySelectorAll(".dashboard-projects li").forEach(li => {
        const editBtn = li.querySelector(".edit-btn");
        const form = li.querySelector(".project-edit-form");
        const view = li.querySelector(".project-view");
        const saveBtn = form.querySelector(".save-btn");
        const cancelBtn = form.querySelector(".cancel-btn");

        editBtn.addEventListener("click", () => {
            view.classList.add("hidden");
            form.classList.remove("hidden");
        });
        li.addEventListener("dblclick", () => {
            view.classList.add("hidden");
            form.classList.remove("hidden");
        });
        cancelBtn.addEventListener("click", () => {
            form.classList.add("hidden");
            view.classList.remove("hidden");
        });
        saveBtn.addEventListener("click", async () => {
            const projectId = li.dataset.id;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const oldName = view.querySelector(".project-name").textContent;
            const oldDesc = view.querySelector(".project-description").textContent;
            const oldInfo = view.querySelector(".project-additionalinfo").textContent;
            const oldCover = view.querySelector("img").src;

            try {
                const response = await fetch(`/edit-project/${projectId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const updatedProject = await response.json(); 
                    view.querySelector(".project-name").textContent = updatedProject.name;
                    view.querySelector(".project-description").textContent = updatedProject.description;
                    view.querySelector(".project-additionalinfo").textContent = updatedProject.additionalinfo;
                    view.querySelector("img").src = updatedProject.cover;

                    const oldContainer = view.parentElement.querySelector(".old-project-data");
                    oldContainer.querySelector(".old-name").textContent = `${oldName}`;
                    oldContainer.querySelector(".old-description").textContent = `${oldDesc}`;
                    oldContainer.querySelector(".old-additionalinfo").textContent = `${oldInfo}`;
                    oldContainer.querySelector(".old-cover").src = oldCover;
                    oldContainer.classList.remove("hidden");

                    form.classList.add("hidden");
                    view.classList.remove("hidden");
                } else {
                    const error = await response.text();
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        });
    });
});