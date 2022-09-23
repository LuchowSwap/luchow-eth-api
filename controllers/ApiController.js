let BaseController = require('./BaseController');
const { getAddress } = require("@ethersproject/address");

module.exports = BaseController.extend({
    name: "BaseController",
    summary: async function (req, res, next) {
        const that = this;
        try {
            const topPairs = await that.getTopPairs();
            const pairs = topPairs.reduce((accumulator, pair) => {
                const t0Id = getAddress(pair.token0.id);
                const t1Id = getAddress(pair.token1.id);
                accumulator[`${t0Id}_${t1Id}`] = {
                    price: pair.price,
                    base_volume: pair.volumeToken0,
                    quote_volume: pair.volumeToken1,
                    liquidity: pair.reserveUSD,
                    liquidity_ETH: pair.reserveBNB,
                };
                return accumulator;
            }, {});
            return res.status(200).send({updated_at: new Date().getTime(), data: pairs});
        } catch (error) {
            console.log("summary error: ", error);
            return res.status(500).send(error);
        }
    },
    tokens: async function (req, res, next) {
        const that = this;
        try {
            const topPairs = await that.getTopPairs();
            const tokens = topPairs.reduce((accumulator, pair) => {
                for (const token of [pair.token0, pair.token1]) {
                    const tId = getAddress(token.id);
                    accumulator[tId] = {
                        name: token.name,
                        symbol: token.symbol,
                        price: token.derivedUSD,
                        price_ETH: token.derivedBNB,
                    };
                }
                return accumulator;
            }, {});
            return res.status(200).send({ updated_at: new Date().getTime(), data: tokens });
        } catch (error) {
            console.log("tokens error: ", error);
            return res.status(500).send(error);
        }
    },
    tokensFromAddress: async function (req, res, next) {
        if (!req.params.address || typeof req.params.address !== "string" || !req.params.address.match(/^0x[0-9a-fA-F]{40}$/)) {
            return res.status(400).send("Invalid address");
        }
        const that = this;
        try {
            const address = getAddress(req.params.address);
            const token = await that.getTokenByAddress(address.toLowerCase());
            return res.status(200).send({
                updated_at: new Date().getTime(),
                data: {
                    name: token?.name,
                    symbol: token?.symbol,
                    price: token?.derivedUSD,
                    price_ETH: token?.derivedBNB,
                },
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    pairs: async function (req, res, next) {
        const that = this;
        try {
            const topPairs = await that.getTopPairs();
            const pairs = topPairs.reduce((accumulator, pair) => {
                const pId = getAddress(pair.id);
                const t0Id = getAddress(pair.token0.id);
                const t1Id = getAddress(pair.token1.id);
                accumulator[`${t0Id}_${t1Id}`] = {
                    pair_address: pId,
                    base_name: pair.token0.name,
                    base_symbol: pair.token0.symbol,
                    base_address: t0Id,
                    quote_name: pair.token1.name,
                    quote_symbol: pair.token1.symbol,
                    quote_address: t1Id,
                    price: pair.price,
                    base_volume: pair.previous24hVolumeToken0,
                    quote_volume: pair.previous24hVolumeToken1,
                    liquidity: pair.reserveUSD,
                    liquidity_ETH: pair.reserveBNB,
                };
                return accumulator;
            }, {});
            return res.status(200).send({ updated_at: new Date().getTime(), data: pairs });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
});