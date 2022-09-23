# LuchowSwap ETH API

The LuchowSwap ETH API is a set of endpoints used by market aggregators (e.g. coinmarketcap.com) to surface LuchowSwap liquidity
and volume information in Ethereum network. All information is fetched from the underlying subgraphs.

## Development

### Build

```shell
# Install dependencies
yarn

# Build project
yarn start
```

Endpoints are based on filename inside the `api/v2/` folder.

```shell
# api/pairs.ts
curl -X GET 'localhost:3000/api/v2/pairs'

# ...
```

# Documentation

Results are cached for 5 minutes (or 300 seconds).

## [`/summary`](https://api.luchowswap.com/eth-api/v2/summary)

Returns data for the top ~1000 LuchowSwap pairs, sorted by reserves. 

### Request

`GET https://api.luchowswap.com/eth-api/v2/summary`

### Response

```json5
{
  "updated_at": 1652979950370,              // UNIX timestamp
  "data": {
    "0x..._0x...": {                  // ERC20 token addresses, joined by an underscore
      "price": "...",                 // price denominated in token1/token0
      "base_volume": "...",           // last 24h volume denominated in token0
      "quote_volume": "...",          // last 24h volume denominated in token1
      "liquidity": "...",             // liquidity denominated in USD
      "liquidity_ETH": "..."          // liquidity denominated in ETH
    },
    // ...
  }
}
```

## [`/tokens`](https://api.luchowswap.com/eth-api/v2/tokens)

Returns the tokens in the top ~1000 pairs on LuchowSwap, sorted by reserves.

### Request

`GET https://api.luchowswap.com/eth-api/v2/tokens`

### Response

```json5
{
  "updated_at": 1652979950370,              // UNIX timestamp
  "data": {
    "0x...": {                        // the address of the ERC20 token
      "name": "...",                  // not necessarily included for ERC20 tokens
      "symbol": "...",                // not necessarily included for ERC20 tokens
      "price": "...",                 // price denominated in USD
      "price_ETH": "...",             // price denominated in ETH
    },
    // ...
  }
}
```

## [`/tokens/0x...`](https://api.luchowswap.com/eth-api/v2/tokens/0xA5Ef74068d04ba0809B7379dD76Af5Ce34Ab7C57)

Returns the token information, based on address.

### Request

`GET https://api.luchowswap.com/eth-api/v2/tokens/0xA5Ef74068d04ba0809B7379dD76Af5Ce34Ab7C57`

### Response

```json5
{
  "updated_at": 1652979950370,              // UNIX timestamp
  "data": {
    "name": "...",                    // not necessarily included for ERC20 tokens
    "symbol": "...",                  // not necessarily included for ERC20 tokens
    "price": "...",                   // price denominated in USD
    "price_ETH": "...",               // price denominated in ETH
  }
}
```

## [`/pairs`](https://api.luchowswap.com/eth-api/v2/pairs)

Returns data for the top ~1000 LuchowSwap pairs, sorted by reserves.

### Request

`GET hhttps://api.luchowswap.com/eth-api/v2/pairs`

### Response

```json5
{
  "updated_at": 1652979950370,              // UNIX timestamp
  "data": {
    "0x..._0x...": {                  // the asset ids of ETH and ERC20 tokens, joined by an underscore
      "pair_address": "0x...",        // pair address
      "base_name": "...",             // token0 name
      "base_symbol": "...",           // token0 symbol
      "base_address": "0x...",        // token0 address
      "quote_name": "...",            // token1 name
      "quote_symbol": "...",          // token1 symbol
      "quote_address": "0x...",       // token1 address
      "price": "...",                 // price denominated in token1/token0
      "base_volume": "...",           // volume denominated in token0
      "quote_volume": "...",          // volume denominated in token1
      "liquidity": "...",             // liquidity denominated in USD
      "liquidity_ETH": "..."          // liquidity denominated in ETH
    },
    // ...
  }
}
```
