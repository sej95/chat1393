import { memo } from 'react';

const LobeChatText = memo<{ size?: number }>(({ size = '1em' }) => (
  <svg
    fill="currentColor"
    fillRule="evenodd"
    height={size}
    style={{ flex: 'none', lineHeight: 1, opacity: 0.6 }}
    viewBox="0 0 980 320"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>IuaiChat</title>
    <path
      className="animate-draw"
      d="M696.999 135.08c-.455.472-.895.949-1.32 1.434V77h-34.98v162.8h35.42v-69.52c0-2.933.514-5.573 1.54-7.92a18.279 18.279 0 014.4-6.16c2.054-1.907 4.4-3.3 7.04-4.18 2.64-1.027 5.5-1.54 8.58-1.54 3.96-.147 7.26.513 9.9 1.98 2.64 1.467 4.62 3.74 5.94 6.82 1.32 3.08 1.98 6.967 1.98 11.66v68.86h35.42v-71.5c0-10.413-1.54-19.14-4.62-26.18-2.933-7.187-7.406-12.54-13.42-16.06-6.013-3.667-13.42-5.5-22.22-5.5-6.453 0-12.613 1.32-18.48 3.96-5.866 2.64-10.926 6.16-15.18 10.56zM15 240.035V87.172h39.24V205.75h66.192v34.285H15z"
    />
  </svg>
));

export default LobeChatText;
