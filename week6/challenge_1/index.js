//acts as a controller

import ToDos from './todo.js';

const list = document.getElementById('listdisplay');
const myToDos = new ToDos(list, 'todo');