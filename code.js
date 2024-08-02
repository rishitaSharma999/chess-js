console.log("hello world");

// program start

class Spot {
  constructor(x, y, piece) {
    this.piece = piece;
    this.x = x;
    this.y = y;

    this.getPiece = function () {
      return this.piece;
    };

    this.getX = function () {
      return this.x;
    };

    this.getY = function () {
      return this.y;
    };

    this.setPiece = function (piece) {
      this.piece = piece;
    };
  }
}

class Piece {
  constructor(white) {
    if (new.target === Piece) {
      throw new Error("Cannot instantiate the abstract class");
    }
    this._killed = false;
    this._white = white;

    this.isWhite = function () {
      return this._white;
    };

    this.setWhite = function (white) {
      this._white = white;
    };

    this.isKilled = function () {
      return this._killed;
    };

    this.setKilled = function (killed) {
      this._killed = killed;
    };
  }

  // Abstract method
  validMove(board, start, end) {
    // No implementation here
  }
}

class Board {
  constructor() {
    let _checks = Array.from({ length: 8 }, () => Array(8).fill(null));
    this.getBoxes = function () {
      return _checks;
    };

    this.getBox = function (x, y) {
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        return _checks[x][y];
      }
      return null; // Return null if out of bounds
    };

    this.resetBoard = function () {
      _checks[0][0] = new Spot(0, 0, new Elephant(true));
      _checks[0][1] = new Spot(0, 1, new Horse(true));
      _checks[0][2] = new Spot(0, 2, new Camel(true));
      _checks[0][3] = new Spot(0, 3, new Queen(true));
      _checks[0][4] = new Spot(0, 4, new King(true));
      _checks[0][5] = new Spot(0, 5, new Camel(true));
      _checks[0][6] = new Spot(0, 6, new Horse(true));
      _checks[0][7] = new Spot(0, 7, new Elephant(true));

      _checks[1][0] = new Spot(1, 0, new Soldier(true));
      _checks[1][1] = new Spot(1, 1, new Soldier(true));
      _checks[1][2] = new Spot(1, 2, new Soldier(true));
      _checks[1][3] = new Spot(1, 3, new Soldier(true));
      _checks[1][4] = new Spot(1, 4, new Soldier(true));
      _checks[1][5] = new Spot(1, 5, new Soldier(true));
      _checks[1][6] = new Spot(1, 6, new Soldier(true));
      _checks[1][7] = new Spot(1, 7, new Soldier(true));

      _checks[7][0] = new Spot(7, 0, new Elephant(false));
      _checks[7][1] = new Spot(7, 1, new Horse(false));
      _checks[7][2] = new Spot(7, 2, new Camel(false));
      _checks[7][3] = new Spot(7, 3, new Queen(false));
      _checks[7][4] = new Spot(7, 4, new King(false));
      _checks[7][5] = new Spot(7, 5, new Camel(false));
      _checks[7][6] = new Spot(7, 6, new Horse(false));
      _checks[7][7] = new Spot(7, 7, new Elephant(false));

      _checks[6][0] = new Spot(6, 0, new Soldier(false));
      _checks[6][1] = new Spot(6, 1, new Soldier(false));
      _checks[6][2] = new Spot(6, 2, new Soldier(false));
      _checks[6][3] = new Spot(6, 3, new Soldier(false));
      _checks[6][4] = new Spot(6, 4, new Soldier(false));
      _checks[6][5] = new Spot(6, 5, new Soldier(false));
      _checks[6][6] = new Spot(6, 6, new Soldier(false));
      _checks[6][7] = new Spot(6, 7, new Soldier(false));

      for (let i = 2; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
          _checks[i][j] = new Spot(i, j, null);
        }
      }
    };
    this.resetBoard();
  }
}

class Queen extends Piece {
  constructor(white) {
    super(white);
  }

  validMove(board, start, end) {
    let x1 = start.getX();
    let y1 = start.getY();
    let x2 = end.getX();
    let y2 = end.getY();

    if (x1 == x2 && y1 != y2) {
      return true;
    } else if (x1 != x2 && y1 == y2) {
      return true;
    } else if (Math.abs(x1 - x2) == Math.abs(y1 - y2)) {
      return true;
    } else {
      return false;
    }
  }
}

class Soldier extends Piece {
  constructor(white) {
    super(white);
  }

  validMove(board, start, end) {
    let x1 = start.getX();
    let y1 = start.getY();
    let x2 = end.getX();
    let y2 = end.getY();

    let isWhite = start.getPiece().isWhite();

    if (x2 < 0 || x2 > 7 || y2 < 0 || y2 > 7) {
      return false;
    }

    if (isWhite) {
      if (y1 == y2) {
        if (x2 - x1 == 1 || x2-x1==2) {
          return true;
        }
      } else {
        if ((x2 - x1 == 1 || x2-x1==2) && (y2 - y1 == 1 || y2 - y1 == -1)) {
          return true;
        }
      }
    } else {
      if (y1 == y2) {
        if (x2 - x1 == -1 || x2-x1==-2) {
          return true;
        }
      } else {
        if ((x2 - x1 == -1|| x2-x1==-2) && (y2 - y1 == 1 || y2 - y1 == -1)) {
          return true;
        }
      }
    }

    return false;
  }
}

class King extends Piece {
  constructor(white) {
    super(white);
  }

  validMove(board, start, end) {
    let x1 = start.getX();
    let y1 = start.getY();
    let x2 = end.getX();
    let y2 = end.getY();

    if (Math.abs(x1 - x2) == 1 && y1 == y2) {
      return true;
    } else if (Math.abs(x1 - x2) == 1 && Math.abs(y1 - y2) == 1) {
      return true;
    } else {
      return false;
    }
  }
}

class Horse extends Piece {
  constructor(white) {
    super(white);
  }

  validMove(board, start, end) {
    let x1 = start.getX();
    let y1 = start.getY();
    let x2 = end.getX();
    let y2 = end.getY();

    let deltaX = Math.abs(x1 - x2);
    let deltaY = Math.abs(y1 - y2);

    return (deltaX == 2 && deltaY == 1) || (deltaX == 1 && deltaY == 2);
  }
}

class Elephant extends Piece {
  constructor(white) {
    super(white);
  }

  validMove(board, start, end) {
    let x1 = start.getX();
    let y1 = start.getY();
    let x2 = end.getX();
    let y2 = end.getY();

    if (x1 == x2 && y1 != y2) {
      let minY = Math.min(y1, y2) + 1;
      let maxY = Math.max(y1, y2);
      for (let y = minY; y < maxY; y++) {
        if (board.getBox(x1, y).getPiece() != null) {
          return false;
        }
      }
    } else if (y1 == y2 && x1 != x2) {
      let minX = Math.min(x1, x2) + 1;
      let maxX = Math.max(x1, x2);
      for (let x = minX; x < maxX; x++) {
        if (board.getBox(x, y1).getPiece() != null) {
          return false;
        }
      }
    } else {
      return false;
    }

    if (
      end.getPiece() == null ||
      end.getPiece().isWhite() != start.getPiece().isWhite()
    ) {
      return true;
    }

    return false;
  }
}

class Camel extends Piece {
  constructor(white) {
    super(white);
  }

  validMove(board, start, end) {
    let x1 = start.getX();
    let y1 = start.getY();
    let x2 = end.getX();
    let y2 = end.getY();

    if (Math.abs(x1 - x2) == Math.abs(y1 - y2)) {
      return true;
    } else {
      return false;
    }
  }
}

class Move {
  player;
  start;
  end;
  pieceMoved;
  pieceKilled;

  constructor(player, start, end) {
    this.player = player;
    this.start = start;
    this.end = end;
    this.pieceMoved = start.getPiece(); // initialize pieceMoved
    this.pieceKilled = null; // initialize pieceKilled
    // initialize castlingMove
  }
  getStart() {
    console.log(
      "this is inside getStart of Move class and start is  " + this.start.getX()
    );
    return this.start;
  }
  getEnd() {
    return this.end;
  }
  setPieceKilled(restPiece) {
    this.pieceKilled = restPiece;
  }
  getPieceKilled() {
    return this.pieceKilled;
  }
}

class Player {
  whiteSide;
  playerType;
  checkmated;

  constructor(whiteSide, playerType) {
    this.whiteSide = whiteSide;
    this.playerType = playerType;
  }

  isWhiteSide() {
    return this.whiteSide;
  }

  getPlayerType() {
    return this.playerType;
  }

  setPlayerType(playerType) {
    this.playerType = playerType;
  }

  isCheckmated() {
    return this.checkmated;
  }

  setCheckmated(checkmated) {
    this.checkmated = checkmated;
  }
}

class GameStatus {
  ACTIVE;
  BLACK_WIN;
  WHITE_WIN;
  FORFEIT;
  STALEMATE;
  RESIGNATION;
}

class Game {
  players = [];
  board;
  currentTurn;
  status;
  movesPlayed = [];

  constructor() {
    this.board = new Board();
    this.status = GameStatus.ACTIVE;
  }
  initialize(p1, p2) {
    this.players[0] = p1;
    this.players[1] = p2;

    this.board.resetBoard();

    if (p1.isWhiteSide()) {
      this.currentTurn = p1;
    } else {
      this.currentTurn = p2;
    }
    this.movesPlayed = [];
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }

  isEnd() {
    return this.getStatus() != GameStatus.ACTIVE;
  }

  makeMove(move, player) {
    console.log("move.getStart() = ", move.getStart());
    console.log("move.getEnd() = ", move.getEnd());
    let start = move.getStart();
    let end = move.getEnd();

    let sourcePiece = move.getStart() ? move.getStart().getPiece() : null;
    let restPiece = move.getEnd().getPiece();

    console.log("INITIALLY");

    if (sourcePiece instanceof King) {
      console.log("sourcePiece is an instance of King");
    } else if (sourcePiece instanceof Queen) {
      console.log("sourcePiece is an instance of Queen");
    } else if (sourcePiece instanceof Elephant) {
      console.log("sourcePiece is an instance of Elephant");
    } else if (sourcePiece instanceof Camel) {
      console.log("sourcePiece is an instance of Camel");
    } else if (sourcePiece instanceof Horse) {
      console.log("sourcePiece is an instance of Horse");
    } else if (sourcePiece instanceof Soldier) {
      console.log("sourcePiece is an instance of Soldier");
    } else {
      console.log("sourcePiece is of unknown type");
      return false;
    }

    console.log("Type of restPiece:", typeof restPiece);

    if (restPiece instanceof King) {
      console.log("restPiece is an instance of King");
    } else if (restPiece instanceof Queen) {
      console.log("restPiece is an instance of Queen");
    } else if (restPiece instanceof Elephant) {
      console.log("restPiece is an instance of Elephant");
    } else if (restPiece instanceof Camel) {
      console.log("restPiece is an instance of Camel");
    } else if (restPiece instanceof Horse) {
      console.log("restPiece is an instance of Horse");
    } else if (restPiece instanceof Soldier) {
      console.log("restPiece is an instance of Soldier");
    } else {
      console.log("restPiece is of unknown type");
    }

    if (sourcePiece == null) {
      console.log("sourcePiece is an empty spot (EmptyPiece)");
      return false;
    }

    if (player != this.currentTurn) {
      console.log("we retured false from 2");
      return false;
    }

    if (sourcePiece.isWhite() != player.isWhiteSide()) {
      console.log("we retured false from 3");
      return false;
    }

    if (!sourcePiece.validMove(this.board, start, end)) {
      console.log("we retured false from 4");
      return false;
    }

    if (restPiece != null) {
      restPiece.setKilled(true);
      move.setPieceKilled(restPiece);
    }

    this.movesPlayed.push(move);

    end.setPiece(start.getPiece());
    start.setPiece(null);

    console.log("FINALLY");

    let final_start = move.getStart().getPiece();
    let final_end = move.getEnd().getPiece();

    // Assuming `final_start` and `final_end` are the variables representing the objects
    console.log("Type of final_start:", typeof final_start);
    console.log("Type of final_end:", typeof final_end);

    // Using instanceof to check the specific class of final_start
    if (final_start instanceof King) {
      console.log("final_start is an instance of King");
    } else if (final_start instanceof Queen) {
      console.log("final_start is an instance of Queen");
    } else if (final_start instanceof Elephant) {
      console.log("final_start is an instance of Elephant");
    } else if (final_start instanceof Camel) {
      console.log("final_start is an instance of Camel");
    } else if (final_start instanceof Horse) {
      console.log("final_start is an instance of Horse");
    } else if (final_start instanceof Soldier) {
      console.log("final_start is an instance of Soldier");
    } else {
      console.log("final_start is of unknown type");
    }

    // Using instanceof to check the specific class of final_end
    if (final_end instanceof King) {
      console.log("final_end is an instance of King");
    } else if (final_end instanceof Queen) {
      console.log("final_end is an instance of Queen");
    } else if (final_end instanceof Elephant) {
      console.log("final_end is an instance of Elephant");
    } else if (final_end instanceof Camel) {
      console.log("final_end is an instance of Camel");
    } else if (final_end instanceof Horse) {
      console.log("final_end is an instance of Horse");
    } else if (final_end instanceof Soldier) {
      console.log("final_end is an instance of Soldier");
    } else {
      console.log("final_end is of unknown type");
    }

    if (restPiece instanceof King) {
      if (player.isWhiteSide()) {
        this.setStatus(GameStatus.WHITE_WIN);
      } else {
        this.setStatus(GameStatus.BLACK_WIN);
      }
    }

    if (this.currentTurn == this.players[0]) {
      this.currentTurn = this.players[1];
    } else {
      this.currentTurn = this.players[0];
    }

    return true;
  }
  playerMove(player, startX, startY, endX, endY) {
    console.log("this is the board value " + this.board);
    let startBox = this.board.getBox(startX, startY);
    let endBox = this.board.getBox(endX, endY);
    console.log(
      "this is startBox and endBox " + startBox.getX() + " " + startBox.getY()
    );
    let move = new Move(player, startBox, endBox);
    console.log(
      "this is inside Game playerMove" +
        startBox.getX() +
        " " +
        startBox.getY() +
        " " +
        endBox.getPiece()
    );
    return this.makeMove(move, player);
  }
  getCurrentTurn() {
    return this.currentTurn;
  }
}

class PlayerType {
  HUMAN;
  COMPUTER;
}

class ComputerPlayer extends Player {
  constructor(whiteSide) {
    super(whiteSide, PlayerType.COMPUTER);
  }
}

class HumanPlayer extends Player {
  constructor(whiteSide) {
    super(whiteSide, PlayerType.HUMAN);
  }
}

class Main {
  displayBoard(game) {
    let spots = game.board.getBoxes();

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let spot = spots[i][j];
        let piece = spot.getPiece();

        if (piece == null) {
          // Empty spot
          console.log("- ");
        } else {
          // Display the piece based on its type
          if (piece instanceof King) {
            console.log(piece.isWhite() ? "K " : "k ");
          } else if (piece instanceof Queen) {
            console.log(piece.isWhite() ? "Q " : "q ");
          } else if (piece instanceof Elephant) {
            console.log(piece.isWhite() ? "E " : "e ");
          } else if (piece instanceof Camel) {
            console.log(piece.isWhite() ? "C " : "c ");
          } else if (piece instanceof Horse) {
            console.log(piece.isWhite() ? "H " : "h ");
          } else if (piece instanceof Soldier) {
            console.log(piece.isWhite() ? "S " : "s ");
          }
        }
      }
      console.log(); // Move to the next row
    }
  }

  updateBoard(game) {
    const board = game.board.getBoxes();
    const chessBoard = document.querySelector(".chess-board");
    const rows = chessBoard.querySelectorAll("tr");

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j].getPiece();
        //console.log(`Processing piece at position (${i}, ${j})`);
        //console.log(`Piece: ${piece}`);

        const cell = rows[i].querySelector(`td:nth-child(${j + 1})`);
        //console.log(`Cell: ${cell}`);

        const buttonElement = cell.querySelector("button");
        //console.log(`Button element: ${buttonElement}`);

        let imgElement = buttonElement.querySelector("img");
        //console.log(`Img element: ${imgElement}`);
        

        if (piece === null) {
          if (!imgElement) {
            imgElement = document.createElement("img");
            buttonElement.appendChild(imgElement);
            //console.log(`Created new img element and appended to button`);
          }
          imgElement.src = "./img/file.png";
          
            //imgElement.style.opacity = "0.02"; // adjust the opacity value to your liking
          
        } else {
          //console.log(`Piece is not null, setting piece image`);
          let pieceImage = "";
          if (piece instanceof King) {
            pieceImage = piece.isWhite() ? "white_king.png" : "black_king.png";
          } else if (piece instanceof Queen) {
            pieceImage = piece.isWhite() ? "white_queen.png" : "black_queen.png";
          } else if (piece instanceof Elephant) {
            pieceImage = piece.isWhite() ? "white_elephant.png" : "black_elephant.png";
          } else if (piece instanceof Camel) {
            pieceImage = piece.isWhite() ? "white_camel.png" : "black_camel.png";
          } else if (piece instanceof Horse) {
            pieceImage = piece.isWhite() ? "white_horse.png" : "black_horse.png";
          } else if (piece instanceof Soldier) {
            pieceImage = piece.isWhite() ? "white_sol.png" : "black_sol.png";
          }
          //console.log(`Piece image: ${pieceImage}`);
          if (!imgElement) {
            imgElement = document.createElement("img");
            buttonElement.appendChild(imgElement);
            //console.log(`Created new img element and appended to button`);
          }
          imgElement.src = `./img/${pieceImage}`;
          //console.log(`Set imgElement.src to ${imgElement.src}`);

        // Add this line to check if the imgElement is being updated
        //console.log(`Img element outerHTML: ${imgElement.outerHTML}`);
        }
      }
    }
  }

  waitForButtonClick() {
    return new Promise((resolve) => {
      // Select the chess board
      const chessBoard = document.querySelector(".chess-board");

      // Add an event listener for clicks on the chess board
      const handleClick = function (event) {
        // Check if the clicked element is a button
        const button = event.target.closest("button");

        if (button) {
          // Get the row and column of the button
          const cell = button.closest("td");
          const row = cell.parentNode;
          const rowIndex = Array.from(row.parentNode.children).indexOf(row);
          const colIndex = Array.from(cell.parentNode.children).indexOf(cell);

          // Remove the event listener after the button is clicked
          chessBoard.removeEventListener("click", handleClick);

          // Resolve the promise with the row and column indices
          resolve({ rowIndex, colIndex });
        }
      };

      // Attach the event listener
      chessBoard.addEventListener("click", handleClick);
    });
  }

  async gameLoop(game, ob, player1) {
   // const moveStatusElement = document.querySelector(".move-status");
   const moveStatusElement = document.querySelector("#move-status");

    while (!game.isEnd()) {
      ob.displayBoard(game);
      ob.updateBoard(game);
      console.log(
        `Player ${
          game.getCurrentTurn() === player1 ? "1 (White)" : "2 (Black)"
        }, enter your move:`
      );

      moveStatusElement.textContent = `Player ${
        game.getCurrentTurn() === player1 ? "1 (White)" : "2 (Black)"
      }'s turn`;

      // Wait for the user to click a button to select the start position
      console.log("Select the start position:");
      const startPosition = await this.waitForButtonClick();
      const { rowIndex: startX, colIndex: startY } = startPosition;

      // Wait for the user to click a button to select the end position
      console.log("Select the end position:");
      const endPosition = await this.waitForButtonClick();
      const { rowIndex: endX, colIndex: endY } = endPosition;

      console.log(`Start position: (${startX}, ${startY})`);
      console.log(`End position: (${endX}, ${endY})`);

      

      // Perform the move and check if it is valid
      const validMove = game.playerMove(
        game.getCurrentTurn(),
        startX,
        startY,
        endX,
        endY
      );
      if (validMove) {
        console.log("Valid move. Continuing to the next turn.");
        moveStatusElement.textContent = "Valid move!";
      } else {
        console.log("Invalid move. Try again.");
        moveStatusElement.textContent = "Invalid move! Try again.";
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    moveStatusElement.textContent = "";
    }

    ob.displayBoard(game);
    ob.updateBoard(game);
    console.log("Game over! Result: " + game.getStatus());
    moveStatusElement.textContent = "Game over! Result: " + game.getStatus();
  }

  main() {
    let game = new Game();
    let player1 = new HumanPlayer(true);
    let player2 = new HumanPlayer(false);

    let board = new Board();

    game.initialize(player1, player2);

    game.setStatus(GameStatus.ACTIVE);

    this.gameLoop(game, ob, player1);

    this.displayBoard(game);
    console.log("Game over! Result: " + game.getStatus());
  }
  myFunction() {
    alert("Hello World!");
  }
}
let ob = new Main();
ob.main();
