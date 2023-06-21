import React from 'react';
import { useAtBottom, useScrollToBottom } from 'react-scroll-to-bottom';

import DownArrow from '@icon/DownArrow';

const ScrollToBottomButton = React.memo(() => {
  const scrollToBottom = useScrollToBottom();
  const [atBottom] = useAtBottom();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    scrollToBottom();
  };

  return (
    <button
      className={`cursor-pointer absolute right-6 bottom-[80px] md:bottom-[80px] z-10 rounded-full border border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200 ${
        atBottom ? 'hidden' : ''
      }`}
      onClick={handleClick}
    >
      <DownArrow />
    </button>
  );
});

export default ScrollToBottomButton;