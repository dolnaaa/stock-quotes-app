import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, Box, HStack, IconButton } from "@chakra-ui/react";
import Link from "next/link";

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
            {data && data["1. symbol"] && (
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {data["1. symbol"]}
              </Badge>
            )}
            {data && (
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {`${data["3. type"] && data["3. type"]}${
                  data["8. currency"] && ` • ${data["8. currency"]}`
                }`}
              </Box>
            )}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {data && data["2. name"] ? data["2. name"] : "[no name data]"}
          </Box>
        </Box>
        <Link
          href={{
            pathname: "/details",
            query: { symbol: data["1. symbol"] ? data["1. symbol"] : "" },
          }}
        >
          <IconButton
            aria-label="ArrowForward"
            icon={<ArrowForwardIcon />}
            colorScheme="teal"
            //onClick={() => console.log("asd")}
          />
        </Link>
      </HStack>
    </Box>
  );
}
