let boardSize; // Change this value for different board sizes
let board = [];
let solutions = [];
let queenPositions
let state;
let bool;
let v1;
let v2;
let v3;
const boardSizeInput = document.getElementById('boardSizeInput');

var x = 0;

let inputAdd = false;





const container = document.getElementById('sa');
const sim = document.getElementById('in')
// Call addInput() function on button click
container.addEventListener('click',()=>{
 if(!inputAdd){
  let input1 = document.createElement('input');
  input1.placeholder = 'Initial Temp';
  input1.type = 'number';
  input1.id = 'it';
  v1 = input1;
  sim.appendChild(input1);

  let input2 = document.createElement('input');
  input2.placeholder = 'Cooling rate';
  input2.type = 'number';
  input2.id = 'cr';
  v2 = input2;
  sim.appendChild(input2);

  let input3 = document.createElement('input');
  input3.placeholder = 'Maximum iteration';
  input3.type = 'number'
  input3.id = 'mi';
  v3 = input3;
  sim.appendChild(input3);
  inputAdd=true;
 }
});


//place queens randomly 

function randomlyPlace(){
  function startSolverran() {
  
    const size = 4;
    
      document.getElementById('chessboard').style.setProperty("--board-size", size);
      boardSize = size;
      queenPositions = getRandomPositions(boardSize)
      
      initializeBoard();
      renderBoardran();
   
  }
  
  
  function initializeBoard() {
    for (let i = 0; i < boardSize; i++) {
      board[i] = [];
      
      for (let j = 0; j < boardSize; j++) {
          
        board[i][j] = 0; 
      }
    }
  }
  
  
  
  
    function renderBoardran() {
      
      const chessboard = document.getElementById('chessboard');
      chessboard.innerHTML = '';
    
    
      
      
    
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          state = j;
    
    
  
          const cell = document.createElement('div');
          if ((i + j) % 2 == 0){
            cell.className = 'cell green';
          }else{
            cell.className = 'cell ';
          }
          if(queenPositions[j] == i){
            
            cell.textContent = '♕';
          }
          
          chessboard.appendChild(cell);
         
    
        }
      }
    
      
      
  
  }
  
  function getRandomPositions(boardSize) {
    const positions = [];
    for (let i = 0; i < boardSize; i++) {
      positions.push(Math.floor(Math.random() * boardSize));
    }
    return positions;
  }

  startSolverran();
}



document.addEventListener("DOMContentLoaded", randomlyPlace);


function opacity(){
  document.getElementById('ss').style.setProperty("display","inline-block");
  document.getElementById('sss').style.setProperty("display","none");
  bool = false;
}

function opacity1(){
  document.getElementById('sss').style.setProperty("display","inline-block");
  document.getElementById('ss').style.setProperty("display","none");
  bool = false;
}

// let btnhc = document.getElementById('hc');
// let btnsa = document.getElementById('sa')




function simu(){



  
  boardSizeInput.value='';
  
  document.getElementById('sss').style.setProperty("display","none");
  
  

  opacity();

  document.getElementById('in').style.setProperty("display","inline")
  
  function startSolver() {
    const boardSizeInput = document.getElementById('boardSizeInput');
    const size = parseInt(boardSizeInput.value);
    if (size >= 4 && size <= 8) { // Limit the board size to a reasonable range
      document.getElementById('chessboard').style.setProperty("--board-size", size);
      boardSize = size;
      initializeBoard();
      renderBoardsa();
    } else {
      alert('Please enter a valid board size between 4 and 8.');
    }
  }

  const startS = ss.addEventListener("click",startSolver)

    


 

  



function initializeBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    
    for (let j = 0; j < boardSize; j++) {
        
      board[i][j] = 0; 
    }
  }
}




  function renderBoardsa() {
    
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = '';
  
  
    const solutiona = simulatedAnnealing(boardSize);
    
  
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        state = j;
  
  

        const cell = document.createElement('div');
        if ((i + j) % 2 == 0){
          cell.className = 'cell green';
        }else{
          cell.className = 'cell ';
        }
        if(solutiona[j] == i){
          
          cell.textContent = '♕';
        }
        
        chessboard.appendChild(cell);
       
  
      }
    }
  
    
  

}
  
  



  //Simulated Annealing 


  
  function evaluate(board) {
    const n = board.length;
    let conflicts = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (board[i] === board[j] || Math.abs(board[i] - board[j]) === j - i) {
          conflicts++;
        }
      }
    }
    return conflicts;
  }
  

  let temp;
  let it;


  function simulatedAnnealing(boardSize, maxIterations, initialTemperature, coolingRate ) {
    
      maxIterations = v3.value;
      initialTemperature = v1.value;
      coolingRate = v2.value; 
      console.log(maxIterations, initialTemperature,coolingRate)
    function getRandomState() {
      const state = [];
      for (let i = 0; i < boardSize; i++) {
        state.push(Math.floor(Math.random() * boardSize));
      }
      return state;
    }
  
    function getNeighbor(state) {
      const neighbor = state.slice();
      const col = Math.floor(Math.random() * boardSize);
      let row = Math.floor(Math.random() * boardSize);
      while (neighbor[col] === row) {
        row = Math.floor(Math.random() * boardSize);
      }
      neighbor[col] = row;
      return neighbor;
    }
  
    let currentState = getRandomState();
    let currentEnergy = evaluate(currentState);
  
    let bestState = currentState.slice();
    let bestEnergy = currentEnergy;
  
    let temperature = initialTemperature;
    
      temp = temperature
  
    for (let iteration = 0; iteration < maxIterations; iteration++) {
      if (currentEnergy === 0) {
         window.alert(`"temp:",${temperature},"Iteration:",${iteration}`)
      
        return bestState; // Found a solution
      }
      
      const neighbor = getNeighbor(currentState);
      const neighborEnergy = evaluate(neighbor);
  
      if (neighborEnergy < currentEnergy || Math.random() < Math.exp((currentEnergy - neighborEnergy) / temperature)) {
        currentState = neighbor;
        currentEnergy = neighborEnergy;
  
        if (currentEnergy < bestEnergy) {
          bestState = currentState.slice();
          bestEnergy = currentEnergy;
        }
      }
  
      temperature *= coolingRate;
      
      
    }
    

    
 
    
    
    return null; 
  }



  
};



function hill(){
  

  
  
  boardSizeInput.value='';
 
  opacity1(); 
  

  document.getElementById('in').style.setProperty("display","none")
 

  function startSolverhc() {
    
    const size = parseInt(boardSizeInput.value);
    if (size >= 4 && size <= 8) { // Limit the board size to a reasonable range
      document.getElementById('chessboard').style.setProperty("--board-size", size);
      boardSize = size;
  
      initializeBoard();
      renderBoardhc();
    } else {
      alert('Please enter a valid board size between 4 and 8.');
    }
  }

  const startS = sss.addEventListener("click",startSolverhc);



 

  



function initializeBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    
    for (let j = 0; j < boardSize; j++) {
        
      board[i][j] = 0; // 0 indicates no queen in the cell, 1 indicates a queen
    }
  }
}




   
  function renderBoardhc() {
    
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = '';
  
   
    const solution = nQueensHillClimbing(boardSize);
    
  
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        state = j;
  
  
        // if( (i-j == j-i) || (j-i == i-k)){
        //   renderBoard();
        // }
        
        const cell = document.createElement('div');
        if ((i + j) % 2 == 0){
          cell.className = 'cell green';
        }else{
          cell.className = 'cell ';
        }
        if(solution[j] == i){
          
          cell.textContent = '♕';
        }
        
        chessboard.appendChild(cell);
       
  
      }
    }
  
    
  

}
 


  //Hill Climbing


  
function nQueensHillClimbing(boardSize) {
  function heuristic(state) {
    
    let conflicts = 0;
    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        if (state[i] === state[j] || Math.abs(state[i] - state[j]) === j - i) {
          conflicts++;
        }
      }
    }
    return conflicts;
  }

  function generateRandomState() {
    
    return Array.from({ length: boardSize }, () => Math.floor(Math.random() * boardSize));
  }

  function isSolution(state) {
    return heuristic(state) === 0;
  }

  let currentState = generateRandomState();

  while (!isSolution(currentState)) {
    const neighbors = [];
    let restartNeeded = false;

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (currentState[row] !== col) {
          const neighbor = currentState.slice(); 
          neighbor[row] = col;
          neighbors.push(neighbor);

         
          if (Math.abs(currentState[row] - col) === Math.abs(row - currentState[row])) {
            restartNeeded = true;
          }
        }
      }
    }

    if (restartNeeded) {
    
      currentState = generateRandomState();
    } else {
      // Continue with the best neighbor
      let bestNeighbor = currentState;
      let bestHeuristic = heuristic(currentState);

      for (const neighbor of neighbors) {
        const neighborHeuristic = heuristic(neighbor);
        if (neighborHeuristic < bestHeuristic) {
          bestNeighbor = neighbor;
          bestHeuristic = neighborHeuristic;
        }
      }

      // If no better neighbor found, stop (local optimum)
      if (bestHeuristic >= heuristic(currentState)) {
        break;
      }

      currentState = bestNeighbor;
    }
  }

  return currentState;
}

  






  
};


