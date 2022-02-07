/*-------------------------------- Constants --------------------------------*/


board = [null,null,null,null,null,null,null,null,null]

const winningcomb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.board-sq')
const messageEl = document.querySelector('#message')
const resetBtn = document.querySelector('#reset-button').addEventListener('click', reset)
document.querySelector('.board').addEventListener("click", handleClick)
/*----------------------------- Event Listeners -----------------------------*/





/*-------------------------------- Functions --------------------------------*/
init()
function reset(){
  board = [null,null,null,null,null,null,null,null,null]
  // document.getElementsByClassName('board-sq').style.background = "gray"

  for(let idx =0; idx < squareEls.length; idx++){
  squareEls[idx].style.background = "gray";
  }
  init();

}

function init(){
  turn = 1;
  isWinner = null;

  render()

}

function render(){
  board.forEach((cell, idx) =>
  { let sql;
    let sqc;
    let sqb;
    //console.log("board[" + idx +"]" + board[idx]);
    if (board[idx] === 1){
      sql = "X"
      sqc = "white"
      sqb = "brown"
    } else if(board[idx] === -1){
      sql = 'O';
      sqc = "white"
      sqb = "navy"
    }else if(board[idx] === null){
      sql = ' ';
    }
    squareEls[idx].innerText = sql;
    squareEls[idx].style.color = sqc;
    squareEls[idx].style.background = sqb;
  });


  if (isWinner === null){
    // console.log("turn" + turn)
    messageEl.innerText = `This turn is ${turn === 1 ? 'X' : 'O'}!`;
  }else if (isWinner === 'T'){
    messageEl.innerText = 'Tie Game!'
  }else {
    messageEl.innerText = `${isWinner === 1 ? 'X' : 'O'} is winner!`
    confetti.start(5000)
  }
 

}



function handleClick(evt){
  
  let squareIdx = parseInt(evt.target.id.replace('sq',''))
  // console.log("squareIdx = " + squareIdx)
  if (board[squareIdx]=== null && isWinner === null) {
    board[squareIdx] = turn
    // console.log("handleClick" + board[squareIdx])
    isWinner = getWinner();
    turn = turn * -1
    render()

    // console.log("isWinner is " + isWinner);
  }

}

function getWinner(){
  winningcomb.forEach((comb, idx) => {
    result = 0;
    isWinner;
    for(i = 0 ; i < 3 ; i++)
    {
      if(board[comb[i]] != null)
        result += board[comb[i]];
      if(Math.abs(result) === 3) {
        isWinner = board[comb[0]];
        return isWinner; 
        }
    }
  });

  if(!board.includes(null)){
    isWinner = 'T';
    return isWinner;

  }
 
  return isWinner
}



