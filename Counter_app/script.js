let count = 0;
const countDisplay = document.querySelector('.show-digit');
const increaseBtn = document.querySelector('.increase-button');
const decreaseBtn = document.querySelector('.decrease-button');
const resetBtn = document.querySelector(".reset-button");


increaseBtn.addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;

});

decreaseBtn.addEventListener("click", () => {
    if(count > 0)   count--;
  
    countDisplay.textContent = count;

});
resetBtn.addEventListener("click", () => {
    count =0;
    countDisplay.textContent = count;

});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        count++;
    } else if (event.key === "ArrowDown" && count > 0) {
        count--;
    } else {
        count = 0;
    }
    countDisplay.textContent = count;
});