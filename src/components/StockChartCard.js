import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

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

export default function StockChartCard({ interdayData, currency = "" }) {
  if (interdayData == undefined || interdayData == null || !interdayData)
    return null;

  if (interdayData.hasOwnProperty("Note"))
    return (
      <Card w="100%" maxW="3xl">
        <CardHeader>
          <Heading size="md">Could not fetch data from API</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm">{interdayData.Note}</Text>
        </CardBody>
      </Card>
    );

  const chartData = {
    labels: Object.keys(interdayData)
      .reverse()
      .map((x) => x.split(" ")[1]),
    datasets: [
      {
        label: "High Price",
        data: Object.keys(interdayData)
          .reverse()
          .map((x) =>
            Number.parseFloat(interdayData[x]["2. high"]).toFixed(2)
          ),
        borderColor: "teal",
      },
      {
        label: "Low Price",
        data: Object.keys(interdayData)
          .reverse()
          .map((x) => Number.parseFloat(interdayData[x]["3. low"]).toFixed(2)),
        borderColor: "orange",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <Card w="100%" maxW="3xl">
      <CardHeader>
        <Heading size="md">Stock price</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Current price
            </Heading>
            <Text pt="2" fontSize="sm">
              {`${Number.parseFloat(
                interdayData[Object.keys(interdayData)[0]]["4. close"]
              ).toFixed(2)} ${currency}`}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Interday price chart
            </Heading>
            <Line data={chartData} options={options} />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
