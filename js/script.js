//Selectors
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filterOption = document.querySelector(".filter-todo");
const container = document.getElementById("todo-container");
const date = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});

//Functions
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
document.getElementById("time").innerHTML = formatTime(new Date());
document.getElementById("date").innerHTML = date.getDate();
document.getElementById("day").innerHTML = days[date.getDay()];
document.getElementById("year").innerHTML = date.getFullYear();
document.getElementsByClassName("todo-time").innerHTML = formatTime(new Date());

// Adding list function
function addTodo(event) {
  // preventing from form submitting
  event.preventDefault();

  if (todoInput.value == "") {
    document.getElementById("error-msg").innerHTML = "*Can't be empty*";
  } else if (!todoInput.value == "") {
    // todo container
    document.getElementById("todo-container").style.background = "transparent";
    // Todo div
    document.getElementById("error-msg").innerHTML = "";
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    // Taking value from input
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    const todoTime = document.createElement("span");
    todoTime.classList.add("todo-time");
    todoDiv.appendChild(todoTime);
    todoTime.innerHTML = formatTime(new Date());
    // Adding to localStorage
    saveToLocal(todoInput.value);
    // completed mark button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);
    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);
    // appending list
    todoList.appendChild(todoDiv);
    // Clearing input text
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  // delete todos
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
      if ($(".todo-list").is(":empty")) {
        container.style.background = "url(assets/bg1.svg) no-repeat center";
        container.style.backgroundSize = "contain";
      }
    });
  }

  // completed todos
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    document.getElementById("todo-container").style.background = "transparent";
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
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
  });
}

function saveToLocal(todo) {
  // check if things already there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    // Taking value from input
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // completed mark button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);
    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);
    // appending list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
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

// greeting message

var hrs = date.getHours();
var greet;
if (hrs < 12) greet = "Good Morning";
else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";

document.getElementById("greeting").innerHTML = greet;

// sliding effects
ScrollReveal().reveal("#greeting", { delay: 200 });
ScrollReveal().reveal("#time", { delay: 300 });
ScrollReveal().reveal("#fullDate", { delay: 500 });

setTimeout(function () {
  $("#error-msg").fadeOut();
}, 5000);
