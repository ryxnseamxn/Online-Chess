// const chessSquareArray = []; 

// function renderSquares(){
//     let numberOfSquares = 0; 
//     const chessBoard = document.querySelector(".chessBoard"); 
//     while (numberOfSquares < 64){
//         chessSquare = document.createElement("div"); 
//         chessSquare.classList.add("chessSquare"); 
//         chessSquareArray.push(chessSquare); 
//         numberOfSquares+=1; 
//     }
//     chessSquareArray.forEach((element, i) => {
//         determineSquareColor(element, i); 

//     })
//     return chessSquareArray.forEach((element) => {
//         return chessBoard.append(element); 
//     })
// }

// function determineSquareColor(element, i){
//     console.log((Math.floor(i/8))%2);
//     if((Math.floor(i/8)) % 2 === 0 && i % 2 === 0){
//         return element.style.backgroundColor = "#FFF";
//     }
//     if((Math.floor(i/8)) % 2 !== 0 && i % 2 !== 0){
//         return element.style.backgroundColor ="#FFF";
//     }
//     return element.style.backgroundColor = "#000"; 
// }

// renderSquares(); 
var board1 = Chessboard('board1', 'start')