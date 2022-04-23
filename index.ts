import axios from "axios";
import { createLogger, transports } from "winston";
// @ts-ignore
import CSV from "winston-csv-format";

const csvHeaders = {
  mint: "mint",
  mintNumber: "mintNumber",
  owner: "owner",
  name: "name",
  uri: "uri",
  primarySaleHappened: "primarySaleHappened",
  mintTxn: "mintTxn",
  createdTime: "createdTime",
  metaName: "metaName",
  tradeCount: "tradeCount",
  tradeTime: "tradeTime",
  price: "price",
  dex: "dex",
  tradeHash: "tradeHash",
};

const logger = createLogger({
  level: "info",
  format: CSV(
    [
      "mint",
      "mintNumber",
      "owner",
      "name",
      "uri",
      "primarySaleHappened",
      "mintTxn",
      "createdTime",
      "metaName",
      "tradeCount",
      "tradeTime",
      "price",
      "dex",
      "tradeHash",
    ],
    { delimiter: "," }
  ),
  transports: [
    new transports.File({ filename: "lifinityDetails.csv", level: "info" }),
  ],
});

logger.log("info", csvHeaders);

async function run(i: number) {
  const data = await axios.get(
    `https://api.solscan.io/collection/nft?sortBy=nameDec&collectionId=e68bf9abf20e179549afa0205087a6f449db4527b575df0adb589542ac52fd52&offset=${
      24 * i
    }&limit=${24}`
  );

  const result = data.data;

  console.log("------------------");
  const length = result.data.length;
  console.log(result.data.length);

  console.log(result.data[0].info.data.name);
  console.log(result.data[length - 1].info.data.name);

  for (const data of result.data) {
    const info = data.info;
    const trade = data.trade;

    const mint = info.mint.toString();
    const name = info.data.name.toString();
    const mintNumber = info.data.name.split("#")[1];
    const uri = info.data.uri.toString();
    const primarySaleHappened = info.primarySaleHappened;
    const mintTxn = info.mintTx.toString();
    const createdTime = new Date(+info.createdTime * 1000).toString();
    const metaName = info.meta.name.toString();

    const tradeCount = trade.tradeCount;

    let tradeTime = null;
    let price = null;
    let dex = null;
    let tradeHash = null;

    const res = await (
      await axios.get(
        `https://api.solscan.io/token/holders?token=${mint}&offset=0&size=1`
      )
    ).data;

    const owner = res.data.result[0].owner;

    if (tradeCount) {
      // If traded
      tradeTime = new Date(+trade.tradeTime * 1000).toString();
      price = +trade.price * 10 ** -9;
      dex = trade.dex.toString();
      tradeHash = trade.signature.toString();
    }
    const result = {
      mint,
      mintNumber,
      owner,
      name,
      uri,
      primarySaleHappened,
      mintTxn,
      createdTime,
      metaName,
      tradeCount,
      tradeTime,
      price,
      dex,
      tradeHash,
    };
    logger.info("info", result);
  }
}

/**
 *  A total of 10_000 NFT's
 *  Fetching them 24 at a time
 *  */
let arr = Array.from(Array(418).keys());

(async () => {
  for (const i of arr) {
    await run(i);
    await new Promise((r) => setTimeout(r, 2000));
  }
})();
