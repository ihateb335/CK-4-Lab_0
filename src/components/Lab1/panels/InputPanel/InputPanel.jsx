import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./InputPanel.module.css";
import { BLessThanK, KEqualsB, KLessThanB } from "../../../../utils/helpers/Lab1Functions";

const VALUES_STEP = 0.1;

const InputPanel = ({ onCalculate }) => {
  const [mass, setMass] = useState(1.0);
  const [c, setC] = useState(1.5);
  const [x0, setX0] = useState(1.0);

  const [v0, setV0] = useState(1.5);
  const [mu, setMu] = useState(0.1);
  const [time, setTime] = useState(0);
  const [steps, setSteps] = useState(100);
  const [stepSize, setStepSize] = useState(0.1);

  const k = useMemo(() => Math.sqrt(c / mass), [c, mass]);
  const b = useMemo(() => mu / mass / 2.0, [mu, mass]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let result = KEqualsB(b, x0, v0);

      if(k < b) result = KLessThanB(b, k, x0, v0);
      if(b < k) result = BLessThanK(b, k, x0, v0);     

      const { position: positionFunc, velocity: velocityFunc } = result;

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
          maxValue: data.reduce((a, b) => Math.max(a, b.position), -Infinity) || 1.6,
          positionFunc,
          velocityFunc,
          stepSize,
          initialTime: time
        });
    },
    [k, time, b, v0, x0, steps, stepSize]
  );

  useEffect(() => {
    handleSubmit({ preventDefault: () => {} });
  }, [handleSubmit]);

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
            onChange={(e) => setMass(+e.target.value)}
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
            onChange={(e) => setC(+e.target.value)}
          />{" "}
          N/kg
        </div>
        <div className={styles.inputField}>
          <label>x0: </label>
          <input
            type="number"
            value={x0}
            step={VALUES_STEP}
            onChange={(e) => setX0(+e.target.value)}
          />{" "}
          m
        </div>
        <div className={styles.inputField}>
          <label>v0: </label>
          <input
            type="number"
            value={v0}
            step={VALUES_STEP}
            onChange={(e) => setV0(+e.target.value)}
          />{" "}
          m/s
        </div>
        <div className={styles.inputField}>
          <label>μ: </label>
          <input
            type="number"
            value={mu}
            step={VALUES_STEP}
            min={0}
            onChange={(e) => setMu(+e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <label>Steps: </label>
          <input
            type="number"
            value={steps}
            step={1}
            min={1}
            max={1000}
            onChange={(e) => setSteps(+e.target.value)}
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
            onChange={(e) => setStepSize(+e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <label>Time: </label>
          <input
            type="number"
            value={time}
            step={0.1}
            onChange={(e) => setTime(+e.target.value)}
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
