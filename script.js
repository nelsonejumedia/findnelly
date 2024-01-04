// The Tic Tac game 
let correctBoxes = 0;
let totalBoxes = 9;
let points = 0;
let wrongClicks = 0;
const maxWrongBoxes = 3;
let level = 1;
const chimeSound = document.getElementById('chimeSound');
const beepSound = document.getElementById('buzzerSound');
//const backgroundMusic = document.getElementById('backgroundMusic');
//backgroundMusic.volume = 0.1; // Adjust the volume as needed (0.0 to 1.0)



function createGrid() {
    const grid = document.getElementById('grid');

        if (level >= 4) {
      
        totalBoxes = 16 + (level - 4) * 4;
    } else {
       
    }
    

    // Set the number of columns based on the current level
    const columns = level >= 4 ? 4 : 3;
    
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  
    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.onclick = () => boxClick(box);
        grid.appendChild(box);
    }

    // Mark 3 random boxes as wrong
    const wrongBoxIndices = [];
    for (let i = 0; i < maxWrongBoxes; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * totalBoxes);
        } while (wrongBoxIndices.includes(randomIndex));

        wrongBoxIndices.push(randomIndex);
    }

    wrongBoxIndices.forEach((index) => {
        const box = grid.children[index];
        box.classList.add('wrong');
    });
}

function boxClick(box) {
    if (box.classList.contains('selected')) {
        return; // Ignore clicks on already selected boxes
    }

    const isCorrect = !box.classList.contains('wrong');

    if (isCorrect) {
        points += 10;
        correctBoxes++;
        playChimeSound();
    } else {
        wrongClicks++;
        playBuzzerSound();

        if (wrongClicks === maxWrongBoxes) {
            //alert('Game Over! Restarting the current level.');
            restartLevel();
            return;
        }
    }

    //box.classList.add('selected');
   // box.textContent = isCorrect ? 'O' : 'X';
   // checkLevelCompletion();
  //  updateScore();
//}

box.classList.add('selected');
    if (isCorrect) {
        box.classList.add('correct', 'nelly');
    } else {
        box.classList.add('wrong', 'tom');
    }
    checkLevelCompletion();
    updateScore();
}


function updateScore() {
    const scoreElement = document.getElementById('points');
    scoreElement.textContent = points;
}

function checkLevelCompletion() {
    if (correctBoxes === totalBoxes - maxWrongBoxes) {
        //alert('Level completed! Moving to the next level.');
        nextLevel();
    }
}

function restartLevel() {
    correctBoxes = 0;
    points = 0; // Reset the score to zero for the current level
    wrongClicks = 0; // Reset the wrong clicks count
    clearGrid();
    createGrid();
    updateScore(); // Reset the score to zero immediately
    showOverlay('gameOverOverlay');
}

function nextLevel() {
    correctBoxes = 0;
    wrongClicks = 0; // Reset the wrong clicks count
    level++; // Increase the level count
    totalBoxes += 3; // Increase the number of boxes for the next level
    updateLevel(); // Update the displayed level count
    clearGrid();
    createGrid();
    showOverlay('levelCompleteOverlay');
}

function showOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 2000); // Display for 2 seconds (adjust as needed)
}


function clearGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
}

function updateLevel() {
    const levelElement = document.getElementById('level');
    levelElement.textContent = `Level: ${level}`;
}


function playChimeSound() {
    chimeSound.play();
}

function playBuzzerSound() {
    beepSound.play();
}



createGrid();
updateLevel(); // Initialize the level count display



