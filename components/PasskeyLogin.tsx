'use client';

import { useWallet } from '@lazorkit/wallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { saveWalletSession } from '@/lib/lazorkit';
import { useEffect } from 'react';

export function PasskeyLogin() {
  const { connect, isLoading, isConnected, smartWalletPubkey, error } = useWallet();

  useEffect(() => {
    if (smartWalletPubkey) {
      saveWalletSession(smartWalletPubkey.toString());
    }
  }, [smartWalletPubkey]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err) {
      console.error('Connection error:', err);
    }
  };

  if (isConnected) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Connect Your Wallet</CardTitle>
        <CardDescription>
          Create or connect your passkey-based smart wallet to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleConnect}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            'Connect with Passkey'
          )}
        </Button>
        {error && (
          <p className="mt-4 text-sm text-red-500">
            Error: {error.message}
          </p>
        )}
        <p className="mt-4 text-xs text-muted-foreground text-center">
          No seed phrases or extensions required. Use Face ID or Touch ID to authenticate.
        </p>
      </CardContent>
    </Card>
  );
}
