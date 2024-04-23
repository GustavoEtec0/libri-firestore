let titulosList = document.querySelector('#book-list')
function renderbook(doc) {
    let li = document.createElement('li')
    let titulo = document.createElement('span')
    let autor = document.createElement('span')
    let excluir = document.createElement('div')

    excluir.textContent = 'x'

    li.setAttribute('data-id', doc.id)
    titulo.textContent = doc.data().titulo
    autor.textContent = doc.data().autor

    //adicionando dos dados de autor e titulo na tag

    li.appendChild(titulo)
    li.appendChild(autor)
    li.appendChild(excluir)
    //Trava açao no click do botao x pra exclusao do arquivo
    excluir.addEventListener('click', (event) => {
        event.stopPropagation()
        let id = event.target.parentElement.getAttribute('data-id')
        // alert(id)
        db.collection('libri-data')
            .doc(id)
            .delete()
            .then(() => {
                window.location.reload()
            })
    })
    titulosList.appendChild(li)
}

db.collection('libri-data')
    .get()
    .then((snepshot) => {
        snepshot.docs.forEach((doc) => {
            console.log(doc.data(), ' teste')
            renderbook(doc)
        })
    })

const form = document.querySelector('#add-book-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    db.collection('libri-data')
        .add({
            autor: form.autor.value,
            titulo: form.titulo.value,
        })
        .then(() => {
            form.autor.value = ''
            form.titulo.value = ''
            window.location.reload()
        })
})
