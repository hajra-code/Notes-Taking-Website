// ===========================
// SELECT ELEMENTS
// ===========================

const titleInput = document.getElementById("noteTitle");
const noteInput = document.getElementById("noteText");
const addBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");
const charCount = document.getElementById("charCount");

// ===========================
// CHARACTER COUNTER
// ===========================

noteInput.addEventListener("input", () => {
    charCount.textContent = `Characters: ${noteInput.value.length}`;
});

// ===========================
// LOCAL STORAGE
// ===========================

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// ===========================
// DISPLAY NOTES
// ===========================

function displayNotes() {

    notesContainer.innerHTML = "";

    if (notes.length === 0) {
        notesContainer.innerHTML =
            `<p class="empty-message">No notes available. Add your first note!</p>`;
        return;
    }

    notes.forEach((note, index) => {

        const card = document.createElement("div");
        card.classList.add("note-card");

        card.innerHTML = `
            <h3>${note.title}</h3>

            <p>${note.text}</p>

            <div class="note-date">
                ${note.date}
            </div>

            <div class="note-buttons">

                <button class="edit-btn"
                    onclick="editNote(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteNote(${index})">
                    Delete
                </button>

            </div>
        `;

        notesContainer.appendChild(card);

    });

}

// ===========================
// ADD NOTE
// ===========================

addBtn.addEventListener("click", () => {

    const title = titleInput.value.trim();
    const text = noteInput.value.trim();

    if (title === "" || text === "") {

        alert("Please enter both title and note.");

        return;
    }

    const today = new Date();

    const newNote = {

        title: title,

        text: text,

        date: today.toLocaleString()

    };

    notes.unshift(newNote);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();

    titleInput.value = "";
    noteInput.value = "";
    charCount.textContent = "Characters: 0";

});

// ===========================
// DELETE NOTE
// ===========================

function deleteNote(index) {

    if (confirm("Delete this note?")) {

        notes.splice(index, 1);

        localStorage.setItem("notes", JSON.stringify(notes));

        displayNotes();

    }

}

// ===========================
// EDIT NOTE
// ===========================

function editNote(index) {

    titleInput.value = notes[index].title;

    noteInput.value = notes[index].text;

    charCount.textContent =
        `Characters: ${noteInput.value.length}`;

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();

}

// ===========================
// SEARCH NOTES
// ===========================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".note-card");

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

});

// ===========================
// LOAD NOTES
// ===========================

displayNotes();

// ===========================
// FOOTER YEAR
// ===========================

document.querySelector("footer p").innerHTML =
`© ${new Date().getFullYear()} Notes Taking Website | HTML • CSS • JavaScript`;