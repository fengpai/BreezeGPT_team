import React, { memo } from 'react';

import DeleteIcon from '@icon/DeleteIcon';

import BaseButton from './BaseButton';

const DeleteButton = memo(
  ({
    onClick,
  }: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }) => {
    return (
      <BaseButton icon={<DeleteIcon />} onClick={(e) => {
        onClick(e);
      }} />
    );
  }
);

export default DeleteButton;
