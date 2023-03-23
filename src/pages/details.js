import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import {
  Heading,
  Container,
  Box,
  Spinner,
  VStack,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import StockOverviewCard from "@/components/StockOverviewCard";
import StockChartCard from "@/components/StockChartCard";

/**
 * Details page of the application
 * @param {*} props
 * @returns The deatils page. This page is simple like the search page,
 * also contains the color mode switcher, but beyond that it shows the
 * data of the searched stock(this is also from alphavantage api).
 * This page handles a few exceptions, like no symbol in query, or
 * alphavantage api returning a note(sometimes it blocks because with
 * a free api key you can only do 5 calls/min or 500 calls/day)
 */
function DetailsView({}) {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(true);

  const { colorMode, toggleColorMode } = useColorMode();

  /**
   * This function processees the given query string passed to it
   * so it can be used as an object
   * @param {string} query window.location.search preferrably or a
   * string formally similar
   * @returns object with all the name-value pairs of the given query
   */
  const getQueryStringParams = (query) => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split("&")
          .reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          }, {})
      : {};
  };

  useEffect(() => {
    /**
     * This async function is trying to fetch data from the alphavantage
     * api TIME_SERIES_DAILY and OVERVIEW function of the passed symbol.
     * After the fetch the data obtained is stored in stockData state.
     * While the fetch is happening the dataLoaded state stays false,
     * so the app displays a spinner until then
     * @param {string} sym stock symbol to fetch for
     */
    const fetchData = async (sym) => {
      setDataLoaded(false);
      try {
        const resTimeSeriesInterdayAdjusted = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${sym}&interval=5min&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
        );
        const timeSeriesInterdayAdjusted =
          await resTimeSeriesInterdayAdjusted.json();

        const resOverview = await fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${sym}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
        );
        const overview = await resOverview.json();

        setStockData({ timeSeriesInterdayAdjusted, overview });
        setDataLoaded(true);
      } catch (err) {
        //console.log(err);
        setStockData(null);
        setDataLoaded(true);
      }
    };

    const queryData = getQueryStringParams(window.location.search);
    // the fetch only happens if there is a symbol
    if (queryData?.symbol && queryData?.symbol != "") {
      setSymbol(queryData.symbol);
      fetchData(queryData.symbol);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Details view</title>
        <meta name="description" content="Search view for the app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxW="container.lg" py={8} marginTop="42px">
        <Box maxW="3xl" mx="auto">
          {symbol != "" ? (
            <>
              <Heading as="h3" size="lg" px={4} mb={4} textAlign="center">
                {`Details of ${symbol}`}
              </Heading>
              {dataLoaded ? (
                <VStack mt="8">
                  {stockData ? (
                    <>
                      <StockOverviewCard overviewData={stockData?.overview} />
                      <StockChartCard
                        interdayData={
                          stockData?.timeSeriesInterdayAdjusted[
                            "Time Series (5min)"
                          ]
                        }
                        currency={
                          stockData?.overview && stockData?.overview["Currency"]
                        }
                      />
                      <Link href={{ pathname: "/" }}>
                        <Box textAlign="center" mt="4" color="teal">
                          Back to search
                        </Box>
                      </Link>
                    </>
                  ) : (
                    <Box>no data</Box>
                  )}
                </VStack>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt="8"
                >
                  <Spinner size="xl" />
                </Box>
              )}
            </>
          ) : (
            <>
              <Heading as="h3" size="lg" px={4} mb={4} textAlign="center">
                Stock is not specified, could not load deatils.
              </Heading>
              <Link href={{ pathname: "/" }}>
                <Box textAlign="center" mt="4" color="teal">
                  Back to search
                </Box>
              </Link>
            </>
          )}
        </Box>
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

export default DetailsView;
