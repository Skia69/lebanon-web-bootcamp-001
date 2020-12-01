//Current date
const date = document.getElementById("today-date");
const today = new Date();
options = { weekday: "long", month: "short", day: "numeric" };
date.innerHTML = today.toLocaleDateString("en-US", options);
//Set current date as default date for the datepicker
document.getElementById("datePicker").valueAsDate = new Date();

//Selectors
const form = document.getElementById("form");
const textInput = document.querySelector("input[type='text']");
const dateInput = document.querySelector("input[type='date']");
const submitButton = document.getElementById("submitButton");
const todoList = document.querySelector("ul");
const select = document.getElementById("select");

//Trim the input value so spaces on the boundaries are eliminated
const textInputValue = textInput.value.trim();

//Functions
//Render the todoList
const renderHTML = () => {
  let backgroundColor = checkDate(dateInput.value);
  const todoItem = `<li class="todo ${backgroundColor}">
                        <input type="checkbox" class="checkbox">
                        <div class="description">
                            <p class="description-title">${textInput.value}</p>
                            <p class="description-subtitle" id="description"><span>${dateInput.value}</span> <span class="${select.value}">${select.value}</span><span class="${select.value}">priority</span></p>
                        </div>
                        <i class="fas fa-edit edit"></i>
                        <i class="far fa-trash-alt delete"></i>
                    </li>`;
  // todoList.innerHTML += todoItem;
  todoList.insertAdjacentHTML("afterbegin", todoItem);
};

//Add a todo
const addTodo = (e) => {
  e.preventDefault();
  let formEl = document.getElementById("form");
  if (!form.checkValidity()) {
    formEl.reportValidity();
    return;
  }

  renderHTML();
  form.reset();
  document.getElementById("datePicker").valueAsDate = new Date();
};

//Delete a todo
const deleteTodos = (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
};

//Edit a todo

//not finished yet but it's doing the job
const editTodo = (e) => {
  if (e.target.classList.contains("edit")) {
    let paragraphs_list = e.target.previousElementSibling.children;
    console.log(e.target.parentElement.innerHTML);
    textInput.value = paragraphs_list[0].innerText;
    textInput.focus();

    dateInput.value = paragraphs_list[1].children[0].innerText;
    select.value = paragraphs_list[1].children[1].innerText;

    //animate  using css transtion property
    e.target.parentElement.style.opacity = "0";
    e.target.parentElement.style.transform = "translate(0,-160px)";

    //delay  before removing
    setTimeout(() => {
      e.target.parentElement.remove();
    }, 1000);
  }
};

//Check a todo
const checkTodo = (e) => {
  if (e.target.classList.contains("checkbox")) {
    e.target.nextElementSibling.classList.toggle("completed");
  }
};

//Check date
const checkDate = (deadline) => {
  let deadlineDate = new Date(deadline);
  let todayDate = new Date();

  if (todayDate > deadlineDate) {
    return "bg-red";
  } else {
    return "";
  }
};

//Event listeners
form.addEventListener("submit", addTodo);
submitButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkTodo);
todoList.addEventListener("click", deleteTodos);
todoList.addEventListener("click", editTodo);
