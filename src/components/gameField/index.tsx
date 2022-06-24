/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, memo, useState } from 'react';
import { Board } from '../board';

import styles from './gameField.module.scss';

interface Props {
  firstPalayerName: string;
  secondPlayerName: string;
}

export const GameField: FC<Props> = memo((props) => {
  const {
    firstPalayerName,
    secondPlayerName,
  } = props;

  const initScore = {
    [firstPalayerName]: 0,
    [secondPlayerName]: 0,
  };

  const [score, setScore] = useState(initScore);

  return (
    <div className={styles.gameField}>
      <div className={styles.boardContainer}>
        <Board setScore={setScore} />
      </div>

      <div className={styles.scoreContainer}>
        <h2>Score</h2>

        <p>
          {firstPalayerName}
          :
          {score[firstPalayerName]}
        </p>

        <p>
          {secondPlayerName}
          :
          {score[secondPlayerName]}
        </p>
      </div>
    </div>
  );
});
