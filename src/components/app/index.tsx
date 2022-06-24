import React from 'react';
import { GameField } from '../gameField';

import styles from './app.module.scss';

export const App: React.FC = () => (
  <div className={styles.wrapper}>
    {/* <div className={styles.header}>
      header
    </div> */}

    <div className={styles.main}>
      <div className={styles.squareContainer}>
        <GameField firstPalayerName="misha" secondPlayerName="radik" />
      </div>
    </div>

    {/* <div className={styles.footer}>
      footer
    </div> */}
  </div>
);
