import * as React from "react";

export function Drop(props) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M336 176H376C386.609 176 396.783 180.214 404.284 187.716C411.786 195.217 416 205.391 416 216V424C416 434.609 411.786 444.783 404.284 452.284C396.783 459.786 386.609 464 376 464H136C125.391 464 115.217 459.786 107.716 452.284C100.214 444.783 96 434.609 96 424V216C96 205.391 100.214 195.217 107.716 187.716C115.217 180.214 125.391 176 136 176H176"
        stroke="black"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M176 272L256 352L336 272M256 48V336"
        stroke="black"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
