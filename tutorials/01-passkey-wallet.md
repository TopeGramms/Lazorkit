# Tutorial: Creating a Passkey Wallet with Lazorkit

This tutorial explains how to implement passkey-based authentication for a smart wallet on Solana using the Lazorkit SDK.

## Overview

Passkey authentication eliminates the need for seed phrases or browser extensions. Users can authenticate with biometrics (Face ID, Touch ID, or fingerprint) using the WebAuthn standard.

## Prerequisites

- Next.js 14+ with App Router
- Node.js 18+
- @lazorkit/wallet package installed

## Step 1: Set Up the Provider

First, wrap your application with the `LazorkitProvider` to initialize the SDK.

```tsx
// app/providers.tsx
'use client';

import { LazorkitProvider } from '@lazorkit/wallet';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazorkitProvider
      rpcUrl="https://api.devnet.solana.com"
      ipfsUrl="https://ipfs.io"
      paymasterUrl=""
    >
      {children}
    </LazorkitProvider>
  );
}
```

Add the provider to your root layout:

```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Step 2: Use the Wallet Hook

The `useWallet` hook provides access to wallet state and methods:

```tsx
'use client';

import { useWallet } from '@lazorkit/wallet';

export function WalletComponent() {
  const {
    connect,
    disconnect,
    reconnect,
    smartWalletPubkey,
    isConnected,
    isLoading,
    error
  } = useWallet();

  return (
    <div>
      {!isConnected ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <div>
          <p>Address: {smartWalletPubkey?.toString()}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
```

## Step 3: Handle Session Persistence

Store the wallet session in localStorage to enable auto-reconnection:

```tsx
import { useEffect } from 'react';

export function PasskeyLogin() {
  const { connect, reconnect, smartWalletPubkey } = useWallet();

  useEffect(() => {
    if (smartWalletPubkey) {
      localStorage.setItem('wallet_pubkey', smartWalletPubkey.toString());
    }
  }, [smartWalletPubkey]);

  useEffect(() => {
    reconnect();
  }, [reconnect]);

  return <button onClick={connect}>Connect</button>;
}
```

## Step 4: Error Handling

Always handle potential errors during connection:

```tsx
const handleConnect = async () => {
  try {
    await connect();
  } catch (err) {
    console.error('Connection error:', err);
  }
};
```

## Key Concepts

### WebAuthn Flow

1. User clicks "Connect with Passkey"
2. Browser prompts for biometric authentication
3. WebAuthn creates a credential tied to your domain
4. Lazorkit creates an on-chain smart wallet
5. User is authenticated without seed phrases

### Smart Wallet Benefits

- No private key management required
- Phishing-resistant authentication
- Works across devices with passkey sync
- On-chain verification for security
- Native browser support

## Next Steps

- Learn how to send gasless transactions in Tutorial 02
- Explore advanced features like transaction signing
- Implement custom UI with wallet state

## Resources

- [Lazorkit Documentation](https://lazorkit.com)
- [WebAuthn Guide](https://webauthn.guide)
- [Solana Devnet Faucet](https://faucet.solana.com)
