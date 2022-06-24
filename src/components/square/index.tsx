/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React, { FC, memo } from 'react';
import { GAME_CELL_STATE } from '../../utils/constants';

import styles from './square.module.scss';

interface Props {
  value: GAME_CELL_STATE,
  onSelect: () => void,
}

export const Square: FC<Props> = memo((props) => {
  const {
    value,
    onSelect,
  } = props;

  const onClick = () => {
    onSelect();
  };

  return (
    <div
      onClick={onClick}
      className={classNames(
        styles.square,
        styles.state,
        {
          [styles['state--cross']]: value === GAME_CELL_STATE.X,
        },
        {
          [styles['state--circle']]: value === GAME_CELL_STATE.O,
        },
      )}
    >
    </div>
  );
});
