const dateNumber = document.getElementById('dateNumber')
const dateMonth = document.getElementById('dateMonth')
const dateYear = document.getElementById('dateYear')
const dateTask = document.getElementById("date-input")
const arrayTask = []
const options = {
   year: "numeric",
   month: "2-digit",
   day: "2-digit"
}

let taskStorage = localStorage.getItem('tareas')
taskStorage = JSON.parse(taskStorage)

let tasksContainer = document.getElementById ('tasksContainer') 

const setDate = () => {
   const date = new Date()
   dateNumber.textContent = date.toLocaleString('es', {day:'numeric'}) 
   dateMonth.textContent = date.toLocaleString('es', {month:'short'})
   dateYear.textContent = date.toLocaleString('es', {year:'numeric'})
}

const addNewTask = event => {
   event.preventDefault() 
   const {value} = event.target.taskText 
   if (!value) return 
   // armado del div vacio
   const task = document.createElement('div')
   task.classList.add('task')
   const hecho = false
   task.addEventListener('click', changeTaskState)
   // agregar nodos
   const fecha = new Date(document.getElementById("date-input").value).toLocaleDateString('es-AR', {timeZone: 'UTC'})
   task.fecha = fecha.toLocaleString('es-AR', options)
   task.textContent = value + ' ' + fecha
   tasksContainer.prepend(task) 
   arrayTask.push(value + ' ' + fecha)
   localStorage.setItem('tareas', JSON.stringify(arrayTask))
   event.target.reset() 
}
const changeTaskState = event => {
   event.target.classList.toggle('done')
}

const order = () => {
   const done = []
   const toDo = []
   tasksContainer.childNodes.forEach ( el => {
      if(el.classList.contains('done')){
         done.push(el) 
      } else{
         toDo.push(el)
      } 
   }) 
   return [...toDo, ...done] 
}
const renderOrderedTasks = () => {
   order().forEach(el => tasksContainer.appendChild(el))
}

if(taskStorage){
   function renderTask (arrayTask) {
      arrayTask.forEach(task => {
         const tareasDiv = document.createElement('div')
         tareasDiv.classList.add('task')
         tareasDiv.addEventListener('click', changeTaskState)
         tareasDiv.textContent = `${task}`
         tasksContainer.appendChild(tareasDiv)
      })
   }
   renderTask(taskStorage)
}
setDate()