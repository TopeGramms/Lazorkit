# Tutorial: Sending Gasless Transactions with Lazorkit

This tutorial demonstrates how to send gasless (sponsored) transactions on Solana using the Lazorkit SDK.

## Overview

Gasless transactions allow users to interact with Solana without holding SOL for transaction fees. A paymaster service sponsors the gas costs, providing a seamless user experience.

## Prerequisites

- Completed Tutorial 01 (Passkey Wallet setup)
- Connected wallet with Lazorkit
- Understanding of Solana transactions

## Step 1: Understand the Transaction Flow

1. Create a transaction instruction (e.g., SOL transfer)
2. Set the transaction parameters (blockhash, fee payer)
3. Sign and send the transaction using Lazorkit
4. Paymaster covers the transaction fees
5. Transaction is confirmed on-chain

## Step 2: Create a Transfer Transaction

Use Solana's `SystemProgram.transfer()` to create a basic transfer:

```tsx
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import { useWallet } from '@lazorkit/wallet';
import { connection } from '@/lib/solana';

export function SendTransaction() {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();

  const handleSend = async (recipient: string, amount: number) => {
    const recipientPubkey = new PublicKey(recipient);
    const lamports = amount * 1_000_000_000;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: smartWalletPubkey!,
        toPubkey: recipientPubkey,
        lamports,
      })
    );

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = smartWalletPubkey!;

    const signature = await signAndSendTransaction(transaction);
    console.log('Transaction signature:', signature);

    return signature;
  };

  return (
    <button onClick={() => handleSend('RECIPIENT_ADDRESS', 0.01)}>
      Send 0.01 SOL
    </button>
  );
}
```

## Step 3: Handle Transaction States

Implement proper loading and error states:

```tsx
const [isLoading, setIsLoading] = useState(false);
const [signature, setSignature] = useState('');
const [error, setError] = useState('');

const handleSend = async () => {
  setIsLoading(true);
  setError('');
  setSignature('');

  try {
    const sig = await signAndSendTransaction(transaction);
    setSignature(sig);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Transaction failed');
  } finally {
    setIsLoading(false);
  }
};
```

## Step 4: Display Transaction Results

Show the transaction signature and explorer link:

```tsx
{signature && (
  <div>
    <p>Transaction Successful!</p>
    <a
      href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View on Explorer
    </a>
  </div>
)}
```

## Step 5: Validate Inputs

Always validate recipient addresses and amounts:

```tsx
const handleSend = async (recipient: string, amount: string) => {
  if (!recipient || !amount) {
    setError('Please fill in all fields');
    return;
  }

  try {
    new PublicKey(recipient);
  } catch {
    setError('Invalid Solana address');
    return;
  }

  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    setError('Invalid amount');
    return;
  }

  // Proceed with transaction...
};
```

## Complete Example

Here's a full component implementation:

```tsx
'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import { connection } from '@/lib/solana';

export function SendSol() {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!smartWalletPubkey || !recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setSignature('');

    try {
      const recipientPubkey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * 1_000_000_000;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: smartWalletPubkey,
          toPubkey: recipientPubkey,
          lamports,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = smartWalletPubkey;

      const sig = await signAndSendTransaction(transaction);
      setSignature(sig);
      setRecipient('');
      setAmount('');
    } catch (err) {
      console.error('Transaction error:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={handleSend} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send SOL'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {signature && (
        <div>
          <p>Success! Signature: {signature}</p>
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Explorer
          </a>
        </div>
      )}
    </div>
  );
}
```

## Key Concepts

### Gasless Transactions

- **Paymaster**: Service that sponsors transaction fees
- **User Experience**: Users don't need SOL in their wallet
- **Configuration**: Set via `paymasterUrl` in provider
- **Devnet**: Free transactions on Solana's test network

### Transaction Parameters

- `fromPubkey`: Sender's wallet address
- `toPubkey`: Recipient's wallet address
- `lamports`: Amount in lamports (1 SOL = 1,000,000,000 lamports)
- `recentBlockhash`: Recent blockhash for transaction validity
- `feePayer`: Who pays the transaction fee (your smart wallet)

### Best Practices

1. Always validate inputs before sending
2. Implement proper error handling
3. Show loading states during transactions
4. Display transaction signatures for verification
5. Link to Solana Explorer for transparency
6. Clear form fields after successful transactions

## Testing on Devnet

1. Get devnet SOL from [Solana Faucet](https://faucet.solana.com)
2. Use your wallet address from Lazorkit
3. Request SOL (up to 2 SOL per request)
4. Wait for confirmation
5. Test transactions

## Troubleshooting

### Transaction Failed

- Check wallet has sufficient balance
- Verify recipient address is valid
- Ensure network connection is stable
- Check Solana network status

### Invalid Blockhash

- Blockhashes expire quickly (~60 seconds)
- Fetch a fresh blockhash before each transaction
- Don't reuse old transactions

### Signature Verification Failed

- Ensure wallet is properly connected
- Try reconnecting your passkey wallet
- Check browser console for errors

## Next Steps

- Implement token transfers (SPL tokens)
- Add transaction history tracking
- Create batch transactions
- Explore advanced Solana programs

## Resources

- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)
- [Solana Explorer](https://explorer.solana.com)
- [Lazorkit SDK Reference](https://lazorkit.com)
