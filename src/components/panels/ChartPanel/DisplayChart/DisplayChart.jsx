import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { INITIAL_DATA } from "../../../../utils/helpers/data";

const radioTypes = {
  velocity: "velocity",
  position: "position",
};

const emptyMode = {line: null, label: ''};


const DisplayChart = ({ data }) => {
  const [mode, setMode] = useState();

  const graphData = useMemo(() => {
    return data ?? INITIAL_DATA;
  }, [data]);

  const { line, label } = useMemo(() => {
    switch (mode) {
      case radioTypes.position:
        return {
          line: (
            <Line
              type="monotone"
              dataKey="position"
              stroke="#82ca9d"
              dot={false}
            />
          ),
          label: "x(t) m",
        };

      case radioTypes.velocity:
        return {
          line: (
            <Line
              type="monotone"
              dataKey="velocity"
              stroke="#8884d8"
              dot={false}
            />
          ),
          label: "v(t) m/s",
        };

      default:
        return emptyMode;
    }
  }, [mode]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="t"
            padding={{ left: 30, right: 30 }}
            label={{ value: "t, s", position: "insideBottom", offset: -5 }}
            minTickGap={50}
            tickFormatter={(value) => Number.parseFloat(value).toFixed(3)}
          />
          <YAxis
            tickFormatter={(value) => Number.parseFloat(value).toFixed(3)}
            label={{
              value: label,
              angle: 270,
              position: "insideLeft",
              offset: 0,
              dy: 30,
            }}
          />
          <Tooltip />
          <Legend verticalAlign="top" />
          {line}
        </LineChart>
      </ResponsiveContainer>
      <fieldset
        onChange={(e) => {
          setMode(e.target.value);
        }}
      >
        <legend>Choose display mode</legend>
        <div>
          <input
            type="radio"
            id="radio1"
            name="drone"
            value={radioTypes.position}
          />
          <label for="huey">Position</label>
        </div>

        <div>
          <input
            type="radio"
            id="radio2"
            name="drone"
            value={radioTypes.velocity}
          />
          <label for="dewey">Velocity</label>
        </div>
      </fieldset>
    </div>
  );
};

export default DisplayChart;
