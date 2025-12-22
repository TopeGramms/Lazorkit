'use client';

import { useWallet } from '@lazorkit/wallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, LogOut, Wallet } from 'lucide-react';
import { shortenAddress } from '@/lib/solana';
import { clearWalletSession } from '@/lib/lazorkit';
import { useState, useEffect } from 'react';
import { getBalance } from '@/lib/solana';

export function WalletStatus() {
  const { smartWalletPubkey, disconnect, isConnected } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (smartWalletPubkey) {
        const bal = await getBalance(smartWalletPubkey);
        setBalance(bal);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [smartWalletPubkey]);

  const handleCopy = async () => {
    if (smartWalletPubkey) {
      await navigator.clipboard.writeText(smartWalletPubkey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    clearWalletSession();
  };

  if (!isConnected || !smartWalletPubkey) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connected
          </CardTitle>
          <Badge className="bg-green-500 hover:bg-green-600">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Address</p>
          <div className="flex items-center gap-2">
            <code className="text-sm bg-muted px-2 py-1 rounded flex-1">
              {shortenAddress(smartWalletPubkey.toString())}
            </code>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-green-500 mt-1">Copied to clipboard!</p>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Balance</p>
          <p className="text-2xl font-bold">{balance.toFixed(4)} SOL</p>
        </div>

        <Button
          onClick={handleDisconnect}
          variant="outline"
          className="w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
}
