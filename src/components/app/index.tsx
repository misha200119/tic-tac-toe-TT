// i wraped inputs in lable so i don't need htmlFor props

/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, memo, SyntheticEvent } from 'react';
import { GameField } from '../gameField';
import { Modal } from '../modal';

import styles from './app.module.scss';

export const App: React.FC = memo(() => {
  const [modalActive, setModalActive] = useState(true);
  const [firstPalayerName, setFirstPlayerName] = useState('');
  const [secondPlayerName, setSecondPlayerName] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setModalActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        { !modalActive
        && (
          <div className={styles.squareContainer}>
            <GameField firstPalayerName={firstPalayerName} secondPlayerName={secondPlayerName} />
          </div>
        )}
      </div>

      <Modal active={modalActive}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <label>
            <p
              style={{
                marginRight: '5px',
                display: 'inline',
              }}
            >
              X player -
            </p>
            <input
              type="text"
              value={firstPalayerName}
              onChange={({ target }) => setFirstPlayerName(target.value)}
              required
            />
          </label>

          <label>
            <p
              style={{
                marginRight: '5px',
                display: 'inline',
              }}
            >
              O player -
            </p>
            <input
              type="text"
              value={secondPlayerName}
              onChange={({ target }) => setSecondPlayerName(target.value)}
              required
            />
          </label>

          <button type="submit">
            Create game
          </button>
        </form>
      </Modal>
    </div>
  );
});
