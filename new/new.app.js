//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listenrs
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", updateCheck);
filterOption.addEventListener("change", filterTodo);

// function addEventListener(action, updateCheck) {
//       click to todoList happened
//       const PointerEvent = {
//           target: 'some target',
//       }
//       updateCheck(PointerEvent)
// }

// function forEach(callback) {
//      [1,2,3,4]
//      callback(1)
// }


//Functions
function addTodo(event) {

    //Prevent form from submitting
    event.preventDefault()

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Create INPUT
    const editTodo = document.createElement("input");
    editTodo.type = "text";
    editTodo.value = todoInput.value;
    editTodo.disabled = true;
    editTodo.classList.add("edit-todo");
    newTodo.appendChild(editTodo);

    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRUSH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Consolelog BUTTON
    const consoleButton = document.createElement("button");
    consoleButton.innerHTML = '<i class="fas fa-cog"></i>';
    consoleButton.classList.add("console-btn");
    todoDiv.appendChild(consoleButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);

    //clear Todo INPUT VALUE
    todoInput.value = ""
}



function saveLocalTodos(todo) {
    let todosList;
    if (localStorage.getItem("todos") === null) {
        todosList = [];
    } else {
        todosList = JSON.parse(localStorage.getItem("todos"));
    }
    todosList.push(todo);
    localStorage.setItem("todos", JSON.stringify(todosList));
}

function updateCheck(e) {
    console.log(e)
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    //CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }


    //Edit
    if (item.classList[0] === "console-btn") {
        const todoInput = item.parentElement?.children[0]?.children[0];

        if (todoInput !== undefined && todoInput.disabled === true) {
            todoInput.disabled = false;
        }
        else {
            const inputElements = document.querySelectorAll('.edit-todo');
            const inputValues = [...inputElements].map(input => input.value);

            resaveLocalTodos(inputValues);
            todoInput.disabled = true;

        }
    }
}


// //CONSOLE 
// if (item.classList[0] === "console-btn") {
//     console.log("Click?????????");

// }


//?????????????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(
        function (todo) { //CALLBACK???
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    );
}

function getTodos() {
    //CHECK---HEY do i already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todoFromLocalStorage) {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Create INPUT
        const editTodo = document.createElement("input");
        editTodo.type = "text";
        editTodo.value = todoFromLocalStorage;
        editTodo.disabled = true;
        editTodo.classList.add("edit-todo");
        newTodo.appendChild(editTodo);
        //CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //CHECK trash BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //EDIT BUTTON
        const consoleButton = document.createElement("button");
        consoleButton.innerHTML = '<i class="fas fa-cog"></i>';
        consoleButton.classList.add("console-btn");
        todoDiv.appendChild(consoleButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    //CHECK---HEY  do i already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function resaveLocalTodos(newValues) {
    let oldValues = JSON.parse(localStorage.getItem("todos"))

    const diff = newValues.filter(n => oldValues.findIndex(o => o === n) === -1);

    if (!diff.length) return;

    let targetIdx;
    oldValues.forEach((o, i) => {
        if (newValues.indexOf(o) === -1) {
            targetIdx = i
        }
    })

    oldValues[targetIdx] = diff[0]

    // console.log(oldValues)
    localStorage.setItem("todos", JSON.stringify(oldValues));
}
// 3???todosList??????????????????????????????????????????????????????????????????????????????


// localStorage.setItem("todos", JSON.stringify(todosList));//json.?????????????????????????????????????????????????????????????????????????????????
//setItem ??????????????????or?????????????????????localstorage???????????????

//"todos"??????????????????????????????????????????????????????????????????
//}

//                   JSON.stringify(data)??????
//                       =======>
// Browser(Chrome??????)              LocalStorage
//                       <=======
//                   JSON.parse(data)??????
