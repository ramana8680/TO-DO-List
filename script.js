let TASKLIST = [

];
if (localStorage.getItem("todo")) {
    TASKLIST = JSON.parse(localStorage.getItem("todo"));
}
let renderAll = function () {
    document.querySelector('.Task-Bar').style.backgroundImage = "";
    document.querySelector(".Task-Bar").innerHTML = "";
    TASKLIST.forEach(task => {
        let title = task.tasktitle;
        let descp = task.taskDescription;
        let priority = task.taskPriority;
        let id = task.taskId;
        let status = task.taskStatus;
        let classid = ".task" + id;
        const container = document.getElementById("Task-Bar");
        const div = document.createElement("div");
        div.className = `task-list task${id} ${priority} ${status}`;
        let allign_opt = document.createElement("div");
        allign_opt.className = "task-row";
        let h3 = document.createElement("h3");
        h3.textContent = title;
        let icon1 = document.createElement("i");
        icon1.className = `fa-solid fa-flag flag${id}`;
        let icon2 = document.createElement("i");
        icon2.className = "fa-solid fa-delete-left delete";
        // console.log(icon2.classList);
        let icon3 = document.createElement("i");
        icon3.className = "fa-solid fa-pen edit";
        let cnt = document.createElement("div");
        cnt.className = "task-descp";
        let opt_div = document.createElement("div");
        opt_div.className = "task_opt_row";
        div.id = `task-${id}`;
        cnt.textContent = descp;
        allign_opt.appendChild(h3);
        opt_div.appendChild(icon1);
        opt_div.appendChild(icon2);
        opt_div.appendChild(icon3);
        allign_opt.appendChild(opt_div);
        div.appendChild(allign_opt);
        div.appendChild(cnt);
        container.appendChild(div);
        if (priority === "low") {
            document.querySelector(classid).style.borderLeft = "12px solid green";
        }
        else if (priority === "mid") {
            document.querySelector(classid).style.borderLeft = "12px solid goldenrod";
        }
        else if (priority === "high") {
            document.querySelector(classid).style.borderLeft = "12px solid Red";
        }
        if (task.taskStatus === true) {
            document.querySelector(`.flag${id}`).style.color = "green";
        }
    })
}

renderAll();
function localset() {
    localStorage.setItem("todo", JSON.stringify(TASKLIST));
}
let addnewtask = function (taskhead, taskdecp, taskPriority) {
    let taskcurrntid = 0;
    if (TASKLIST.length === 0) {
        taskcurrntid = 0;
    } else {
        taskcurrntid = TASKLIST[TASKLIST.length - 1].taskId + 1;
    }
    TASKLIST.push({ tasktitle: taskhead, taskDescription: taskdecp, taskStatus: false, taskPriority: taskPriority, taskId: taskcurrntid });
    console.log("appended successfully");
    localset();
    renderAll();
    update();
}

let deleteTask = function (taskid) {
    let taskId = Number(taskid);
    let index = TASKLIST.findIndex(function (Todo) {
        return Todo.taskId === taskId;
    });

    if (index !== -1) {
        const container = document.getElementById("Task-Bar");
        let rmvid = document.getElementById(`task-${taskId}`);
        container.removeChild(rmvid);
        TASKLIST.splice(index, 1);

    }
    localset();
    update();
};
let deleteAll = function () {
    for (let i = TASKLIST.length - 1; i >= 0; i--) {
        let task = TASKLIST[i];
        let id = task.taskId;
        deleteTask(id);
    }
    localset();
    update();
};
let editTask = function (taskId, newtitle, newDescription, newPriority) {
    let task = null;
    for (let i = 0; i < TASKLIST.length; i++) {
        if (TASKLIST[i].taskId === taskId) {
            task = TASKLIST[i];
            break;
        }
    }

    if (task) {
        task.tasktitle = newtitle;
        task.taskDescription = newDescription;
        task.taskPriority = newPriority;
        let taskDiv = document.getElementById(`task-${taskId}`);
        let descriptionDiv = taskDiv.querySelector('.task-descp');
        descriptionDiv.textContent = newDescription;
    }
    localset();
    update();
    renderAll();
};
let noofTasksCompleted = function () {
    let completed = 0;
    TASKLIST.forEach(task => {
        if (task.taskStatus === true) {
            completed++;
        }
    })
    return completed;
}
let noofIncompleteTask = function () {
    let incomplete = 0;
    TASKLIST.forEach(task => {
        if (task.taskStatus === false) {
            incomplete++;
        }
    })
    return incomplete;
}
let noofTasks = function () {
    let totaltask = 0;
    TASKLIST.forEach(task => {
        totaltask++;
    })
    return totaltask;
}
let noofHighTasks = function () {
    let high = 0;
    TASKLIST.forEach(task => {
        if (task.taskPriority === "high") {
            high++;
        }
    })
    return high;
}
let addnew = document.getElementById("inp-submit").addEventListener("click", function () {
    let title = document.getElementById("inp-topic").value;
    let descp = document.getElementById("inp-descp").value;
    let prio = document.getElementById("inp-priority").value;
    if (title.length === 0 || descp.length === 0) {
        addPopup("#a83434", "No Value Detected!!");
    }
    else {
        addnewtask(title, descp, prio);
        addPopup("#52891f", "Note Added Successfully!");
        document.querySelector(".add-body").style.display = "none";
        document.querySelector(".add-text").style.border = "none";
        document.getElementById("AddButton").style.display = "block";
    }

})
document.getElementById("AddButton").addEventListener("click", function () {
    document.querySelector(".add-body").style.display = "flex";
    document.getElementById("inp-topic").value = "";
    document.getElementById("inp-descp").value = "";
    // document.getElementById("inp-priority").value = "";
    document.getElementById("AddButton").style.display = "none";
    addnew;
})
document.querySelector(".fa-trash").addEventListener("click", function () {
    deleteAll();
})
let update = function () {
    let completed = noofTasksCompleted();
    let total = noofTasks();
    let incomplete = noofIncompleteTask();
    let high = noofHighTasks();
    document.getElementById("total-count").textContent = total + " Tasks";
    document.getElementById("incomplete-count").textContent = incomplete + " Tasks";
    document.getElementById("completed-count").textContent = completed + " Tasks";
    document.getElementById("high-count").textContent = high + " Tasks";
    if (total === 0) {
        document.querySelector(".fa-trash").style.display = "none";
        document.querySelector('.Task-Bar').style.backgroundImage = 'url("Add More.jpg")';
    }
    else {
        document.querySelector(".fa-trash").style.display = "block";
        document.querySelector('.Task-Bar').style.backgroundImage = "";
    }
}
update();
function addPopup(color, text) {
    const popup = document.getElementById("popup");
    let size = 25;
    popup.style.backgroundColor = color;
    popup.style.display = "block";
    popup.textContent = "";
    const growPopup = setInterval(() => {
        if (size >= 250) {
            clearInterval(growPopup);
            popup.textContent = text; 
        } else {
            popup.style.width = `${size}px`;
            size += 25;
        }
    }, 50);
    setTimeout(() => {
        const shrinkPopup = setInterval(() => {
            if (size <= 0) {
                clearInterval(shrinkPopup); 
                popup.style.display = "none"; 
                popup.textContent = ""; 
            } else {
                size -= 25;
                popup.style.width = `${size}px`;
            }
        }, 75);
    }, 3000);
}




document.getElementById("inp-cancel").addEventListener("click", function () {
    document.querySelector(".add-body").style.display = "none";
    document.querySelector("#AddButton").style.display = "block";
})
document.getElementById("edit-cancel").addEventListener("click", function () {
    document.querySelector(".edit-body").style.display = "none";
})
function statusUpdater(taskId) {
    const task = TASKLIST.find(task => task.taskId === taskId);
    if (task) {
        let id = task.taskId;
        task.taskStatus = !task.taskStatus;
        const taskDiv = document.getElementById(`task-${taskId}`);
        if (task.taskStatus) {
            taskDiv.querySelector(`.flag${id}`).style.color = "green";
        } else {
            taskDiv.querySelector(`.flag${id}`).style.color = "red";
        }
        localset();
        update();
    }
}
document.querySelector(".Task-Bar").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        deleteTask(e.target.closest(".task-list").classList[1].slice(4));
    }
    if (e.target.classList.contains("fa-flag")) {
        const taskId = Number(e.target.closest(".task-list").classList[1].slice(4));
        statusUpdater(taskId);
    }
    if (e.target.classList.contains("edit")) {
        const taskId = Number(e.target.closest(".task-list").classList[1].slice(4));
        const task = TASKLIST.find(task => task.taskId === taskId);
        if (task) {
            document.querySelector(".edit-body").style.display = "flex";
            document.getElementById("edit-topic").value = task.tasktitle;
            document.getElementById("edit-descp").value = task.taskDescription;
            document.getElementById("edit-priority").value = task.taskPriority;
            document.getElementById("edit-submit").onclick = function () {
                const newTitle = document.getElementById("edit-topic").value;
                const newDescription = document.getElementById("edit-descp").value;
                const newPriority = document.getElementById("edit-priority").value;
                if (newTitle.length === 0 || newDescription.length === 0) {
                    addPopup("#a83434", "Fields cannot be empty!");
                } else {
                    console.log(taskId, newTitle, newDescription, newPriority);
                    editTask(taskId, newTitle, newDescription, newPriority);
                    document.querySelector(".edit-body").style.display = "none";
                    addPopup("#52891f", "Task updated successfully!");
                }
            };
        }
    }
});
document.querySelector(".status-bar").addEventListener("click", function (e) {
    if (e.target.classList.contains("total")) {
        renderAll();
    }
    if (e.target.classList.contains("ongoing")) {
        document.querySelector('.Task-Bar').style.backgroundImage = "";
        document.querySelector(".Task-Bar").innerHTML = "";
        TASKLIST.forEach(task => {
            if (task.taskStatus === false) {
                let title = task.tasktitle;
                let descp = task.taskDescription;
                let priority = task.taskPriority;
                let id = task.taskId;
                let status = task.taskStatus;
                let classid = ".task" + id;
                const container = document.getElementById("Task-Bar");
                const div = document.createElement("div");
                div.className = `task-list task${id} ${priority} ${status}`;
                let allign_opt = document.createElement("div");
                allign_opt.className = "task-row";
                let h3 = document.createElement("h3");
                h3.textContent = title;
                let icon1 = document.createElement("i");
                icon1.className = `fa-solid fa-flag flag${id}`;
                let icon2 = document.createElement("i");
                icon2.className = "fa-solid fa-delete-left delete";
                // console.log(icon2.classList);
                let icon3 = document.createElement("i");
                icon3.className = "fa-solid fa-pen edit";
                let cnt = document.createElement("div");
                cnt.className = "task-descp";
                let opt_div = document.createElement("div");
                opt_div.className = "task_opt_row";
                div.id = `task-${id}`;
                // console.log(`task-${id}`);
                cnt.textContent = descp;
                allign_opt.appendChild(h3);
                opt_div.appendChild(icon1);
                opt_div.appendChild(icon2);
                opt_div.appendChild(icon3);
                allign_opt.appendChild(opt_div);
                div.appendChild(allign_opt);
                div.appendChild(cnt);
                container.appendChild(div);
                if (priority === "low") {
                    document.querySelector(classid).style.borderLeft = "12px solid green";
                }
                else if (priority === "mid") {
                    document.querySelector(classid).style.borderLeft = "12px solid goldenrod";
                }
                else if (priority === "high") {
                    document.querySelector(classid).style.borderLeft = "12px solid Red";
                }
                if (task.taskStatus === true) {
                    document.querySelector(`.flag${id}`).style.color = "green";
                }
            }
        })
    }

    if (e.target.classList.contains("highimp")) {
        document.querySelector('.Task-Bar').style.backgroundImage = "";
        document.querySelector(".Task-Bar").innerHTML = " ";
        TASKLIST.forEach(task => {
            if (task.taskPriority === "high") {
                let title = task.tasktitle;
                let descp = task.taskDescription;
                let priority = task.taskPriority;
                let id = task.taskId;
                let status = task.taskStatus;
                let classid = ".task" + id;
                const container = document.getElementById("Task-Bar");
                const div = document.createElement("div");
                div.className = `task-list task${id} ${priority} ${status}`;
                let allign_opt = document.createElement("div");
                allign_opt.className = "task-row";
                let h3 = document.createElement("h3");
                h3.textContent = title;
                let icon1 = document.createElement("i");
                icon1.className = `fa-solid fa-flag flag${id}`;
                let icon2 = document.createElement("i");
                icon2.className = "fa-solid fa-delete-left delete";
                // console.log(icon2.classList);
                let icon3 = document.createElement("i");
                icon3.className = "fa-solid fa-pen edit";
                let cnt = document.createElement("div");
                cnt.className = "task-descp";
                let opt_div = document.createElement("div");
                opt_div.className = "task_opt_row";
                div.id = `task-${id}`;
                // console.log(`task-${id}`);
                cnt.textContent = descp;
                allign_opt.appendChild(h3);
                opt_div.appendChild(icon1);
                opt_div.appendChild(icon2);
                opt_div.appendChild(icon3);
                allign_opt.appendChild(opt_div);
                div.appendChild(allign_opt);
                div.appendChild(cnt);
                container.appendChild(div);
                if (priority === "low") {
                    document.querySelector(classid).style.borderLeft = "12px solid green";
                }
                else if (priority === "mid") {
                    document.querySelector(classid).style.borderLeft = "12px solid goldenrod";
                }
                else if (priority === "high") {
                    document.querySelector(classid).style.borderLeft = "12px solid Red";
                }
                if (task.taskStatus === true) {
                    document.querySelector(`.flag${id}`).style.color = "green";
                }
            }
        })
    }
    if (e.target.classList.contains("completed")) {
        document.querySelector('.Task-Bar').style.backgroundImage = "";
        document.querySelector(".Task-Bar").innerHTML = "";
        TASKLIST.forEach(task => {
            if (task.taskStatus === true) {
                let title = task.tasktitle;
                let descp = task.taskDescription;
                let priority = task.taskPriority;
                let id = task.taskId;
                let status = task.taskStatus;
                let classid = ".task" + id;
                const container = document.getElementById("Task-Bar");
                const div = document.createElement("div");
                div.className = `task-list task${id} ${priority} ${status}`;
                let allign_opt = document.createElement("div");
                allign_opt.className = "task-row";
                let h3 = document.createElement("h3");
                h3.textContent = title;
                let icon1 = document.createElement("i");
                icon1.className = `fa-solid fa-flag flag${id}`;
                let icon2 = document.createElement("i");
                icon2.className = "fa-solid fa-delete-left delete";
                // console.log(icon2.classList);
                let icon3 = document.createElement("i");
                icon3.className = "fa-solid fa-pen edit";
                let cnt = document.createElement("div");
                cnt.className = "task-descp";
                let opt_div = document.createElement("div");
                opt_div.className = "task_opt_row";
                div.id = `task-${id}`;
                // console.log(`task-${id}`);
                cnt.textContent = descp;
                allign_opt.appendChild(h3);
                opt_div.appendChild(icon1);
                opt_div.appendChild(icon2);
                opt_div.appendChild(icon3);
                allign_opt.appendChild(opt_div);
                div.appendChild(allign_opt);
                div.appendChild(cnt);
                container.appendChild(div);
                if (priority === "low") {
                    document.querySelector(classid).style.borderLeft = "12px solid green";
                }
                else if (priority === "mid") {
                    document.querySelector(classid).style.borderLeft = "12px solid goldenrod";
                }
                else if (priority === "high") {
                    document.querySelector(classid).style.borderLeft = "12px solid Red";
                }
                if (task.taskStatus === true) {
                    document.querySelector(`.flag${id}`).style.color = "green";
                }
            }
        })
    }

});
const driver = window.driver.js.driver;
const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '.status-bar', popover: { title: 'Status Bar', description: '"Track your notesprogress here!" Click Them to View' } },
    { element: '.Task-Bar', popover: { title: 'Task Bar', description: 'Get View of Your Notes ' } },
    { element: '.fa-trash', popover: { title: 'Delete All', description: 'Delete All Your Notes in One Tap' } },
    { element: '#AddButton', popover: { title: 'Add Note', description: 'Add Your TO-DO Here !' } },
  ]
});

driverObj.drive();




