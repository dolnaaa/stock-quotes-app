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

/**
 * A detail card containing current price and a chart about price
 * changes
 * @param {object} props { interdayData, currency = "" }
 * @returns The card displayed in details. It displays the current
 * price, and a chart visualizing the interday highs and lows
 * from the data passed. If a note is passed, it writes out that.
 */
export default function StockChartCard({ interdayData, currency = "" }) {
  // if the data passed is somehow empty, it returns nothing
  if (interdayData == undefined || interdayData == null || !interdayData)
    return null;

  // if it's a note, then it renders a note telling card
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

  // this object is for the line chart
  const chartData = {
    // the interdayData is sorted by date descending, so this
    // revetrs it and only keeps the HH:MM:SS part of the date
    labels: Object.keys(interdayData)
      .reverse()
      .map((x) => x.split(" ")[1]),
    // there are two datasets, one for the highs and one for the
    // lows, both reverts the dates, then fixes prices at 2 decimal
    // places
    datasets: [
      {
        label: "High Price",
        data: Object.keys(interdayData)
          .reverse()
          .map((x) => Number.parseFloat(interdayData[x]["2. high"]).toFixed(2)),
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

  // this object is for the line chart
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
