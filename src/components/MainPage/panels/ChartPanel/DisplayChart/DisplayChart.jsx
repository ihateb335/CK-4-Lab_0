import { useEffect, useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { INITIAL_DATA } from "../../../../../utils/helpers/data";
const DisplayChart = ({ data }) => {
  const graphData = useMemo(() => {
    return data ?? INITIAL_DATA;
  }, [data]);

  return (
    <LineChart width={500} height={300} data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="velocity" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="position" stroke="#82ca9d" dot={false} />
    </LineChart>
  );
};

export default DisplayChart;
