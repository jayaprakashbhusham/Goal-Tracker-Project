let userInput = document.getElementById("userInput");
let addBtn = document.getElementById("addBtn");
let myGoalsContainer = document.getElementById("myGoalsContainer");
let saveBtn = document.getElementById("saveBtn");

function getGoalListFromLocalStorage(){
    let goalListFromLocalStorage = localStorage.getItem("goalList");
    let parsedGoalList = JSON.parse(goalListFromLocalStorage);
    
    if(parsedGoalList === null){
        return [];
    } else{
        return parsedGoalList;
    }
}

let goalList = getGoalListFromLocalStorage();

function onCreateGoal(){
    let goalCount = goalList.length;
    goalCount = goalCount + 1;

    let goalTitle = userInput.value

    if(userInput.value === ""){
        alert("Enter Goal!");
        return;
    }

    let newGoal = {
        goal: goalTitle,
        uniqueNo: goalCount,
        isChecked: false
    }

    goalList.push(newGoal);
    createAndAppendGoal(newGoal)
    userInput.value = "";
}

addBtn.onclick = function(){
    onCreateGoal();
}

function onSaveGoals(){
    let stringifiedGoalslist = JSON.stringify(goalList);
    localStorage.setItem("goalList", stringifiedGoalslist);
}

function onDeleteGoal(goalItemId){
    let toBeDeletedGoal = document.getElementById(goalItemId);
    myGoalsContainer.removeChild(toBeDeletedGoal);

    let deletedGoalIndex = goalList.findIndex((eachGoal) => {
        let goalItem = "goal" + eachGoal.uniqueNo;
        if(goalItem === eachGoal){
            return true;
        }else{
            return false;
        }
    });

    goalList.splice(deletedGoalIndex, 1);
};

saveBtn.onclick = function(){
    onSaveGoals();
}


function onStatusChangeGoal(goalItemId, goalLabelId, goalCheckboxId){
    let goalLabelEl = document.getElementById(goalLabelId);
    let checkboxEl = document.getElementById(goalCheckboxId);

    goalLabelEl.classList.toggle("checked");

    let goalObjectIndex = goalList.findIndex(function(eachGoal){
        let eachGoalId = "goal" + eachGoal.uniqueNo;

        if(eachGoalId === goalItemId){
            return true;
        }else{
            return false;
        }
    });

    let goalObject = goalList[goalObjectIndex];

    if(goalObject.isChecked === true){
        goalObject.isChecked = false;
    }else{
        goalObject.isChecked = true;
    };

}


function createAndAppendGoal(eachGoal){
    let goalItemId = "goal" + eachGoal.uniqueNo;
    let goalLabelId = "goalLabel" + eachGoal.uniqueNo;
    let goalCheckboxId = "goalCheckbox" + eachGoal.uniqueNo; 

    let goalItem = document.createElement("li");
    goalItem.classList.add("d-flex", "flex-row");
    goalItem.id = goalItemId;
    myGoalsContainer.appendChild(goalItem);

    let inputCheckbox = document.createElement("input");
    inputCheckbox.classList.add("input-checkbox");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = goalCheckboxId;
    inputCheckbox.onclick = function(){
        onStatusChangeGoal(goalItemId, goalLabelId, goalCheckboxId);

    }
    goalItem.appendChild(inputCheckbox);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    goalItem.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.textContent = eachGoal.goal;
    labelElement.id = goalLabelId;
    labelElement.setAttribute("for", goalCheckboxId);
    labelElement.classList.add("label-el");
    if(eachGoal.isChecked === true){
        inputCheckbox.checked = true;
        labelElement.classList.toggle("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    deleteIconContainer.onclick = function(){
        onDeleteGoal(goalItemId);
    }
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteIconContainer.appendChild(deleteIcon);
}

for(let eachGoal of goalList){
    createAndAppendGoal(eachGoal);
}
userInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        onCreateGoal();
    }
});
