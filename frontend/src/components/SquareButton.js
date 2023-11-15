import { twMerge } from "tailwind-merge";
import { useRef } from "react";
function SquareButtonBorder(props) {
  return (
    <div
      className={twMerge(
        "transition-all delay-150 ease-in-out grid grid-cols-2",
        props.className
      )}
    >
      <div
        className={twMerge(
          "col-span-1 transition-all delay-150 duration-300 ease-in-out border-4 border-b-0 border-r-0",
          props.clicked
            ? "border-green-900 h-4 w-12"
            : "border-green-600 h-2 w-3"
        )}
      />
      <div
        className={twMerge(
          "col-span-1 justify-self-end transition-all delay-150 duration-300 ease-in-out border-4 border-b-0 border-l-0",
          props.clicked
            ? "border-green-900 h-8 w-6"
            : "border-green-600 h-2 w-3"
        )}
      />
      <div
        className={twMerge(
          "col-span-1 self-end transition-all delay-150 duration-300 ease-in-out border-4 border-t-0 border-r-0",
          props.clicked
            ? "border-green-900 h-4 w-8"
            : "border-green-600 h-2 w-3"
        )}
      />
      <div
        className={twMerge(
          "col-span-1 place-self-end transition-all delay-150 duration-300 ease-in-out border-4 border-t-0 border-l-0",
          props.clicked
            ? "border-green-900 h-4 w-6"
            : "border-green-600 h-2 w-3"
        )}
      />
    </div>
  );
}

function SquareButton(props) {
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        "flex relative justify-center items-start opacity-60 group",
        props.clicked && "opacity-80 backdrop-blur-sm bg-white/10",
        props.className
      )}
    >
      <SquareButtonBorder
        clicked={props.clicked}
        className={twMerge(
          "w-14 h-10",
          props.clicked ? "w-96 h-96" : "group-hover:w-20"
        )}
      />
      <div
        className={twMerge(
          "absolute h-[90%] top-5 right-0.5 w-full flex justify-start items-center gap-5 flex-col py-10 animate-fade-in overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent",
          !props.clicked && "hidden"
        )}
      >
        {props.children}
      </div>
    </button>
  );
}

export { SquareButton, SquareButtonBorder };
