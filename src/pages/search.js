import { useState } from "react";
import Head from "next/head";

import {
  Box,
  Input,
  InputGroup,
  IconButton,
  VStack,
  Heading,
  Container,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchView() {
  const [searchVal, setSearchVal] = useState("");

  const onSearchChange = (event) => {
    setSearchVal(event.target.value);
  };

  const onSearchClicked = () => {
    console.log(searchVal);
  };

  return (
    <>
      <Head>
        <title>Search view</title>
        <meta name="description" content="Search view for the app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxW="container.lg" py={8}>
        <Heading as="h3" size="lg" px={4} mb={4} textAlign="center">
          Search for stock quotes by its symbol or name
        </Heading>
        <InputGroup size="lg" maxW="3xl" mx="auto">
          <Input
            type="text"
            placeholder="Search..."
            value={searchVal}
            onChange={onSearchChange}
          />
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            colorScheme="teal"
            ml={2}
            onClick={onSearchClicked}
          />
        </InputGroup>
        {searchVal && (
          <VStack mt={8}>
            <Box>{`result for ${searchVal}...`}</Box>
          </VStack>
        )}
      </Container>
    </>
  );
}