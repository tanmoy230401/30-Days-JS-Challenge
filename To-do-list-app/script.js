document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const emptyImage = document.querySelector(".empty-image");
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');

    const toggleEmptyState = () => {
        emptyImage.style.display =
            taskList.children.length === 0 ? "block" : "none";
    };

    const updateProgress = (checkCompletion = true) =>{
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
        
        progressBar.style.width = totalTasks ?`${(completedTasks / totalTasks)*100}%`: '0%';

        progressNumbers.textContent = `${completedTasks} /  ${totalTasks}`;

        if(checkCompletion && totalTasks > 0 &&completedTasks === totalTasks) 
        {
            Confetti();
        }

    };

    const addTask = (text, completed = false ,checkCompletion = true) => {
        const taskText = text || taskInput.value.trim();
        if (!taskText) {
            return;
        }

        const li = document.createElement("li");
        //  li.textContent = taskText;
        li.innerHTML = `
        <input type = "checkbox" class = "checkbox"
        ${completed ? "checked" : ""} />
        <span>${taskText}</span> 
        <div class="task-button">
           <button class = "edit-btn"><i class="fa-solid fa-pen"></i></button>
           <button class = "delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        const checkbox = li.querySelector(".checkbox");
        const editBtn = li.querySelector(".edit-btn");

        if (completed) {
            li.classList.add("completed");
            editBtn.disabled = true;
            editBtn.style.opacity = "0.5";
            editBtn.style.pointerEvents = "none";
        }

        checkbox.addEventListener("change", () => {
            const isChecked = checkbox.checked;

            li.classList.toggle("completed");
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? "0.5" : "1";
            editBtn.style.pointerEvents = isChecked ? "none" : "auto";

            updateProgress();
        });

        editBtn.addEventListener("click", () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector("span").textContent;
                li.remove();
                toggleEmptyState();
                updateProgress(false);
            }
        });

        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
            toggleEmptyState();
            updateProgress();
        });

        taskList.appendChild(li);
        taskInput.value = "";
        toggleEmptyState();
        updateProgress(checkCompletion);
    };

    addTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        addTask();
    });
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTask();
        }
    });
});

const Confetti = () => {
    confetti({
  spread: 360,
  ticks: 200,
  gravity: 1,
  decay: 0.94,
  startVelocity: 30,
  particleCount: 100,
  scalar: 3,
  shapes: ['image'],
  shapeOptions: {
    image: [{
        src: 'https://particles.js.org/images/fruits/apple.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/avocado.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/banana.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/berries.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/cherry.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/grapes.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/lemon.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/orange.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/peach.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/pear.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/pepper.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/plum.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/star.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/strawberry.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/watermelon.png',
        width: 32,
        height: 32,
      },
      {
        src: 'https://particles.js.org/images/fruits/watermelon_slice.png',
        width: 32,
        height: 32,
      },
    ],
  },
});
}