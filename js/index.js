const dateNumber = document.getElementById('dateNumber')
const dateMonth = document.getElementById('dateMonth')
const dateYear = document.getElementById('dateYear')
const dateTask = document.getElementById("date-input")
let tasksContainer = document.getElementById ('tasksContainer') 
let taskStorage = []
const options = {
   year: "numeric",
   month: "2-digit",
   day: "2-digit"
}

if(localStorage.getItem('tareas')!== null){
   taskStorage = localStorage.getItem('tareas')
   taskStorage = JSON.parse(taskStorage)
}

const setDate = () => {
   const date = new Date()
   dateNumber.textContent = date.toLocaleString('es', {day:'numeric'}) 
   dateMonth.textContent = date.toLocaleString('es', {month:'short'})
   dateYear.textContent = date.toLocaleString('es', {year:'numeric'})
}

const addNewTask = event => {
   event.preventDefault() 
   let lastId = 0;
   taskStorage.forEach(task => {
      if (task.id >= lastId){
         lastId = task.id + 1
      }
   })
   const taskObj = {
      "id": lastId,
      "tarea": event.target.taskText.value,
      "date": event.target.taskDate.value,
      "done": false
   }
   if (!taskObj.tarea) return 

   // armado del div vacio
   const task = document.createElement('div')
   task.classList.add('task')
   task.addEventListener('click', changeTaskState)

   // agregar nodos
   taskObj.date = new Date(document.getElementById("date-input").value).toLocaleDateString('es-AR', {timeZone: 'UTC'})
   task.id = `${taskObj.id}`
   task.innerHTML = `${taskObj.tarea} ${taskObj.date}`
   tasksContainer.prepend(task) 
   taskStorage.push(taskObj)
   localStorage.setItem('tareas', JSON.stringify(taskStorage))
   event.target.reset() 
}

const changeTaskState = event => {
   event.target.classList.toggle('done')
   let taskId = event.target.id 
   let taskIndex = taskStorage.findIndex(task => task.id == taskId)
   if (taskStorage[taskIndex].done) {
      taskStorage[taskIndex].done = false
   }else{
      taskStorage[taskIndex].done = true
   }
   localStorage.setItem('tareas', JSON.stringify(taskStorage)) // guardo los datos modificados
}

const cargaFormulario = document.getElementById("cargaFormulario")
cargaFormulario.addEventListener("submit", addNewTask)

const eliminaTarea = event => {
   Swal.fire({
      title: "Desea eliminar las tareas realizadas?",
      showDenyButton: true,
      confirmButtonText: "Eliminar todas",
      denyButtonText: "Cancelar"
   }).then((result) => {
      if(result.isConfirmed){
         let listTask = taskStorage.filter((task) => {
            if(task.done){
               return false
            }
            return true
         })
         taskStorage = listTask
         localStorage.setItem('tareas', JSON.stringify(taskStorage))
         tasksContainer.innerHTML=""
         renderTask(taskStorage)
         Swal.fire("Se eliminaron las tareas realizadas!")
      }
   })
}
const confirmaElimina = () =>{

}
const btnElimina = document.getElementById("btnElimina")
btnElimina.addEventListener('click', eliminaTarea)

const limpiaTareas = () => {
   cargaFormulario.reset
   localStorage.clear()
   taskStorage = []
   tasksContainer.innerHTML = ""
} 
btnLimpia.addEventListener('click', limpiaTareas)

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
const btnOrdena = document.getElementById("btnOrdena")
btnOrdena.addEventListener("click", renderOrderedTasks)

function renderTask (arrayTask) {
   arrayTask.forEach(task => {
      const tareasDiv = document.createElement('div')
      tareasDiv.classList.add('task')
      tareasDiv.id = `${task.id}`
      tareasDiv.addEventListener('click', changeTaskState)
      tareasDiv.textContent = `${task.tarea} ${task.date}`
      tasksContainer.appendChild(tareasDiv)
   })
}
   
if(taskStorage){
   renderTask(taskStorage)
}
setDate()



