import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

/**
 * A detail card containing company & stock data
 * @param {object} props { overviewData }
 * @returns The card displayed in details. It displays the name,
 * exchange, symbol, currency, description, address from the 
 * data passed. If a note is passed, it writes out that.
 */
export default function StockOverviewCard({ overviewData }) {
  // if the data passed is somehow empty, it returns nothing
  if (overviewData == undefined || overviewData == null || !overviewData)
    return null;

  // if it's a note, then it renders a note telling card
  if (overviewData.hasOwnProperty("Note"))
    return (
      <Card w="100%" maxW="3xl">
        <CardHeader>
          <Heading size="md">Could not fetch data from API</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm">{overviewData.Note}</Text>
        </CardBody>
      </Card>
    );

  return (
    <Card w="100%" maxW="3xl">
      <CardHeader>
        <Heading size="md" mb="2">
          {overviewData.Name}
        </Heading>
        <Box display="flex" alignItems="baseline">
          <Badge
            borderRadius="full"
            px="2"
            colorScheme="teal"
          >{`${overviewData.Exchange} • ${overviewData.Symbol}`}</Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {overviewData.Currency}
          </Box>
        </Box>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Text pt="2" fontSize="sm">
              {overviewData.Description}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Address
            </Heading>
            <Text pt="2" fontSize="sm">
              {overviewData.Address}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
