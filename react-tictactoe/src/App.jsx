import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Card, CardContent, Grid } from "@mui/material";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem("scores");
    return saved ? JSON.parse(saved) : { X: 0, O: 0, Draws: 0 };
  });

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
    document.body.style.backgroundColor = "#f0e4d7"; 
  }, [scores]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScores((prev) => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
    } else if (newBoard.every((square) => square)) {
      setWinner("Draw");
      setScores((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 4,
        p: 2,
      }}
    >
     
      <Card
        sx={{
          p: 3,
          boxShadow: 6,
          minWidth: 260,
          backgroundColor: "#8B4513",
          transform: "scale(0)",
          animation: "scaleIn 0.6s forwards",
        }}
      >
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "#fff" }}>
            🎮 Tic-Tac-Toe
          </Typography>

          {/* Board */}
          <Grid container spacing={1} sx={{ width: 240, margin: "0 auto" }}>
            {board.map((square, i) => (
              <Grid item xs={4} key={i}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleClick(i)}
                  sx={{
                    aspectRatio: "1 / 1",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    bgcolor:
                      square === "X" ? "red" : square === "O" ? "black" : "#fff",
                    color: square ? "#fff" : "black",
                    transition: "transform 0.2s, background-color 0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      bgcolor:
                        square === "X"
                          ? "#cc0000"
                          : square === "O"
                          ? "#333333"
                          : "#e0e0e0",
                    },
                  }}
                >
                  {square}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 2, color: winner ? "green" : "blue" }}
          >
            {winner
              ? winner === "Draw"
                ? "It's a Draw!"
                : `Winner: ${winner}`
              : `Next Player: ${xIsNext ? "X" : "O"}`}
          </Typography>

          <Box textAlign="center" mt={2}>
            <Button variant="contained" color="error" onClick={resetGame}>
              RESET GAME
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          p: 2,
          minWidth: 200,
          backgroundColor: "#8B4513",
          color: "#fff",
          boxShadow: 6,
          transform: "translateY(-50px)",
          animation: "slideIn 0.6s forwards",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🏆 Scoreboard
          </Typography>
          <Typography>X: {scores.X}</Typography>
          <Typography>O: {scores.O}</Typography>
          <Typography>Draws: {scores.Draws}</Typography>
        </CardContent>
      </Card>

      
      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
}

export default App;
