import React, { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./ChartPanel.module.css";
import DisplayChart from "./DisplayChart/DisplayChart";
import ChartVisualization from "../../../ChartVisualization/ChartVisualization";

const ChartPanel = forwardRef( ({
  data,
  handleMove,
  stepSize,
  maxValue,
  initialPosition,
  initialTime
}, ref) => {
  const visualizationRef = useRef();

  useImperativeHandle(ref, () => ({
    reset: visualizationRef.current.reset
  }));

  return (
    <div className={styles["chart-panel"]}>
      <DisplayChart data={data} />
      <ChartVisualization
        key={data}
        ref={visualizationRef}
        handleMove={handleMove}
        stepSize={stepSize}
        maxValue={maxValue}
        initialTime={initialTime}
        initialPosition={initialPosition}
      />
    </div>
  );
});

export default ChartPanel;
