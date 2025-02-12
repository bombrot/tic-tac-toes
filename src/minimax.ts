// let player = 'x', opponent = 'o';

function isMovesLeft(board: (string | null)[]) {
	for (let i = 0; i < board.length; i++)
		if (board[i] === null)
			return true;

	return false;
}

function evaluate(board: (string | null)[], player: string, opponent: string) {


	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				if (board[a] === player)
					return +10;
				else if (board[a] === opponent)
					return -10;
		}
	}
	return 0;
}

// This is the minimax function. It 
// considers all the possible ways 
// the game can go and returns the 
// value of the board 
function minimax(board: (string | null)[], depth: number, isMax: boolean, player: string, opponent: string) {
	let score = evaluate(board, player, opponent);

	// If Maximizer has won the game 
	// return his/her evaluated score 
	if (score == 10)
		return score;

	// If Minimizer has won the game 
	// return his/her evaluated score 
	if (score == -10)
		return score;

	// If there are no more moves and 
	// no winner then it is a tie 
	if (isMovesLeft(board) == false)
		return 0;

	// If this maximizer's move 
	if (isMax) {
		let best = -1000;

		// Traverse all cells 
		for (let i = 0; i < board.length; i++) {

				// Check if cell is empty 
				if (board[i] === null) {

					// Make the move 
					board[i] = player;

					// Call minimax recursively 
					// and choose the maximum value 
					best = Math.max(best, minimax(board,
						depth + 1, !isMax, player, opponent));

					// Undo the move 
					board[i] = null;
			}
		}
		return best;
	}

	// If this minimizer's move 
	else {
		let best = 1000;

		// Traverse all cells 
		for (let i = 0; i < board.length; i++) {

				// Check if cell is empty 
				if (board[i] === null) {

					// Make the move 
					board[i] = opponent;

					// Call minimax recursively and 
					// choose the minimum value 
					best = Math.min(best, minimax(board,
						depth + 1, !isMax, player,opponent));

					// Undo the move 
					board[i] = null;
			}
		}
		return best;
	}
}

// This will return the best possible 
// move for the player 
function findBestMove(board: (string | null)[], player: string, opponent: string) {
	let bestVal = -1000;
	let bestMove = -1;

	// Traverse all cells, evaluate 
	// minimax function for all empty 
	// cells. And return the cell 
	// with optimal value. 
	for (let i = 0; i < board.length; i++) {

			// Check if cell is empty 
			if (board[i] === null) {

				// Make the move 
				board[i] = player;

				// compute evaluation function 
				// for this move. 
				let moveVal = minimax(board, 0, false, player, opponent);

				// Undo the move 
				board[i] = null;

				// If the value of the current move 
				// is more than the best value, then 
				// update best 
				if (moveVal > bestVal) {
					bestMove = i
					bestVal = moveVal;
				}
		}
	}

	return bestMove;
}

export default { getMove: findBestMove }

