import React, { useRef, useState } from "react";
import InputPanel from "./panels/InputPanel/InputPanel";
import ChartPanel from "../panels/ChartPanel/ChartPanel";
import styles from "./Lab1.module.css";

function Lab1() {
  const [data, setData] = useState(null);
  const chartPanelRef = useRef();

  const handleCalculate = (data) => {
    setData(data);
    chartPanelRef.current.reset(data?.positionFunc);
  };

  return (
    <div className={styles["app-container"]}>
      <div className={styles["chart-side"]}>
        <ChartPanel
          data={data?.data}
          ref={chartPanelRef}
          handleMove={data?.positionFunc}
          stepSize={data?.stepSize}
          maxValue={data?.maxValue}
          initialTime={data?.initialTime}
        />
      </div>
      <div className={styles["input-side"]}>
        <InputPanel onCalculate={handleCalculate} />
      </div>
    </div>
  );
}

export default Lab1;
