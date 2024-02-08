import * as React from "react";

export function Cancel(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 12.661l4.933 5.05c.495.51.816.515 1.32 0l.99-1.014c.485-.496.518-.822 0-1.352L12.02 10l5.222-5.345c.49-.503.499-.842 0-1.353l-.99-1.012c-.512-.526-.83-.502-1.32 0l-4.932 5.05-4.932-5.05c-.49-.501-.807-.526-1.32 0l-.99 1.013c-.499.51-.49.85 0 1.352L7.98 10 2.76 15.345c-.518.53-.49.856 0 1.352l.99 1.014c.499.515.82.51 1.32 0L10 12.66z"
        fill="#000"
      />
    </svg>
  );
}
