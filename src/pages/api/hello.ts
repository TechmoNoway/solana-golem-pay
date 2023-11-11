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
  const icon = "https://i.ibb.co/4fMX79w/golempaypinkpurplelogo.png";

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
        "[104,226,43,164,205,195,51,252,249,152,79,66,155,186,197,89,246,208,20,194,210,155,0,186,6,127,246,191,180,235,135,83,218,252,190,76,198,91,28,111,53,155,182,106,61,57,120,42,198,31,33,172,249,221,105,168,119,19,182,50,92,30,139,36]"
      )
    )
  );

  const amount = calculatePrice(req.query);

  if (amount.toNumber() === 0) {
    console.log("You have not bought any things");
  }

  const ix = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: new PublicKey("FjqQXWJvpfEfENK6XrRxp9x47XWZGxw81sCUwwSEQnB5"),
    // lamports: 133700000,
    lamports: amount.multipliedBy(1000000000).toNumber(),
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
