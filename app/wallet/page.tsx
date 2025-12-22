'use client';

import { useWallet } from '@lazorkit/wallet';
import { PasskeyLogin } from '@/components/PasskeyLogin';
import { WalletStatus } from '@/components/WalletStatus';
import { SendUsdc } from '@/components/SendUsdc';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WalletPage() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Wallet Dashboard</h1>
          <p className="text-slate-600">
            {isConnected
              ? 'Manage your passkey wallet and send transactions'
              : 'Connect your wallet to get started'}
          </p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          {!isConnected ? (
            <PasskeyLogin />
          ) : (
            <>
              <WalletStatus />
              <SendUsdc />
            </>
          )}
        </div>

        {isConnected && (
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">
              Need test SOL?
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              To test transactions, you need SOL in your wallet. Request devnet SOL from the Solana faucet.
            </p>
            <a
              href="https://faucet.solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              Get Devnet SOL →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
