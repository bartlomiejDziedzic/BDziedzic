// Ustawienia nagłówków żądania
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://api.myjson.online/v1/records/787c0fb8-d20a-4150-81ee-39af29ebc435", requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log("Odebrane dane:", data.data);
    //mój najwiekszy bład, zostanie ze mną do konca
        data=data.data;

        let projects = Array.isArray(data) ? data : Object.values(data);

        const tbody = document.querySelector("#projectsTable tbody");
        const cardsContainer = document.getElementById("projectsCards");

        projects.forEach(project => {
            //towrzenie tabeli
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = project.name;
            row.appendChild(nameCell);


            const dateCell = document.createElement("td");
            if (project.date === "null" || project.date === null) {
                dateCell.textContent = "W trakcie realizacji";
            } else {
                dateCell.textContent = project.date;
            }
            row.appendChild(dateCell);

            // Komórka dla opisu
            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = project.description;
            row.appendChild(descriptionCell);

            const techCell = document.createElement("td");
            if (Array.isArray(project.technologies)) {
                techCell.textContent = project.technologies.join(", ");
            } else {
                techCell.textContent = "Brak danych";
            }
            row.appendChild(techCell);

            // Dodanie wiersza do tabeli
            tbody.appendChild(row);
            //tworzenie kart
            const card = document.createElement('div');
            card.classList.add('card');

            const title = document.createElement('h3');
            title.textContent = project.name;
            card.appendChild(title);

            const date = document.createElement('p');
            date.textContent = project.date && project.date !== "null"
                ? project.date
                : "W trakcie realizacji";
            card.appendChild(date);

            const desc = document.createElement('p');
            desc.textContent = project.description;
            card.appendChild(desc);

            const tech = document.createElement('p');
            tech.textContent = Array.isArray(project.technologies)
                ? project.technologies.join(', ')
                : 'Brak danych';
            card.appendChild(tech);

            cardsContainer.appendChild(card);
        });
    })
    .catch(error => console.log('error', error));
