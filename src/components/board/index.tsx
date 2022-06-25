import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { calculateWinner } from '../../functions/calculateWinner';
import { GAME_CELL_STATE } from '../../utils/constants';
import { Modal } from '../modal';
import { Square } from '../square';

import styles from './board.module.scss';

interface Props {
  score: {
    [x: string]: number,
  },
  playerX: string,
  playerO: string,
  setScore: React.Dispatch<React.SetStateAction<{[x: string]: number;}>>;
}

const initValue: Array<GAME_CELL_STATE> = Array(9).fill(GAME_CELL_STATE.EMPTY);

export const Board: FC<Props> = memo((props) => {
  const {
    setScore,
    playerX,
    playerO,
    score,
  } = props;

  const [cells, setCells] = useState(initValue);
  const [isNext, setIsNext] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [counterTurns, setCounterTurns] = useState(0);

  const showModalWithContent = (content: string) => {
    setModalContent(content);
    setModalActive(true);
  };

  const onSelect = useCallback((index: number) => {
    setCounterTurns(prev => prev + 1);

    const turn = isNext ? GAME_CELL_STATE.X : GAME_CELL_STATE.O;

    setCells((prev) => {
      const copy = [...prev];

      copy[index] = turn;

      return copy;
    });

    setIsNext(prev => !prev);
  }, [isNext]);

  useEffect(() => {
    const winner = calculateWinner(cells);

    switch (winner) {
      case GAME_CELL_STATE.X:
        setScore((prev) => (
          {
            ...prev, [playerX]: prev[playerX] + 1,
          }));
        setCounterTurns(0);
        showModalWithContent(`${playerX} is winner!🏆🏆🏆`);
        break;

      case GAME_CELL_STATE.O:
        setScore((prev) => (
          {
            ...prev, [playerO]: prev[playerO] + 1,
          }));
        setCounterTurns(0);
        showModalWithContent(`${playerO} is winner!🏆🏆🏆`);
        break;

      default:
        if (counterTurns === 9) {
          setCounterTurns(0);
          showModalWithContent('friendship won!👬');
          setScore((prev) => ({ ...prev }));
        }

        break;
    }
  }, [cells]);

  useEffect(() => {
    setCells(initValue);
  }, [score]);

  const renderSquare = (index: number) => (
    <Square
      value={cells[index]}
      onSelect={() => {
        if (!cells[index]) {
          onSelect(index);
        }
      }}
    />
  );

  return (
    <>
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
      <Modal active={modalActive}>
        <h1>{modalContent}</h1>
        <button
          type="button"
          style={{
            width: '100%',
          }}
          onClick={() => setModalActive(false)}
        >
          Ok
        </button>
      </Modal>
    </>
  );
});
