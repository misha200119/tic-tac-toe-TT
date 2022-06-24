/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  FC,
  memo,
  useCallback,
  useState,
} from 'react';
import { GAME_CELL_STATE } from '../../utils/constants';
import { Square } from '../square';

import styles from './board.module.scss';

interface Props {
  setScore: React.Dispatch<React.SetStateAction<{[x: string]: number;}>>;
}

const initValue = Array(9).fill(GAME_CELL_STATE.EMPTY);

export const Board: FC<Props> = memo((props) => {
  const { setScore } = props;

  const [cells, setCells] = useState(initValue);
  const [isNext, setIsNext] = useState(true);

  const onSelect = useCallback((index: number) => {
    const turn = isNext ? GAME_CELL_STATE.X : GAME_CELL_STATE.O;

    setCells((prev) => {
      const copy = [...prev];

      copy[index] = turn;

      return copy;
    });

    setIsNext(prev => !prev);
  }, [isNext]);

  const renderSquare = (index: number) => (
    <Square
      value={cells[index]}
      onSelect={() => onSelect(index)}
    />
  );

  return (
    <div className={styles.board}>
      <div className={styles.row}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.row}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.row}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
});
