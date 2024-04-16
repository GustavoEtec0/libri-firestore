let livrosList = document.querySelector("#book-list");
function renderbook(doc) {
  let li = document.createElement("li");
  let titulo = document.createElement("span");
  let autor = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  titulo.textContent = doc.data().titulo;
  autor.textContent = doc.data().autor;

  //adicionando dos dados de autor e titulo na tag

  li.appendChild(titulo);
  li.appendChild(autor);
  livrosList.appendChild(li);
}

db.collection("libri-data")
  .get()
  .then((snepshot) => {
    snepshot.docs.forEach((doc) => {
      console.log(doc.data(), " teste");
      renderbook(doc);
    });
  });

const form = document.querySelector("#add-book-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("app-libri-gustavo")
    .add({
      autor: form.autor.value,
      livro: form.livro.value,
    })
    .then(() => {
      form.autor.value = "";
      form.livro.value = "";
      window.location.reload();
    });
});
