// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionConfirmationStrategy,
} from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as base58 from 'base-58';
import { useRouter } from 'next/router';
import calculatePrice from 'lib/calculatePrice';

type GetData = {
    label: string;
    icon: string;
};
type PostData = {
    transaction: string;
    message?: string;
};

function get(req: NextApiRequest, res: NextApiResponse<GetData>) {
    const label = 'Golem Pay';
    const icon = 'https://i.ibb.co/zSrQmzD/golempay-high-resolution-logo-color-on-transparent-background.png';

    res.status(200).send({
        label,
        icon,
    });
}

async function post(req: NextApiRequest, res: NextApiResponse<PostData>) {
    // Account provided in the transaction request body by the wallet.
    const accountField = req.body?.account;
    if (!accountField) throw new Error('missing account');

    const sender = new PublicKey(accountField);

    const merchant = Keypair.fromSecretKey(
        new Uint8Array(
            JSON.parse(
                '[119, 217, 86, 249, 155, 208, 52, 45, 56, 227, 141, 102, 88, 22, 208, 138, 76, 27, 60, 57, 61, 80, 115, 84, 41, 43, 69, 182, 234, 37, 208, 107, 228, 168, 128, 169, 64, 147, 245, 155, 24, 6, 111, 56, 45, 97, 68, 162, 65, 152, 194, 155, 7, 253, 59, 188, 244, 250, 186, 182, 25,202, 104, 137]',
            ),
        ),
    );

    const ix = SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: new PublicKey('GPaypU99YTPrxTnrLpzABzxGgaffkeTB7r4XD3ZcJdr8'),
        lamports: 160000000,
        // lamports: amount.multipliedBy(100000000).toNumber(),
    });

    let transaction = new Transaction();
    transaction.add(ix);

    const connection = new Connection('https://api.devnet.solana.com');
    const bh = await connection.getLatestBlockhash();
    transaction.recentBlockhash = bh.blockhash;
    transaction.feePayer = merchant.publicKey;

    // for correct account ordering
    transaction = Transaction.from(
        transaction.serialize({
            verifySignatures: false,
            requireAllSignatures: false,
        }),
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

    const base64Transaction = serializedTransaction.toString('base64');
    const message = 'Thank you for using Golem Pay';

    // const strategy : TransactionConfirmationStrategy =  {
    //   signature: transaction.
    // }
    // connection.confirmTransaction();

    res.status(200).send({ transaction: base64Transaction, message });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<GetData | PostData>) {
    if (req.method == 'GET') {
        console.log('received GET request');
        return get(req, res);
    } else if (req.method == 'POST') {
        console.log('received POST request');
        return await post(req, res);
    }
}
