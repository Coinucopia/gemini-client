# gemini-client

A command-line client for interacting with the [Gemini](https://gemini.com/) API.

## Installation

1. Clone the repository
2. `npm install`
3. Copy `config.sample.json` to `config.json` and fill in your [API key and secret](https://exchange.gemini.com/settings/api)

## Usage

```sh
# List all currently active trades, and some of the most recent completed trades
./bin/gemini list

# Buy 2 BTC at $12000 per BTC
./bin/gemini buy 2 BTC @ 12000 USD

# Buy $1000 worth of BTC at $12000 per BTC
./bin/gemini buy 1000 USD in BTC @ 12000 USD

# Sell 2 BTC
./bin/gemini sell 2 BTC @ 13000 USD

# Try to buy 2 BTC, but only insofar the order can immediately be filled, and cancel the rest
./bin/gemini buy 2 BTC @ 11900 USD --immediate

# See more options for placing buy orders
./bin/gemini buy --help

# See more options for placing sell orders
./bin/gemini sell --help
```
