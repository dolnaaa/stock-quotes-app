## Stock quotes app

This is a simple Next.js app that allows the users to search for stock quotes and then it displays their data using the [Alphavantage API](https://alphavantage.co).

## Testing / Running

To install dependecies:

```sh
npm i
```

You will also have to create a `.env.local` file in the project root, the content should be similar to the `.env.local.example` file, but you have to change `"demo"` to an actual api key from the [Alphavantage API](https://alphavantage.co).

After that you can run the development server with:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
