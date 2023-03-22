import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import { Heading, Container, Box, Spinner, VStack } from "@chakra-ui/react";

import StockOverviewCard from "@/components/StockOverviewCard";

function DetailsView({}) {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(true);

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
    const fetchData = async () => {
      setDataLoaded(false);
      try {
        const resTimeSeriesDailyAdjusted = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
        );
        const timeSeriesDailyAdjusted = await resTimeSeriesDailyAdjusted.json();

        const resOverview = await fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
        );
        const overview = await resOverview.json();

        setStockData({ timeSeriesDailyAdjusted, overview });
        setDataLoaded(true);
      } catch (err) {
        console.log(err);
        setStockData(null);
        setDataLoaded(true);
      }
    };

    const queryData = getQueryStringParams(window.location.search);
    if (queryData?.symbol) {
      setSymbol(queryData.symbol);
      fetchData();
    } else {
      setSymbol("");
    }
  }, [symbol]);

  return (
    <>
      <Head>
        <title>Details view</title>
        <meta name="description" content="Search view for the app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxW="container.lg" py={8}>
        <Box maxW="3xl" mx="auto">
          {symbol != "" ? (
            <>
              <Heading as="h3" size="lg" px={4} mb={4} textAlign="center">
                {`Details of ${symbol}`}
              </Heading>
              {dataLoaded ? (
                <VStack mt="8">
                  {stockData ? (
                    <StockOverviewCard overviewData={stockData?.overview} />
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
                <Box textAlign="center">Back to search</Box>
              </Link>
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default DetailsView;
