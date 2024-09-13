import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./InputPanel.module.css";

const VALUES_STEP = 0.1;

const InputPanel = ({ onCalculate }) => {
  const [mass, setMass] = useState(1.0);
  const [c, setC] = useState(1.5);
  const [x0, setX0] = useState(1.0);

  const [v0, setV0] = useState(1.5);
  const [steps, setSteps] = useState(100);
  const [stepSize, setStepSize] = useState(0.01);

  const k = useMemo(() => Math.sqrt(c / mass), [c, mass]);
  const A = useMemo(() => x0, [x0]);
  const B = useMemo(() => k / v0, [k, v0]);
  const alpha = useMemo(() => Math.atan(A/B), [A,B] )

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const maxValue = Math.sqrt(A * A + B * B);
      const positionFunc = (t) => maxValue * Math.sin(k * t + alpha);
      const velocityFunc = (t) => maxValue * k * Math.cos(k * t + alpha);

      const data = Array.from({ length: steps }, (_, i) => {
        const x = i * stepSize;
        return {
          t: x,
          position: positionFunc(x),
          velocity: velocityFunc(x),
        };
      });

      onCalculate &&
        onCalculate({
          data,
          maxValue,
          positionFunc,
          velocityFunc,
          stepSize,
        });
    },
    [k, A, B, steps, stepSize, alpha]
  );

  useEffect(() => {
    handleSubmit({preventDefault: () => {}})
  }, [handleSubmit])


  return (
    <div className={styles.inputPanel}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <label>m: </label>
          <input
            type="number"
            value={mass}
            step={VALUES_STEP}
            min={0.1}
            onChange={(e) => setMass(e.target.value)}
          />{" "}
          kg
        </div>
        <div className={styles.inputField}>
          <label>c: </label>
          <input
            type="number"
            value={c}
            step={VALUES_STEP}
            min={0.1}
            onChange={(e) => setC(e.target.value)}
          />{" "}
          N/kg
        </div>
        <div className={styles.inputField}>
          <label>x0: </label>
          <input
            type="number"
            value={x0}
            step={VALUES_STEP}
            onChange={(e) => setX0(e.target.value)}
          />{" "}
          m
        </div>
        <div className={styles.inputField}>
          <label>v0: </label>
          <input
            type="number"
            value={v0}
            step={VALUES_STEP}
            onChange={(e) => setV0(e.target.value)}
          />{" "}
          m/s
        </div>
        <div className={styles.inputField}>
          <label>Steps: </label>
          <input
            type="number"
            value={steps}
            step={VALUES_STEP}
            min={1}
            max={1000}
            onChange={(e) => setSteps(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <label>Step Size: </label>
          <input
            type="number"
            value={stepSize}
            min={10e-7}
            step={10e-7}
            max={1}
            onChange={(e) => setStepSize(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default InputPanel;
