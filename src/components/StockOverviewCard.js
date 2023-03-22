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

export default function StockOverviewCard({ overviewData }) {
  if (overviewData == undefined || overviewData == null || !overviewData)
    return null;
  if (overviewData.hasOwnProperty("Note")) return null;

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
