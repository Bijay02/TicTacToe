import './App.css';
import Square from './Component/Square';
import { useState,useEffect } from 'react';
import { Patterns } from './Patterns';
import WinnerScreen from './WinnerScreen';
import { click } from '@testing-library/user-event/dist/click';

const clicksound = new Audio("./click.mp3");
const winsound = new Audio("./win.mp3");
const restartsound = new Audio("./restart.mp3");

//game sound initialize
const clickplay = () => {
  clicksound.play();
  
};

// game sound functions
const winplay = () => {
  winsound.play();
  
};

const restartplay = () => {
  restartsound.play();
  
};

function App() {

  //box index
  const [board, setBoard] = useState(["","","","","","","","",""]);
  //player turn
  const[player, setPlayer] = useState("🟡");

  const[result, setResult] = useState({winner : "none", state: "none"});
  
  const[wined, setWin] = useState(false);

  
  useEffect(()=>{
    checkWin()
    checkIfTie()

    if(player == "❌" ){
      setPlayer("🟡");
    }
    else{
    setPlayer("❌");
    }
  },[board]);

  //render winner
  useEffect(()=>{
    if(result.state != "none"){
      setWin(true);
      winplay()
      // alert(`Game Finished! Winnig Player: ${result.winner}`);
    }
  },[result]);

  const handleClick=(square)=>{
    clickplay();
    setBoard (
      board.map((val,idx)=>{
        if(idx === square && val === "") {
          return player;
        }
        return val;
      }) 
    );
  }

  //checking winner
  const checkWin =()=>{
    Patterns.forEach((currPattern)=>{
      const firstPlayer = board[currPattern[0]];
      if(firstPlayer =="") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx)=>{
        if(board[idx]!=firstPlayer){
          foundWinningPattern = false;
        }
      });
      if(foundWinningPattern){
        setResult({ winner : player , state:"won"});
      
      }
    }); 
  };

  //restart
  const restartGame =()=>{
    setBoard(["","","","","","","","",""]);
    setPlayer("🟡");
    setWin(false);
    restartplay();
  };


  //checking for tie
  const checkIfTie =() =>{
    let filled = true;
    board.forEach((square) =>{
      if(square == ""){
        filled =false;
      }
    });
      if(filled){
        setResult({winner : "No one", state: "Tie" });
      }
  }
  return (
    <div className="App">
      <div className='board'>
      <h1> Let's Play <br/> Tic Tac Toe</h1>
        <div className='row'>
            <Square 
            chooseSquare={()=>{handleClick(0)}}
            val={board[0]}/>
            <Square 
            chooseSquare={()=>{handleClick(1)}}
            val={board[1]}/>
            <Square 
            chooseSquare={()=>{handleClick(2)}}
            val={board[2]}/>
        </div>
        <div className='row'>
            <Square 
            chooseSquare={()=>{handleClick(3)}}
            val={board[3]}/>
            <Square 
            chooseSquare={()=>{handleClick(4)}}
            val={board[4]}/>
            <Square 
            chooseSquare={()=>{handleClick(5)}}
            val={board[5]}/>
        </div>
        <div className='row'>
            <Square 
            chooseSquare={()=>{handleClick(6)}}
            val={board[6]}/>
            <Square 
            chooseSquare={()=>{handleClick(7)}}
            val={board[7]}/>
            <Square 
            chooseSquare={()=>{handleClick(8)}}
            val={board[8]}/>
        </div>
      </div>
     {wined ? <WinnerScreen restartGame={restartGame} playerWon = {result.winner} /> : null};
    </div>
  );
}

export default App; 
