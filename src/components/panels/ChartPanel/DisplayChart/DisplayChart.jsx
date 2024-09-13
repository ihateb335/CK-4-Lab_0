import { useEffect, useMemo } from "react";
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
const DisplayChart = ({ data }) => {
  const graphData = useMemo(() => {
    return data ?? INITIAL_DATA;
  }, [data]);

  return (
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
            value: "x(t) m, v(t) m/s",
            angle: 270,
            position: "insideLeft",
            offset: 0,
            dy: 30,
          }}
        />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Line type="monotone" dataKey="velocity" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="position" stroke="#82ca9d" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DisplayChart;
