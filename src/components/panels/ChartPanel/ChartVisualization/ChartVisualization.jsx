import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./ChartVisualization.module.css";

const ChartVisualization = forwardRef( ({
  initialTime = 0,
  maxValue = 1.29,
  handleMove = (t) => Math.sin(t),
  stepSize,
}, ref) => {
  const [isMoving, setIsMoving] = useState(false);
  const [position, setPosition] = useState(0);
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef(null); // To control the animation interval

  const toggleMovement = () => {
    setIsMoving((prev) => !prev);
  };

  const styledPosition = useMemo(
    () => {
      let uiPosition = position
      if (position >= maxValue) {
        uiPosition = maxValue;
      } else if (position <= -maxValue) {
        uiPosition = -maxValue;
      }
      return `calc(${(uiPosition / maxValue) * 50}% + 50%)`;
    },
    [position, maxValue]
  );

  useEffect(() => {
    if (isMoving) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          return (+prevTime ?? 0) + +stepSize;
        });
      }, 100); // Adjust the interval time to control the speed
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [isMoving, stepSize]);

  useEffect(() => {
    setPosition(() => handleMove(time));
  }, [time]);

  const reset = useCallback((handlePosition) => {
    setTime(initialTime);
    handlePosition && setPosition(handlePosition(initialTime))
  }, [initialTime]);


  useImperativeHandle(ref, () => ({
    reset
  }))

  
  return (
    <div className={styles["chart-visualization"]}>
      <div className={styles["slider-track"]}>
        <div className={styles["slider-label"]}>{-maxValue.toFixed(2)}</div>
        <div className={styles["slider"]} style={{ left: styledPosition }}>
          <div className={styles["slider-handle"]} />
        </div>
        <div className={styles["slider-label"]}>{+maxValue.toFixed(2)}</div>
      </div>
      <div>
        t:{" "}{Number.parseFloat(time).toFixed(2)}
      </div>
      <div>
        x(t):{" "}{Number.parseFloat(position).toFixed(2)}
      </div>
      <br />
      <button onClick={toggleMovement}>
        {isMoving ? "Stop" : "Visualize"}
      </button>
    </div>
  );
});

export default ChartVisualization;
