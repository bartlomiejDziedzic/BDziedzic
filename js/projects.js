const sortSelect = document.getElementById("sortSelect");
const tbody = document.querySelector("#projectsTable tbody");
const cardsContainer = document.getElementById("projectsCards");

let projectsData = [];


function renderProjects(projects) {

    tbody.innerHTML = "";
    cardsContainer.innerHTML = "";

    projects.forEach(project => {
        const row = document.createElement("tr");
        // nazwa
        const nameCell = document.createElement("td");
        nameCell.textContent = project.name;
        row.appendChild(nameCell);
        // data
        const dateCell = document.createElement("td");
        dateCell.textContent = (project.date && project.date !== "null")
            ? project.date
            : "W trakcie realizacji";
        row.appendChild(dateCell);
        // opis
        const descCell = document.createElement("td");
        descCell.textContent = project.description;
        row.appendChild(descCell);
        // technologie
        const techCell = document.createElement("td");
        techCell.textContent = Array.isArray(project.technologies)
            ? project.technologies.join(", ")
            : "Brak danych";
        row.appendChild(techCell);
        tbody.appendChild(row);

        // KARTA
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
      <h3>${project.name}</h3>
      <p>${(project.date && project.date !== "null") ? project.date : "W trakcie realizacji"}</p>
      <p>${project.description}</p>
      <p>${Array.isArray(project.technologies) ? project.technologies.join(", ") : "Brak danych"}</p>
    `;
        cardsContainer.appendChild(card);
    });
}

// Fetch i inicjalne wyświetlenie
fetch("https://api.myjson.online/v1/records/787c0fb8-d20a-4150-81ee-39af29ebc435", {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
    redirect: 'follow'
})
    .then(res => res.json())
    .then(json => {
        let data = Array.isArray(json.data) ? json.data : Object.values(json.data);
        projectsData = data;
        renderProjects(projectsData);
    })
    .catch(err => console.error(err));

// Funkcja do sortowania
function sortProjects(criteria, order) {
    const sorted = [...projectsData].sort((a, b) => {
        if (criteria === "name") {
            return order === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (criteria === "date") {

            const getTime = d => {
                if (!d || d === "null") return order === "asc"
                    ? Date.now() + 10**15
                    : 0;
                return new Date(d).getTime();
            };
            return order === "asc"
                ? getTime(a.date) - getTime(b.date)
                : getTime(b.date) - getTime(a.date);
        }
    });
    renderProjects(sorted);
}

sortSelect.addEventListener("change", () => {
    const [crit, ord] = sortSelect.value.split("-");
    sortProjects(crit, ord);
});
