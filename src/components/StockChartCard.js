import { Box, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChartCard({ dailyData }) {
  if (dailyData == undefined || dailyData == null || !dailyData) return null;
  if (dailyData.hasOwnProperty("Note")) return null;

  const chartData = {
    labels: Object.keys(dailyData).reverse(),
    datasets: [
      {
        label: "Closing Price",
        data: Object.keys(dailyData)
          .reverse()
          .map((x) => dailyData[x]["4. close"]),
        borderColor: "teal",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <Card w="100%" maxW="3xl">
      <CardHeader>
        <Heading size="md" mb="2">
          Daily closes
        </Heading>
      </CardHeader>
      <CardBody>
        <Box my={4}>
          <Line data={chartData} options={options} />
        </Box>
      </CardBody>
    </Card>
  );
}
