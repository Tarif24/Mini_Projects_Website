const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = GetToDos();
UpdateToDoList();

todoForm.addEventListener('submit', function(e)
{
    e.preventDefault();
    AddToDo();
})

function AddToDo()
{
    const todoText = todoInput.value.trim();

    if (todoText.length > 0)
    {
        const todoObject = 
        {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        UpdateToDoList();
        todoInput.value = "";
    }
}

function UpdateToDoList()
{
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoindex)=>
    {
        todoItem = CreateToDoItem(todo, todoindex);
        todoListUL.append(todoItem);
    })
}

function CreateToDoItem(todo, todoIndex)
{
    const todoID = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    
    todoLI.className = "todo";
    todoLI.innerHTML = 
    `
        <input type = "checkbox" id = "${todoID}">
                <label class = "custom-checkbox" for = "${todoID}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label class = "todo-text" for = "${todoID}">
                    ${todo.text}
                </label>
                <button class = "delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    `;

    const deleteBtn = todoLI.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", ()=>
    {
        DeleteToDoItem(todoIndex);
    });

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>
    {
        allTodos[todoIndex].completed = checkbox.checked;
        SaveToDos();
    });

    checkbox.checked = todo.completed;

    return todoLI;
}

function DeleteToDoItem(todoIndex)
{
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    SaveToDos();
    UpdateToDoList();
}

function SaveToDos()
{
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function GetToDos()
{
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}