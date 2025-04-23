import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './GameHistory.module.css';
import backgroundGif from "../assets/images/download.gif";

const GameHistory = () => {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        const userID = localStorage.getItem('userID');
        
        const response = await axios.get('http://localhost:5000/api/memory/history', {
          params: { userID }
        });
        
        setGameHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching game history:', err);
        setError('Failed to load game history. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchGameHistory();
  }, []);
  
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div
      className={styles.backgroundContainer}
      style={{
        backgroundImage: `url(${backgroundGif})`,
      }}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Memory Game</h1>
        </div>
        <h2 className={styles.title}>Game History</h2>
        
        <button 
          className={styles.button}
          onClick={() => navigate('/play')}
        >
          Back to Game
        </button>
        
        {loading ? (
          <div className={styles.loadingContainer}>
            <p className={styles.message}>Loading game history...</p>
          </div>
        ) : error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : gameHistory.length === 0 ? (
          <div className={styles.emptyHistory}>
            <p className={styles.message}>No game history found. Play some games to see your results here!</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Difficulty</th>
                  <th>Result</th>
                  <th>Time</th>
                  <th>Fails</th>
                </tr>
              </thead>
              <tbody>
                {gameHistory.map((game) => (
                  <tr key={game._id} className={game.completed ? styles.completedGame : styles.failedGame}>
                    <td>{formatDate(game.gameDate)}</td>
                    <td>{game.difficulty}</td>
                    <td>{game.completed ? 'Completed' : 'Failed'}</td>
                    <td>{formatTime(game.timeTaken)}</td>
                    <td>{game.failed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHistory;
