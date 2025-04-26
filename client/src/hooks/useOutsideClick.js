import { useEffect, useRef } from "react";

export function useOutsideClick(close) {
  const ref = useRef();

  useEffect(
    function () {
      const outsideClick = (event) => {
        if (!ref.current.contains(event.target)) close();
      };
      window.addEventListener("click", outsideClick);

      return () => window.removeEventListener("click", outsideClick);
    },
    [close]
  );

  return ref;
}
