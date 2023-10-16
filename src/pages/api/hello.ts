// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionConfirmationStrategy,
} from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import * as base58 from "base-58";
import { useRouter } from "next/router";
import calculatePrice from "lib/calculatePrice";

type GetData = {
  label: string;
  icon: string;
};
type PostData = {
  transaction: string;
  message?: string;
};

function get(req: NextApiRequest, res: NextApiResponse<GetData>) {
  const label = "Golem Pay";
  const icon =
    "https://i.ibb.co/zSrQmzD/golempay-high-resolution-logo-color-on-transparent-background.png";

  res.status(200).send({
    label,
    icon,
  });
}

async function post(req: NextApiRequest, res: NextApiResponse<PostData>) {
  // Account provided in the transaction request body by the wallet.
  const accountField = req.body?.account;
  if (!accountField) throw new Error("missing account");

  const sender = new PublicKey(accountField);

  const merchant = Keypair.fromSecretKey(
    new Uint8Array(
      JSON.parse(
        "[27, 83, 226, 222, 177, 141, 106, 163, 188, 156, 141, 12, 251, 76, 116, 248, 149, 16, 104, 173, 40, 119, 222, 24, 47, 198, 207, 71, 15, 142, 90, 207, 228, 168, 126, 103, 231, 113, 215, 19, 13, 38, 217, 204, 101, 127, 123, 5, 12, 203, 3, 21, 34, 180, 140, 191, 166, 238, 233, 154, 57, 124, 214, 131]"
      )
    )
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const amount = calculatePrice(router.query);

  const ix = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: new PublicKey("GPayNFy6ttH6KRAjfDd9KgvJX3RWVxx7gbTjamuTAHQ6"),
    // lamports: 133700000,
    lamports: amount.multipliedBy(100000000).toNumber(),
  });

  let transaction = new Transaction();
  transaction.add(ix);

  const connection = new Connection("https://api.devnet.solana.com");
  const bh = await connection.getLatestBlockhash();
  transaction.recentBlockhash = bh.blockhash;
  transaction.feePayer = merchant.publicKey;

  // for correct account ordering
  transaction = Transaction.from(
    transaction.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    })
  );

  transaction.sign(merchant);
  console.log(base58.encode(transaction.signature));

  // airdrop 1 SOL just for fun
  connection.requestAirdrop(sender, 1000000000);

  // Serialize and return the unsigned transaction.
  const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });

  const base64Transaction = serializedTransaction.toString("base64");
  const message = "Thank you for using Golem Pay";

  // const strategy : TransactionConfirmationStrategy =  {
  //   signature: transaction.
  // }
  // connection.confirmTransaction();

  res.status(200).send({ transaction: base64Transaction, message });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetData | PostData>
) {
  if (req.method == "GET") {
    console.log("received GET request");
    return get(req, res);
  } else if (req.method == "POST") {
    console.log("received POST request");
    return await post(req, res);
  }
}
