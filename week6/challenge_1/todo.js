import {
    qs,
    writesToLS,
    readFromLS,
    bindTouch
} from "./utils.js";

let liveToDos = null;

function renderList(list, element, toDos, hidden) {
    console.log(list);
    element.innerHTML = "";

    list.forEach(toDo => {
        const item = document.createElement("li");
        const formattedDate = new Date(toDo.id).toLocaleDateString('en-US');

        let cb = null;
        let btn = null;

        if (hidden && toDo.completed) {
            item.innerHTML = '<label><input type ="checkbox" checked> <strike>' + toDo.content + '</strike></label><button>X</button>';
        } else {
            item.innerHTML = '<label><input type ="checkbox">' + toDo.content + '</label><button>X</button>';
        }

        cb = item.childNodes[0].childNodes[0];

        if (cb) {
            cb.addEventListener("change", function () {
                toDos.completeToDo(toDo.id);
            });
        }

        btn = item.childNodes[1];
        if (btn) {
            btn.addEventListener("click", function () {
                toDos.removeToDo(toDo.id);
            });
        }

        element.appendChild(item);
    });
}

function getToDos(key) {
    if (liveToDos === null) {
        liveToDos = readFromLS(key) || [];
    }
    return liveToDos;
}

function addToDo(value, key) {
    const newToDo = {
        id: new Date(),
        content: value,
        completed: false
    };

    liveToDos.push(newToDo);
    writesToLS(key, liveToDos);
}

function deleteToDo(key) {
    let newList = liveToDos.filter(item => item.id != key);
    liveToDos = newList;
    writesToLS(key, liveToDos);
}

function filterToDos(key, completed) {
    let toDos = getToDos(key);

    return toDos.filter(item => item.completed === completed);
}


export default class ToDos {
    constructor(listElement, key) {
        this.listElement = listElement;
        console.log(this);
        this.key = key;

        bindTouch("#addToDo", this.newToDo.bind(this));
        bindTouch("#allToDo", this.allToDo.bind(this));
        bindTouch("#activeToDo", this.activeToDo.bind(this));
        bindTouch("#compToDo", this.compToDo.bind(this));
        this.listToDos();
    }

    newToDo() {
        const task = document.getElementById("todoInput");
        addToDo(task.value, this.key);
        task.value = "";
        this.listToDos();
    }

    findTodo(id) {
        let toDo = liveToDos.find(element => {
            return element.id === id;
        });
        return toDo;
    }

    completeToDo(id) {
        console.log(id + "checked");
        let toDo = this.findTodo(id);

        if (toDo) {
            toDo.completed = !toDo.completed;
            writesToLS(this.key, liveToDos);
            renderList(liveToDos, this.listElement, this, true);
        }
    }

    removeToDo(id) {
        console.log(id + "removed");
        let toDo = this.findTodo(id);
        console.log(toDo);
        if (toDo) {
            deleteToDo(id);
            renderList(liveToDos, this.listElement, this, true);
        }
    }

    listToDos(hidden = true) {
        renderList(getToDos(this.key), this.listElement, this, hidden);
    }

    allToDo(hidden = true) {
        console.log("Here are all the ToDos");
        renderList(getToDos(this.key), this.listElement, this, hidden);
    }

    activeToDo(hidden = true) {
        console.log("Here are the active the ToDos");
        let todos = filterToDos(this.key, false);
        renderList(todos, this.listElement, this, hidden);
    }

    compToDo(hidden = true) {
        console.log("Here are the completed ToDos");
        let todos = filterToDos(this.key, true);
        renderList(todos, this.listElement, this, hidden);
    }
}