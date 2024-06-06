const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
  attachEventListeners();
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "image/delete.png";
  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);
  attachEventListeners();
  updateStorage();
});

function attachEventListeners() {
  let notes = document.querySelectorAll(".input-box");
  notes.forEach((nt) => {
    nt.addEventListener("keyup", () => {
      updateStorage();
    });
    nt.querySelector("img").addEventListener("click", (e) => {
      e.target.parentElement.remove();
      updateStorage();
    });
  });
}

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.className === "input-box") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.addEventListener("keyup", () => {
        updateStorage();
      });
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement.isContentEditable) {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

showNotes();
