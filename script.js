
window.addEventListener("load", () => {
  const tasks = document.querySelector(".task");
  const task_input = document.querySelector("#input");
  const submitButton = document.querySelector("#submit");
  const clearButton = document.querySelector("#clear");
  const date = document.querySelector("#date-input");
  
  // Load the tasks from localStorage when the page loads
  loadTasksFromLocalStorage();
  
  submitButton.addEventListener("click", () => {
    const task_value = task_input.value;
    const date_value = "within " + date.value;

    if (!task_value) {
      alert("Please enter your plans to add");
    } 
    else if(date.value === ""){
      alert("enter date too");
    }
    else {
      const added = document.querySelector(".added");
         added.classList.add("new-ok-popup");
    
         document.querySelector(".ok").addEventListener("click", () => {
          added.classList.remove("new-ok-popup");
         })
      createTaskElement(task_value, date_value);
  
      task_input.value = "";
      date.value = "";

      // Save the updated task list to localStorage
      saveTasksToLocalStorage();
    }
  });


  clearButton.addEventListener("click", () => {
    task_input.value = "";
  });

  function createTaskElement(taskValue, dateValue) {
    const task_content = document.createElement("div");
    task_content.classList.add("task-content");
    tasks.appendChild(task_content);

    const task_display = document.createElement("div");
    task_display.classList.add("text-task");
    task_content.appendChild(task_display);
    task_display.contentEditable = "false";
    task_display.innerHTML = taskValue;

    const due_date = document.createElement("div");
    due_date.classList.add("due-date");
    due_date.innerHTML = dateValue;
    task_content.appendChild(due_date);
  

    const edit = document.createElement("button");
    edit.classList.add("edit");
    edit.textContent = "edit";
    task_content.appendChild(edit);

    edit.addEventListener("click", () => {
      if (edit.textContent === "edit") {
        edit.textContent = "Save";
        task_display.contentEditable = "true";
        task_display.focus();
        edit.style.transform = "scale(1.1)";

        // Move the cursor to the end of the content in task_display
        const range = document.createRange();
        range.selectNodeContents(task_display);
        range.collapse(false); // Collapse range to the end
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // Check if the task_display is empty after editing
        if (task_display.textContent.trim() === "") {
          // Remove the whole task_content if task_display is empty
          tasks.removeChild(task_content);
        } else {
          // Rest of your code when "Save" button is clicked
          edit.textContent = "edit";
          task_display.contentEditable = "false";
          edit.style.transform = "scale(1)";
        }

        // Save the updated task list to localStorage
        saveTasksToLocalStorage();
      }
    });

    const delete_ = document.createElement("button");
    delete_.classList.add("delete");
    delete_.textContent = "delete";
    task_content.appendChild(delete_);

  delete_.addEventListener("click", () => {
    const delete_popup = document.querySelector(".delete-popup");
    delete_popup.classList.add("new-popup");
    
    
    
    // Save the updated task list to localStorage
    document.querySelector(".confirms").addEventListener("click", () =>{
      delete_popup.classList.remove("new-popup");
      setTimeout(() => {  
        task_content.style.animation = "delete 1s ease-in-out";
        tasks.removeChild(task_content);
        localStorage.setItem("tasks", JSON.stringify(JSON.parse(localStorage.getItem("tasks") || []).filter((task) => 
        task !== taskValue)));
      }, 500);

      
      saveTasksToLocalStorage();
      confirms();
    })
    document.querySelector(".back").addEventListener("click", ()=> {
      delete_popup.classList.remove("new-popup");
    })
  });
    

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    task_content.appendChild(checkbox);

    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        // Code to execute when the checkbox is checked
        task_display.style.textDecoration = "line-through";
        task_display.style.color = "#6E1423";
        console.log("Checkbox is checked");
        // Add your desired functionality here
      } else {
        // Code to execute when the checkbox is unchecked
        task_display.style.textDecoration = "none";
        task_display.style.color = "#232323";
        console.log("Checkbox is unchecked");
        // Add your desired functionality here
      }

      // Save the updated task list to localStorage
      saveTasksToLocalStorage();
    });
  }

  // function saveTasksToLocalStorage(){
  //   const alltasks = Array.from(tasks.querySelectorAll(".text-task")).map(task => task.innerHTML);
  //   localStorage.setItem("tasks", JSON.stringify(alltasks));
  //   const alldate = Array.from(tasks.querySelectorAll(".due-date")).map(date => date.innerHTML);
  //   localStorage.setItem("tasks", JSON.stringify(alldate));
  // }

  function saveTasksToLocalStorage() {
    const alltasks = Array.from(tasks.querySelectorAll(".text-task")).map(task => task.innerHTML);
    const alldates = Array.from(tasks.querySelectorAll(".due-date")).map(date => date.innerHTML);
    const combinedTasksAndDates = alltasks.map((task, index) => [task, alldates[index]]);
    localStorage.setItem("tasks", JSON.stringify(combinedTasksAndDates));
  }

  function loadTasksFromLocalStorage() {
    const savedTasksAndDates = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasksAndDates.forEach(([taskValue, dateValue]) => {
      createTaskElement(taskValue, dateValue);
    });
  }

});


