let tasks = [];
let nextId = 1;

// Добавление задачи
function toList() {
    let input = document.getElementById('bmw');
    let text = input.value.trim();
    if (text === '') return;

    tasks.push({ id: nextId, text: text });
    nextId++;
    input.value = '';
    input.focus(); // возвращаем фокус в поле

    saveTasks();
    showList();
}

// Показ списка задач
function showList() {
    let container = document.getElementById('checkboxContainer');
    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = "<p style='color:#aaa; text-align:center'>Список пуст 😊</p>";
        return;
    }

    tasks.forEach(task => {
        let item = document.createElement('div');
        item.classList.add('added');

        // чекбокс
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = task.id;
        checkbox.checked = task.done || false;

        checkbox.addEventListener("change", () => {
            toggleDone(task.id, checkbox.checked);
        });

        // текст задачи
        let textBox = document.createElement('input');
        textBox.type = 'text';
        textBox.value = task.text;
        textBox.disabled = true;

        // кнопка редактирования
        let editBtn = document.createElement('button');
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", function (e) {
            handleEdit(e, task.id);
        });

        item.appendChild(checkbox);
        item.appendChild(textBox);
        item.appendChild(editBtn);
        container.appendChild(item);
    });
}


function handleEdit(e, id) {
    let parent = e.target.parentElement;
    let textBox = parent.querySelector('input[type="text"]');
    let btn = e.target;

    if (textBox.disabled) {
        textBox.disabled = false;
        textBox.focus();
        btn.innerText = "Save";
    } else {
        saveEdit(id, textBox);
        textBox.disabled = true;
        btn.innerText = "Edit";
    }
}

// Сохранение отредактированного текста
function saveEdit(id, inputEl) {
    let newText = inputEl.value.trim();
    if (newText !== '') {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, text: newText } : task
        );
        saveTasks();
    }
}

// Удаление выбранных задач
function removeChecked() {
    let container = document.getElementById('checkboxContainer');
    let checkboxes = container.querySelectorAll('input[type="checkbox"]');
    let idsToRemove = [];

    checkboxes.forEach(cb => {
        if (cb.checked) idsToRemove.push(Number(cb.value));
    });

    tasks = tasks.filter(task => !idsToRemove.includes(task.id));
    saveTasks();
    showList();
}

// Пометка выполненной задачи
function toggleDone(id, done) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, done } : task
    );
    saveTasks();
}

// Сохранение в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Загрузка из localStorage
function loadTasks() {
    let saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
        nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        showList();
    }
}

// Очистка всех данных
function clearData() {
    localStorage.clear();
    tasks = [];
    showList();
}

// Привязка кнопки Clear
document.getElementById('clearButton').addEventListener('click', clearData);

// Загрузка при старте
window.onload = loadTasks;
