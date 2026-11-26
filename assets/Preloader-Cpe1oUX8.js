import { r as React } from "./index--rniiPa8.js";

function Preloader({ onComplete, onExitStart }) {
  React.useEffect(() => {
    if (onExitStart) onExitStart();
    if (onComplete) onComplete();
  }, [onComplete, onExitStart]);

  return null;
}

export { Preloader as default };
