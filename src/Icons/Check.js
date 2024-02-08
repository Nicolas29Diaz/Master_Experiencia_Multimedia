import * as React from "react";

export function Check(props) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 0C7.168 0 0 7.168 0 16s7.168 16 16 16 16-7.168 16-16S24.832 0 16 0zm-3.2 24l-8-8 2.256-2.256 5.744 5.728L24.944 7.328 27.2 9.6 12.8 24z"
        fill="#68CC58"
      />
    </svg>
  );
}
