document.querySelector('#kop').innerText = 'To-Do App';
const gridTodo = document.querySelector('#gridItem');
const incompleteTasks = document.querySelector('#incomplete-tasks');
const completedTasks = document.querySelector('#completed-tasks');

function todoClick() {
    /* read html no input and ignore this */
    var inputAdd = [];
    if (document.querySelector('#todonew').value == '') {
        console.log('geen input');
        return;
    }

    /* verwijder eerdere createElements */
    let repTodosinc = document.getElementById('incomplete-tasks');
    repTodosinc.replaceChildren();
    let repTodoscomp = document.getElementById('completed-tasks');
    repTodoscomp.replaceChildren();

    /* toevoegen todonew aan object */
    var todoAddItems = [];
    todoAddItems.push(
        {
            taak: document.querySelector('#todonew').value,
            status: "doen",
        },
    );

    /* get todo storage, maak array */
    const todoGet = localStorage.getItem("todo");
    let obj = JSON.parse(todoGet);
    if (obj == null) {
        let todoJSON = JSON.stringify(todoAddItems);
        localStorage.setItem('todo', todoJSON);
        maakTodo();
    } else {
        obj.push(
            {
                taak: document.querySelector('#todonew').value,
                status: "doen",
            },
        );
        let addJSON = JSON.stringify(obj);
        localStorage.setItem('todo', addJSON);
        maakTodo();
    }
    herlaadWindow();
}

/* maakt createElements aan voor de todo's */
function aanmaakTodo(entry, checkid, count) {
    let todoP = entry;
    const todoDiv = document.createElement("div");
    todoP = document.createElement("p");
    todoP.innerHTML = entry;
    todoP.style.color = "#060";
    todoP.style.padding = "0.25rem";
    todoDiv.appendChild(todoP);
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = checkid;
    console.log('aanmaak checkbox: ', checkid);
    if (checkid == 'done') {
        checkBox.checked = "true";
    }
    checkBox.style.margin = "0.25rem";
    todoDiv.appendChild(checkBox);
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.style.margin = "0.25rem";
    todoDiv.appendChild(editInput);
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "edit";
    editButton.id = "ed" + count;
    editButton.style.margin = "0.25rem";
    todoDiv.appendChild(editButton);
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    deleteButton.id = "id" + count;
    deleteButton.style.margin = "0.25rem";
    todoDiv.appendChild(deleteButton);
    let todoHr = document.createElement("hr");
    todoHr.style.color = "";
    /* de todo's */
    todoDiv.appendChild(todoHr);
    /* de parent div met de todo's */
    incompleteTasks.appendChild(todoDiv);
    checkKlikrun();
}

/* haal eerder geschreven storage op */
function maakTodo() {
    const readTodos = localStorage.getItem('todo');
    let obj2 = JSON.parse(readTodos);
    var todoP = '';
    /* stuur todo op voor todo aanmaak */
    if (obj2 !== null) {
        var count = -1;
        obj2.forEach(entry => {
            let todo = entry.taak;
            let checkid = entry.status;
            count++;
            todoP = aanmaakTodo(todo, checkid, count);
        });
    }
}

function herlaadWindow() {
    window.location.reload();
    console.log("hallo refresh");
}

/* eventlistener voor input todo */
const button = document.querySelector("#plus");
button.addEventListener('click', todoClick);

/* onclick edit en delete button */
const wrapper = document.querySelector(".grid-box");
wrapper.onclick = function (event) {
    event.target.style.color = '#00f';
    let todoNode = this.parentNode;
    let editP = todoNode.getElementsByTagName('p');
    console.log('editP', editP);
    let editbutton = todoNode.querySelectorAll("input[type=text]");
    console.log('editbutton', editbutton);

    /* edit button vind edit todo id */
    const editGet = localStorage.getItem("todo");
    if (event.target.className == 'edit') {
        /* vind edit todo waarde */
        let editPee = '';
        for (let cnt = 0; cnt < editbutton.length; cnt++) {
            if (editbutton[cnt].value !== '') {
                editPee = editbutton[cnt].value;
                console.log('editPee: ', editPee);
            }
        }

        for (let cnt = 0; cnt < editP.length; cnt++) {
            let idNaam = event.target.id;
            /* te editen ed nummer: */
            console.log('idnaam: ', idNaam);
            idNaam = idNaam.replace('ed', '');
            /* todo ed nummer ophalen uit storage */
            let obj3 = JSON.parse(editGet);
            if (obj3 !== null) {
                console.log('cnt = idNaam: ', idNaam);
                console.log('editP inT: ', editP[cnt].innerText);
                console.log('editP val: ', editP[cnt].value);
                for (cnt = 0; cnt < obj3.length; cnt++) {
                    if (cnt == idNaam) {
                        let cnt2 = cnt + 1;
                        /* te editen element: */
                        console.log('editbutton: ', editbutton[cnt2].value);
                        editP[cnt].innerText = editbutton[cnt2].value;
                        obj3[cnt] = (
                            {
                                taak: editPee,
                                status: obj3[cnt].status,
                            }
                        );
                    }
                }
                /* het schrijven van de string todo's */
                let addJSON = JSON.stringify(obj3);
                localStorage.setItem('todo', addJSON);
                break;
            }
        }
        herlaadWindow();
    }

    /* delete button vind delete todo id */
    const deleteGet = localStorage.getItem("todo");
    if (event.target.className == 'delete') {
        for (let cnt = 0; cnt < editP.length; cnt++) {
            let idNaam = event.target.id;
            console.log('idnaam: ', idNaam);
            idNaam = idNaam.replace('id', '');
            /* todo id uit storage deleten */
            let obj4 = JSON.parse(deleteGet);
            if (obj4 !== null) {
                for (cnt = 0; cnt < obj4.length; cnt++) {
                    if (cnt == idNaam) {
                        obj4.splice(cnt, 1);
                    }
                }
                /* het schrijven van de string todo's */
                let addJSON = JSON.stringify(obj4);
                localStorage.setItem('todo', addJSON);
                /* verwijder eerdere createElements */
                let idRemove = event.target.id;
                let remTodo = document.getElementById(idRemove);
                remTodo.parentNode.remove(remTodo);
                break;
            }
        }
        herlaadWindow();
    }
};

maakTodo();
checkKliktrue();
/* verplaatst naar completedTask bij (her)laden Window,  */
function checkKliktrue() {
    console.log('checkKliktrue na (her)load window');
    let checkKlik = document.querySelectorAll("input[type=checkbox]");
    for (let cnt = 0; cnt < checkKlik.length; cnt++) {
        if (checkKlik[cnt].classList.contains('done')) {
            let checkMove = checkKlik[cnt].parentNode;
            completedTasks.appendChild(checkMove);
        }
    }
}

function checksaveTodos(status, cnt) {
    const todoGet = localStorage.getItem("todo");
    let obj5 = JSON.parse(todoGet);
    obj5[cnt] = (
        {
            taak: obj5[cnt].taak,
            status: status,
        }
    );
    let addJSON = JSON.stringify(obj5);
    localStorage.setItem('todo', addJSON);
}

function checkKlikrun() {
    /* runt na aanmaak todo's */
    console.log('checkKlikrun na aanroep aanmaak todo');
    let checkKlik = document.querySelectorAll("input[type=checkbox]");
    for (let cnt = 0; cnt < checkKlik.length; cnt++) {
        checkKlik[cnt].addEventListener('change', (event) => {
            console.log('checkKlik na (un)check');
            if (checkKlik[cnt].checked == true) {
                let checkMove = checkKlik[cnt].parentNode;
                checkKlik[cnt].className = 'done';
                completedTasks.appendChild(checkMove);
                checksaveTodos('done', cnt);
            } else {
                let checkMove = checkKlik[cnt].parentNode;
                checkKlik[cnt].className = 'doen';
                incompleteTasks.appendChild(checkMove);
                checksaveTodos('doen', cnt);
            }
        });
    }
}
