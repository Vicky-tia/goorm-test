const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todo = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    const box = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    todo.unshift(box);

    const { boxEl, inputEl } = createTodoElement(box);

    list.prepend(boxEl);

    inputEl.removeAttribute("disabled");
    inputEl.focus();

    saveToLocalStorage();
}

function createTodoElement(box) {
    const boxEl = document.createElement('div');
    boxEl.classList.add('box');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = box.complete;

    if (box.complete) {
        boxEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = "text";
    inputEl.value = box.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = "remove_circle";

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    boxEl.append(checkbox);
    boxEl.append(inputEl);
    boxEl.append(actionsEl);

    checkbox.addEventListener("change", () => {
        box.complete = checkbox.checked;

        if(box.complete) {
            boxEl.classList.add("complete");
        } else {
            boxEl.classList.remove("complete");
        }

        saveToLocalStorage();
    });

    inputEl.addEventListener("input", () => {
        box.text = inputEl.value;
    });

    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");
        saveToLocalStorage();
    });
    editBtnEl.addEventListener("click", () => {
		inputEl.removeAttribute("disabled");
		inputEl.focus();
	});

	removeBtnEl.addEventListener("click", () => {
        todo = todo.filter(t =>t.id != box.id);
        boxEl.remove();
        saveToLocalStorage();
    });

    return { boxEl, inputEl, editBtnEl, removeBtnEl }
}

function displayTodos() {
    loadFromLocalStorage();

    for (let i = 0; i < todo.length; i++) {
        const box = todo[i];

        const {boxEl} = createTodoElement(box);

        list.append(boxEl);
    }
}

displayTodos();

function saveToLocalStorage() {
    const data = JSON.stringify(todo);

    localStorage.setItem('todo', data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("todo");

    if(data) {
        todo = JSON.parse(data);
    }
}