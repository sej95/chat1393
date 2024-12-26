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
  <defs>
    <style>
      .cls-1 {
        font-size: 204px;
        fill: #000;
        font-family: "Microsoft YaHei";
        font-weight: 700;
      }
    </style>
  </defs>
  <text id="IuaiChat" class="cls-1" x="58" y="245">IuaiChat</text>
  </svg>
));

export default LobeChatText;
