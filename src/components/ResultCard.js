import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, Box, HStack, IconButton } from "@chakra-ui/react";

export default function ResultCard({ data }) {
  return (
    <Box
      p="6"
      w="100%"
      maxW="3xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <HStack>
        <Box flex="1">
          <Box display="flex" alignItems="baseline">
            {data?.symbol && (
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
              >
                {`${data.symbol}${data?.exchange ? ` : ${data.exchange}` : ""}`}
              </Box>
            )}
            {data?.status && (
              <Badge
                borderRadius="full"
                px="2"
                colorScheme={data.status == "Active" ? "teal" : "red"}
                ml="2"
              >
                {data.status}
              </Badge>
            )}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {data?.name ? data.name : "[no name data]"}
          </Box>
        </Box>
        <IconButton
          aria-label="ArrowForward"
          icon={<ArrowForwardIcon />}
          colorScheme="teal"
          onClick={() => console.log("asd")}
        />
      </HStack>
    </Box>
  );
}
