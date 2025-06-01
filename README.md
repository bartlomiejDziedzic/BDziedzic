# Dokumentacja Portfolio

## Wstęp
Portfolio prezentuje moje umiejętności zdobyte na kierunku Inżynieria Informatyki w Akademii Tarnowskiej oraz z innych zródeł. Strona ma prosty, responsywny układ, by wygodnie oglądać ją na komputerze i urządzeniach mobilnych. Zawiera: stronę główną (“O mnie”), sekcję umiejętności, listę projektów, szczegóły projektu oraz galerię obrazów.

## Opis struktury serwisu

1. **index.html**
    - Strona główna: nagłówek, nawigacja (dynamiczna przez `nav.js`), sekcje „O mnie”, „O tym projekcie” i „Kontakt”. Odwołuje się do `style/style.css` i `js/nav.js`.

2. **about.html**
    - Lista umiejętności: Frontend, BackEnd, Inne. Korzysta z tego samego CSS i `nav.js`.

3. **projects.html**
    - Wyświetla tabelę projektów oraz (na mniejszych ekranach) karty. Sortowanie i filtrowanie według technologii realizuje `js/projects.js`. Kliknięcie przenosi do `projectDetails.html?id=<id>`.

4. **projectDetails.html**
    - Pojedynczy projekt – na podstawie parametru `id` pobiera dane z JSON API i wyświetla tytuł, opis, obraz i technologie.

5. **gallery.html**
    - Galeria obrazów użytych w projektach. Skrypt `js/gallery.js` generuje układ w CSS Grid z efektem powiększenia i podpisem przy hoverze.

6. **style/style.css**
    - Cały wygląd: paleta kolorów, flexbox i grid, responsywność (media queries dla tabletów i telefonów), style nawigacji, tabel, kart i galerii.

7. **js/nav.js**
    - Generuje wspólną nawigację w każdej podstronie, podświetla aktywny link.

8. **js/projects.js**
    - Pobiera listę projektów z zewnętrznego API (`myjson.online`), tworzy wiersze tabeli i karty, obsługuje sortowanie i filtrowanie po technologiach.

9. **js/gallery.js**
    - Ładuje obrazy do galerii, tworzy kontenery `<figure>` z klasami CSS do efektów przy hoverze.

10. **projectDetails.json**
    - Skrypt JavaScript do szczegółów projektu, podobny do `projects.js`, ale skupiony na jednej pozycji.

## Opis technologii zastosowanych
- **HTML5**: semantyczne znaczniki (`<header>`, `<nav>`, `<main>`, `<footer>`, `<figure>`, `<figcaption>`), meta tagi (UTF-8, viewport, Open Graph).
- **CSS3**:
    - Kolorystyka: `#f2efe7`, `#d8d2dc`, `#8b8392`, `#ee7e49`, `#2c0c24`.
    - Flexbox i Grid do układów (sekcja umiejętności, galeria).
    - Media queries: dla szerokości ≥768px i ≤1023px oraz ≤767px, zmieniać układ nawigacji, ukrywać tabelę na małych ekranach, wyświetlać karty.
    - Efekty hover (galeria, nawigacja, przyciski filtrów).

- **JavaScript (ES6+)**:
    - `nav.js`: buduje i podświetla menu.
    - `projects.js`:
        - Fetch JSON z API, przekształca dane na tabelę i karty.
        - Funkcja `sortArray` sortuje po nazwie lub dacie (projekty w trakcie realizacji).
        - Filtruje według wybranych technologii (przyciski `.tech-btn` z klasami `active`).
    - `projectDetails.html` + `projectDetails.json`: wyświetla szczegóły projektu na podstawie `id`.
    - `gallery.js`: generuje elementy galerii, obsługuje efekty powiększenia i podpisów.

- **JSON API**: zdalne źródło danych projektów (np. myjson.online), łatwa aktualizacja portfolio bez zmiany HTML.

- **Responsywność i UX**:
    - Ukrywanie tabeli na urządzeniach mobilnych, wyświetlanie kart.
    - Efekty powiększenia i obrotu obrazów w galerii.
    - Nawigacja w gridzie na telefonach.

## Podsumowanie
Portfolio zostało zbudowane w czystym HTML/CSS/JS, bez zewnętrznych frameworków. Kluczowe cechy:
- **Prosta struktura** plików i katalogów, oddzielenie stylów i skryptów.
- **Responsywność** dzięki flexboxowi, CSS Grid i media queries.
- **Dynamiczne ładowanie danych** z JSON API pozwala na łatwe dodawanie/aktualizowanie projektów.
- **Interakcje**: sortowanie, filtrowanie, kliknięcie w projekt przenosi do szczegółów, galeria z efektami hover.

Całość jest lekka, łatwa w utrzymaniu i rozbudowie – wystarczy edytować źródło JSON lub dodać pliki obrazów w katalogu `img/`.```
