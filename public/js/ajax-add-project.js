document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form.add-project");
    const projectsList = document.querySelector("ul.dashboard-projects");

    if (!form || !projectsList) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/add-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                return;
            }

            const result = await response.json();
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="dashboard-project">
                    <a href="/project/${result.project._id}">
                        ${result.project.name} &nearr;
                    </a>
                    <div class="dashboard-project-controls">
                        <a href="/edit-project/${result.project._id}" class="dashboard-btn btn">Edit</a>
                        <button class="dashboard-btn btn delete-btn" data-id="${result.project._id}">Delete</button>
                    </div>
                </div>
            `;

            projectsList.appendChild(li);
            form.reset();

            // alert(result.message);

        } catch (error) {
            console.error(error);
        }
    });
});
