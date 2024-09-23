var txt = document.getElementById('txt');
var btn = document.getElementById('addbtn');
var ul = document.getElementById('ul');

// Load tasks from LocalStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

btn.addEventListener('click', additem);

function additem() {
    var txtv = txt.value;
    if (txtv === '') {
        txt.style.backgroundColor = 'rgb(234, 210, 210)';
        txt.setAttribute('placeholder', 'You must enter a task');
    } else {
        txt.style.backgroundColor = 'white';
        txt.setAttribute('placeholder', 'Enter A Task');

        var img = document.createElement('img');
        var li = document.createElement('li');

        var text = document.createElement('span');
        text.innerHTML = txt.value;

        img.setAttribute('src', 'wc.png');

        var span = document.createElement('span');
        span.setAttribute('id', 'st');
        span.addEventListener('click', removT);
        span.innerHTML = '\u00d7';

        li.appendChild(img);
        li.appendChild(text);
        li.appendChild(span);

        li.addEventListener('click', checkedTask);

        ul.appendChild(li);

        // Save task to LocalStorage
        saveTask(txt.value, false);

        txt.value = '';
    }
}

function checkedTask() {
    var img = this.querySelector('img');
    var txt = this.querySelector('span');

    if (img.getAttribute('src') === 'wc.png') {
        txt.style.textDecoration = 'line-through';
        txt.style.color = 'purple';
        img.setAttribute('src', 'pc.png');
        updateTask(txt.innerHTML, true);
    } else {
        txt.style.textDecoration = 'none';
        txt.style.color = 'black';
        img.setAttribute('src', 'wc.png');
        updateTask(txt.innerHTML, false);
    }
}

function removT(event) {
    event.stopPropagation(); // لمنع تفعيل حدث checkedTask عند الضغط على زر الحذف
    var li = this.parentNode;
    ul.removeChild(li);

    // Remove task from LocalStorage
    removeTask(li.querySelector('span').innerHTML);
}

function saveTask(task, completed) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push({ text: task, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(function(task) {
        var img = document.createElement('img');
        var li = document.createElement('li');

        var text = document.createElement('span');
        text.innerHTML = task.text;

        img.setAttribute('src', task.completed ? 'pc.png' : 'wc.png');

        var span = document.createElement('span');
        span.setAttribute('id', 'st');
        span.addEventListener('click', removT);
        span.innerHTML = '\u00d7';

        li.appendChild(img);
        li.appendChild(text);
        li.appendChild(span);

        li.addEventListener('click', checkedTask);

        if (task.completed) {
            text.style.textDecoration = 'line-through';
            text.style.color = 'purple';
        }

        ul.appendChild(li);
    });
}

function removeTask(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.filter(t => t.text !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(task, completed) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.map(t => t.text === task ? { text: t.text, completed: completed } : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
