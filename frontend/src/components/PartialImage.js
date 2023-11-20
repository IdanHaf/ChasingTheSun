import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function PartialImage(props) {
    const images = props.images;
    const [imgIndex, setImgIndex] = useState(0);
    // increase precentage until next index
    const [precentage, setPrecentage] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (imgIndex >= images.length) {
          console.log("clear");
          clearInterval(interval);
          return;
        } else {
          setPrecentage((precentage) => {
            if (precentage >= 100) {
              setImgIndex((ind) => ind + 1);
              return 0;
            }
            return precentage + 1;
          });
        }
      }, 200);
      return () => clearInterval(interval);
    }, [imgIndex]);
  
    return (
      <div
        className={twMerge(
          "absolute left-20 top-10 flex flex-col justify-center items-center gap-1 w-48 h-48 group",
          props.className
        )}
      >
        {imgIndex < images.length ? (
          <>
            <div className="flex flex-col justify-center opacity-80 items-center w-40 h-40 select-none border backdrop-blur-sm group-hover:w-48 group-hover:h-48 transition-all">
              <img
                src={images[imgIndex]}
                className="h-36 w-36 bg-black group-hover:h-40 group-hover:w-40 transition-all contrast-[.8]"
              />
              {/* <div className="bg-red-500 h-4 w-4"></div> */}
            </div>
            <LoadingBar
              className="w-40 h-2 group-hover:w-48 transition-all"
              precentage={precentage}
            />{" "}
          </>
        ) : (
          <div className="flex flex-col justify-center opacity-80 items-center w-32 h-32 select-none border backdrop-blur-sm transition-all"></div>
        )}
      </div>
    );
  }
  

    function LoadingBar(props) {
        return (
        <div className={twMerge("w-full h-full", props.className)}>
            <div
            className="bg-green-500 h-full"
            style={{ width: `${props.precentage}%` }}
            ></div>
        </div>
        );
    }

export default PartialImage;