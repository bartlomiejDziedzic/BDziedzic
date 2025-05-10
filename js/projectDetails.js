
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');

const container = document.getElementById('projectDetails');

if (!projectId) {
    container.innerHTML = '<p>Nie podano identyfikatora projektu.</p>';
} else {
    fetch("https://api.myjson.online/v1/records/787c0fb8-d20a-4150-81ee-39af29ebc435")
        .then(res => res.json())
        .then(json => {
            const data = Array.isArray(json.data) ? json.data : Object.values(json.data);
            const project = data.find(p => String(p.id) === projectId);
            if (!project) {
                container.innerHTML = '<p>Nie znaleziono projektu o podanym identyfikatorze.</p>';
                return;
            }

            const imgSrc = project.image
                ? `img/${project.image}`
                : 'img/default.jpg';

            container.innerHTML = `
        <article class="project-detail">
        <h2 class="project-title">${project.name}</h2>
        <div class="project-content">
        <div class="image-wrapper">
          <img src="${imgSrc}"
               alt="${project.name}"
               class="project-image"/>
        </div>
        <div class="info">
          
          <p><strong>Data wykonania:</strong>
             ${project.date && project.date !== "null" ? project.date : "W trakcie realizacji"}</p>
          <p><strong>Technologie:</strong>
             ${Array.isArray(project.technologies)
                    ? project.technologies.join(", ")
                    : "Brak danych"}</p>
          <div class="long-description">
            <p>${project.long_description  || 'Brak dodatkowego opisu.'}</p>
          </div>
          </div>
        </div>
            <div class="mobile-description">
            <p>${project.long_description || 'Brak dodatkowego opisu.'}</p>
         </div>
        </article>
      `;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<p>Wystąpił błąd przy wczytywaniu danych.</p>';
        });
}
