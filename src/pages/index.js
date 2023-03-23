import { useState } from "react";
import Head from "next/head";

import {
  Input,
  InputGroup,
  IconButton,
  VStack,
  Heading,
  Container,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { SearchIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";

import ResultCard from "@/components/ResultCard";

/**
 * The front page of the application
 * @returns The main page that contains a simple search bar and a
 * button thet does exactly the same thing as pressing enter on the
 * input field when finished editing. When the search happens, it
 * maps out the data obtained from alpavantage api search function.
 * It also contains a color mode switcher.
 */
function SearchView() {
  const [searchVal, setSearchVal] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchedData, setSearchedData] = useState([]);

  const { colorMode, toggleColorMode } = useColorMode();

  /**
   * This function stores the input value into searchVal.
   * @param {event} event event object on input change
   */
  const onSearchChange = (event) => {
    setSearchVal(event.target.value);
  };

  /**
   * This function is called on input key press, checks for 'Enter'
   * key, and if it happens it starts the search.
   * @param {event} event event object on input change
   */
  const onSearchEnded = (event) => {
    if (event.keyCode === 13) {
      makeSearch();
    }
  };

  /**
   * This function simply makes the search. It's called on search
   * button press.
   */
  const onSearchClicked = () => {
    makeSearch();
  };

  /**
   * This async function checks whether the searchVal is empty,
   * then tries to get the search result from alphavantage api
   * SYMBOL_SEARCH function, after sets the state according to result
   */
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
        //console.log(err);
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
      <Container maxW="container.lg" py={8} marginTop="42px">
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
        <Box position="absolute" top="0" right="0">
          <IconButton
            aria-label="ColorMode"
            icon={colorMode == "light" ? <MoonIcon /> : <SunIcon />}
            colorScheme="teal"
            onClick={toggleColorMode}
            margin="4"
          />
        </Box>
      </Container>
    </>
  );
}

export default SearchView;
