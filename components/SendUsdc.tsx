'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Send, ExternalLink } from 'lucide-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { EXPLORER_URL } from '@/lib/constants';

export function SendUsdc() {
  const { signAndSendTransaction, smartWalletPubkey, isConnected } = useWallet();
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

      const transferInstruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: recipientPubkey,
        lamports,
      });

      const sig = await signAndSendTransaction({
        instructions: [transferInstruction],
        transactionOptions: {
          clusterSimulation: 'devnet',
        },
      });

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

  if (!isConnected) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Send SOL (Gasless)</CardTitle>
        <CardDescription>
          Send SOL on Devnet with sponsored transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="Enter Solana address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (SOL)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={isLoading || !recipient || !amount}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Transaction
            </>
          )}
        </Button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {signature && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md space-y-2">
            <p className="text-sm font-medium text-green-800">
              Transaction Successful!
            </p>
            <a
              href={EXPLORER_URL(signature)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              View on Explorer
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          This is a gasless transaction on Solana Devnet. Network fees are sponsored by the paymaster.
        </p>
      </CardContent>
    </Card>
  );
}
