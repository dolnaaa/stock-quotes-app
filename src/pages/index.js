import { useState } from "react";
import Head from "next/head";

import papaparse from "papaparse";

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

function SearchView({ stockList }) {
  const [searchVal, setSearchVal] = useState("");
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

  const makeSearch = () => {
    if (stockList && stockList.data) {
      const searchValUpper = searchVal.toUpperCase();
      setSearchedData(
        stockList.data.filter(
          (x) =>
            x.symbol?.includes(searchValUpper) ||
            x.name?.toUpperCase().includes(searchValUpper)
        )
      );
    } else {
      console.error("error getting the data");
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
          {searchVal &&
            searchedData &&
            searchedData.map((item, index) => (
              <ResultCard key={index} data={item} />
            ))}
        </VStack>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
    );
    const stockCsv = await res.text();
    const stockList = await papaparse.parse(stockCsv, { header: true });

    return {
      props: {
        stockList,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        stockList: null,
      },
    };
  }
}

export default SearchView;
