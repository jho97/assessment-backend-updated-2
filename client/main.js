// compliment logic
const compDisplay = document.getElementById("comp-display")
const editZone = document.getElementById("edit-zone")
const addForm = document.getElementById("add-form")

const handleDisplay = arr => {
    while (compDisplay.childNodes.length > 0) {
        compDisplay.removeChild(compDisplay.lastChild)
    }
    for (let i = 0; i < arr.length; i++) {
        displayCompliments(arr[i])
    }
}

//function that takes in compliments
const displayCompliments = comp => {

//creating a div for compliments
let compContainer = document.createElement("div")
compContainer.className = "comp-container"
compContainer.innerHTML = 
`<h2>Compliment:</h2> <p>${comp.complimentText}</p>
<button id='edit-id-${comp.id}'>Edit</button>
<button id='delete-id-${comp.id}'>Delete</button>
`
compDisplay.appendChild(compContainer)

document.getElementById(`edit-id-${comp.id}`).addEventListener("click", e => {
    editCompliment(comp)
  })
  console.log(document.getElementById(`delete-id-${comp.id}`))
  document.getElementById(`delete-id-${comp.id}`).addEventListener("click", e => {
      deleteCompliment(comp.id)
  })
}
const getCompliments = () => {
    axios
    .get("http://localhost:4000/api/compliments")
    .then(res => {
        handleDisplay(res.data)
    })
    .catch(err => console.log(err))
}

const addCompliment = e => {
    e.preventDefault()

    const newCompliment = {
        complimentText: document.getElementById("new-compliment").value
    }
    axios 
    .post(`http://localhost:4000/api/compliment`, newCompliment)
    .then (res => {
        handleDisplay(res.data)
    })
    .catch(err => console.log(err))
document.getElementById("new-compliment").value = ""
}

addForm.addEventListener("submit", addCompliment)

const editCompliment = comp => {
    const editForm = document.createElement("form")
    editForm.className = 'edit-form'
    editForm.innerHTML = `<input id='compliment-input' placeholder="compliment" class="form-input" value="${comp.complimentText}"/>
    <button>save changes</button>
    `
    editZone.appendChild(editForm)
    editForm.addEventListener("submit", e => {
        e.preventDefault()
        
        let updates = {
            complimentText: document.getElementById("compliment-input").value
        }
        console.log(updates)
        axios
        .put(`http://localhost:4000/api/compliment/${comp.id}`, updates)
        .then (res => {
            editForm.remove()
            handleDisplay(res.data)
        })
        .catch(err => console.log(err))
    })
}

const deleteCompliment = id => {
    axios
    .delete(`http://localhost:4000/api/compliment/${id}`)
    .then (res => {
        handleDisplay(res.data)
    })
    .catch(err => console.log(err))
}

getCompliments()