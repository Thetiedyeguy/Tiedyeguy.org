import React, { useState } from "react";
import TicTacToe from "./TicTacToe";
import ConnectFour from "./ConnectFour";

const GameContent = () => {
    const [selectedGame, setSelectedGame] = useState('TicTacToe');

    const renderGame = () => {
        switch(selectedGame) {
            case 'Tic-Tac-Toe':
                return <TicTacToe />;
            case 'Connect Four':
                return <ConnectFour />;
            default:
                return <p>Select a game from the dropdown</p>
        }
    }

    return (
        <div>
            <center>  
                <select onChange={(e) => setSelectedGame(e.target.value)} name="games" id="games">
                    <option value="Tic-Tac-Toe">Tic-Tac-Toe</option>
                    <option value="Connect Four">Connect Four</option>
                </select>
            </center>
            <center>{renderGame()}</center>
        </div>
    );
};

export default GameContent;