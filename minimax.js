function bestMove() {
  let bestScore = -Infinity;
  let minDepth = Infinity;
  let move = {i: 0, j:0};
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        board[i][j] = ai;
        let r = minimax(board, 0, false, -Infinity, +Infinity);
        let score = r.s;
        let depth = r.d;
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          minDepth = depth;
          move = { i, j };
        } else if (score == bestScore && depth < minDepth) {
          minDepth = depth;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: 1,
  O: -1,
  tie: 0
};

function minimax(board, depth, isMaximizing, alpha, beta) {
  let result = checkWinner();
  if (result !== null) {
    return {s: scores[result], d: depth};
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestDepth = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = ai;
          let r = minimax(board, depth + 1, false, alpha, beta);
          let score = r.s;
          let d = r.d;
          board[i][j] = '';
          alpha = max(alpha, score);
          if(score > bestScore) {
            bestScore = score;
            bestDepth = d;
            if(beta <= alpha)
              break;
          } else if (score == bestScore && d < bestDepth) {
            bestDepth = d;
          }
        }
      }
    }
    return {s: bestScore, d: bestDepth};
  } else {
    let bestScore = Infinity;
    let bestDepth = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let r = minimax(board, depth + 1, true, alpha, beta);
          let score = r.s;
          let d = r.d;
          board[i][j] = '';
          beta = min(score, beta);
          if(score < bestScore) {
            bestScore = score;
            bestDepth = d;
            if (beta <= alpha)
              break;
          } else if (score == bestScore && d < bestDepth) {
            bestDepth = d;
          }
        }
      }
    }
    return {s: bestScore, d: bestDepth};
  }
}
