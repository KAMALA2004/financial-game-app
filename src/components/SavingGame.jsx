import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDrag, useDrop } from 'react-dnd';
import '../styles/SavingGame.css';
import piggyBankImage from '../assets/my-piggy-bank.png'; 
import coinImage from '../assets/coin.png'; 

const ItemTypes = {
  COIN: 'coin',
};

const Coin = ({ onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COIN,
    item: { type: ItemTypes.COIN },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        onDrop();
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <motion.img
      ref={drag}
      src={coinImage}
      alt="Coin"
      className="coin"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
      }}
      whileTap={{ scale: 0.9 }}
    />
  );
};

const PiggyBank = ({ onDropCoin }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.COIN,
    drop: () => ({ name: 'PiggyBank' }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <motion.div
      ref={drop}
      className="piggy-bank"
      whileHover={{ scale: 1.1 }}
      animate={{ y: isOver ? -10 : 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <img src={piggyBankImage} alt="Piggy Bank" className="piggy-bank-image" />
    </motion.div>
  );
};

const SavingGame = () => {
  const [coins, setCoins] = useState(0);
  const [goal, setGoal] = useState(50);  // Set a saving goal

  const handleDropCoin = () => {
    setCoins(coins + 1);
  };

  return (
    <div className="saving-game">
      <h1>Saving Game</h1>
      <div className="coin-container">
        <Coin onDrop={handleDropCoin} />
      </div>
      <div className="piggy-bank-container">
        <PiggyBank onDropCoin={handleDropCoin} />
      </div>
      <div className="progress">
        <h2>Coins Saved: {coins}</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(coins / goal) * 100}%` }}
          />
        </div>
        <p>Goal: {goal} Coins</p>
      </div>
    </div>
  );
};

export default SavingGame;
