import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import Circle_Icon from '../assets/circle.png';
import Cross_Icon from '../assets/cross.png';

let data = ['', '', '', '', '', '', '', '', ''];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock) return 0;
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src=${Cross_Icon} alt="cross"/>`;
      data[num] = 'X';
    } else {
      e.target.innerHTML = `<img src=${Circle_Icon} alt="circle"  />`;
      data[num] = 'O';
    }
    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        win(data[c]);
      }
    }
  };

  const win = (winner) => {
    setLock(true);
    if (winner === 'X') {
      titleRef.current.innerHTML += `<br/> Congratulations :  <img src=${Cross_Icon} alt="Draw"/> wins`;
    } else {
      titleRef.current.innerHTML += `<br/> Congratulations : <img src=${Circle_Icon} alt="Draw"/> wins`;
    }
  };

  const reset = () => {
    data = ['', '', '', '', '', '', '', '', ''];
    setLock(false);
    titleRef.current.innerHTML = `<span>TicTacToe</span> Game`;
    document.querySelectorAll('.box').forEach((ele) => {
      ele.innerHTML = '';
    });
  };

  return (
    <div className="container">
      <h2 className="title" ref={titleRef}>
        <span>TicTacToe</span> Game
      </h2>
      <div className="board">
        {[...Array(9)].map((_, i) => (
          <div key={i} onClick={(e) => toggle(e, i)} className="box"></div>
        ))}
      </div>
      <button onClick={reset} className="reset" type="reset">
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
