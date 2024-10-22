document.getElementById('todo-input').addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        addTodo();
    }
});

function addTodo(){
    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();
    if (todoText !== ""){
        const todoList=document.getElementById('todo');

        const li = document.createElement('li');
        li.innerHTML = `
            ${todoText}
            <span>
                <button class="complete-btn">완료</button>
            </span>
        `;

        todoList.appendChild(li);
        input.value='';

        li.querySelector('.complete-btn').addEventListener('click', function() {
            moveToDone(li, todoText);
        });
    }
}

function moveToDone(todoItem, todoText) {
    const doneList = document.getElementById('done');

    const li = document.createElement('li');
    li.innerHTML = `
        ${todoText}
        <button class="delete-btn">삭제</button>
    `;

    doneList.appendChild(li);
    todoItem.remove();

    li.querySelector('.delete-btn').addEventListener('click', function(){
        li.remove();
    });
}