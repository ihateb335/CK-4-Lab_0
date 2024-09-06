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
  maxValue = 1.29,
  handleMove = (t) => Math.sin(t),
  stepSize,
}, ref) => {
  const [isMoving, setIsMoving] = useState(false);
  const [position, setPosition] = useState(0);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null); // To control the animation interval

  const toggleMovement = () => {
    setIsMoving((prev) => !prev);
  };

  const styledPosition = useMemo(
    () => `calc(${(position / maxValue) * 50}% + 50%)`,
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
    setPosition(() => {
      const newPosition = handleMove(time);
      if (newPosition >= maxValue) {
        clearInterval(intervalRef.current);
        return maxValue;
      } else if (newPosition <= -maxValue) {
        clearInterval(intervalRef.current);
        return -maxValue;
      }
      return newPosition;
    });
  }, [time]);

  const reset = useCallback((handlePosition) => {
    setTime(0);
    handlePosition && setPosition(handlePosition(0))
  }, []);


  useImperativeHandle(ref, () => ({
    reset
  }))

  
  return (
    <div className={styles["chart-visualization"]}>
      <div className={styles["slider-track"]}>
        <div className={styles["slider-label"]}>{+maxValue.toFixed(2)}</div>
        <div className={styles["slider"]} style={{ left: styledPosition }}>
          <div className={styles["slider-handle"]} />
        </div>
        <div className={styles["slider-label"]}>{-maxValue.toFixed(2)}</div>
      </div>
      <div>
        t:{" "}
        <input
          type="number"
          value={time}
          step={0.1}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button onClick={toggleMovement}>
        {isMoving ? "Stop" : "Visualize"}
      </button>
    </div>
  );
});

export default ChartVisualization;
