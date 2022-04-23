### Solscan NFT

- Script to hit solscan for a given NFT collection by using `https://api.solscan.io/collection/nft?sortBy=nameDec&collectionId=<COLLECTION_ID>&offset=<OFFSET>&limit=<PAGINATE>`
- Stores to a `.csv` file

| mint         | mintNumber | owner       | name      | uri                                                                     | primarySale | mintTxn              | createdTime              | metaName  | tradeCount | tradeTime                | price | dex       | tradeHash        |
| ------------ | ---------- | ----------- | --------- | ----------------------------------------------------------------------- | ----------- | -------------------- | ------------------------ | --------- | ---------- | ------------------------ | ----- | --------- | ---------------- |
| 5MeYfuJjG... | 10000      | 9BjQStew... | LIFINI... | [link](https://arweave.net/ljVa2fpb-ZU0qna0FLfnF56E1Y43bU0YadJz_BvBR6Q) | 1           | 3BmcMQtrFyeUs1X..... | Sun Dec 26 2021 23:29:29 | LIFINI... | 1          | Mon Jan 03 2022 05:04:35 | 5.5   | magiceden | nLzcjGUjdcZ8.... |

> For example this fetches all Lifinity's NFT now
