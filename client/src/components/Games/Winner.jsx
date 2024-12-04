import React from "react";
import './Winner.css';

const WinnerModal = ({ winner, onClose }) => {
    if (!winner) return null;

    if (winner === 'tie'){
        return (
            <div className="modal-overlay">
                <div className="modal-container">
                    <h1>Tie!</h1>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="modal-overlay">
                <div className="modal-container">
                    <h1>{winner} Wins!</h1>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }
};

export default WinnerModal;