import classNames from 'classnames';
import React, { FC, memo } from 'react';

import styles from './modal.module.scss';

interface Props {
  active: boolean
}

export const Modal: FC<Props> = memo((props) => {
  const { active, children } = props;

  return (
    <div className={classNames(
      styles.modal,
      {
        [styles['modal--active']]: active,
      },
    )}
    >
      <div className={styles.modal__content}>
        {children}
      </div>
    </div>
  );
});
