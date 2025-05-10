const sortSelect     = document.getElementById("sortSelect");
const filterControls = document.getElementById("filterControls");
const tbody          = document.querySelector("#projectsTable tbody");
const cardsContainer = document.getElementById("projectsCards");

let projectsData = [];
let selectedTech = new Set()


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
        //odnosnik
        row.style.cursor = "pointer";
        row.addEventListener("click", () => {
            window.location.href = `projectDetails.html?id=${encodeURIComponent(project.id)}`;
        });

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

        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            window.location.href = `projectDetails.html?id=${encodeURIComponent(project.id)}`;
        });
    });

    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
        window.location.href = `projectDetails.html?id=${encodeURIComponent(project.id)}`;
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
function sortArray(arr, criteria, order) {
    return [...arr].sort((a, b) => {
        if (criteria === "name") {
            return order==="asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else {
            const toTs = d => {
                if (!d || d==="null") return order==="asc"
                    ? Date.now()+1e15
                    : 0;
                return new Date(d).getTime();
            };
            return order==="asc"
                ? toTs(a.date) - toTs(b.date)
                : toTs(b.date) - toTs(a.date);
        }
    });
}

function applyFiltersAndSort() {
    let filtered = projectsData.filter(p => {
        // jeśli nic nie zaznaczone – pokazuj wszystko
        if (selectedTech.size === 0) return true;
        if (!Array.isArray(p.technologies)) return false;
        // muszą zawierać wszystkie wybrane technologie
        return [...selectedTech].some(tech => p.technologies.includes(tech));
    });
    const [crit, ord] = sortSelect.value.split("-");
    const sorted = sortArray(filtered, crit, ord);
    renderProjects(sorted);
}


fetch("https://api.myjson.online/v1/records/787c0fb8-d20a-4150-81ee-39af29ebc435", {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
    redirect: 'follow'
})
    .then(res => res.json())
    .then(json => {
        projectsData = Array.isArray(json.data)
            ? json.data
            : Object.values(json.data);

        const techSet = new Set();
        projectsData.forEach(p => {
            if (Array.isArray(p.technologies))
                p.technologies.forEach(t => techSet.add(t));
        });

        techSet.forEach(tech => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.classList.add("tech-btn");
            btn.textContent = tech;
            btn.dataset.tech = tech;
            filterControls.appendChild(btn);

            btn.addEventListener("click", () => {
                const t = btn.dataset.tech;
                if (selectedTech.has(t)) {
                    selectedTech.delete(t);
                    btn.classList.remove("active");
                } else {
                    selectedTech.add(t);
                    btn.classList.add("active");
                }
                applyFiltersAndSort();
            });
        });

        applyFiltersAndSort();
    })
    .catch(err => console.error(err));

sortSelect.addEventListener("change", applyFiltersAndSort);
