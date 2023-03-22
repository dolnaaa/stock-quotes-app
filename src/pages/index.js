import { useState } from "react";
import Head from "next/head";

import {
  Input,
  InputGroup,
  IconButton,
  VStack,
  Heading,
  Container,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import ResultCard from "@/components/ResultCard";

function SearchView() {
  const [searchVal, setSearchVal] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchedData, setSearchedData] = useState([]);

  const onSearchChange = (event) => {
    setSearchVal(event.target.value);
  };

  const onSearchEnded = (event) => {
    if (event.keyCode === 13) {
      makeSearch();
    }
  };

  const onSearchClicked = () => {
    makeSearch();
  };

  const makeSearch = async () => {
    if (searchVal != "")
      try {
        setSearchLoading(true);
        const res = await fetch(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchVal}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
        );
        setSearchedData((await res.json())?.bestMatches);
        setSearchLoading(false);
      } catch (err) {
        console.log(err);
        setSearchedData([]);
        setSearchLoading(false);
      }
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
            onKeyDown={onSearchEnded}
          />
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            colorScheme="teal"
            ml={2}
            onClick={onSearchClicked}
          />
        </InputGroup>
        <VStack mt={8}>
          {searchLoading == false
            ? searchedData &&
              searchedData.map((item, index) => (
                <ResultCard key={index} data={item} />
              ))
            : null}
        </VStack>
      </Container>
    </>
  );
}

export default SearchView;
