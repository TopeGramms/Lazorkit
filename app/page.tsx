import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Zap, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Lazorkit Next.js Starter
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Passkey-based smart wallet with gasless transactions on Solana Devnet
          </p>
          <Link href="/wallet">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Key className="h-10 w-10 mb-2 text-blue-600" />
              <CardTitle>Passkey Authentication</CardTitle>
              <CardDescription>
                No seed phrases or extensions. Use Face ID or Touch ID for secure, passwordless authentication.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 mb-2 text-yellow-600" />
              <CardTitle>Gasless Transactions</CardTitle>
              <CardDescription>
                Send transactions without paying gas fees. Network costs are sponsored by the paymaster.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 mb-2 text-green-600" />
              <CardTitle>Smart Wallet</CardTitle>
              <CardDescription>
                On-chain smart wallet with WebAuthn verification for enhanced security on Solana.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="bg-slate-900 text-slate-50">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Create and connect passkey-based smart wallets</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Persist wallet session in browser storage</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Auto-restore session on page refresh</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Send gasless SOL transactions on Devnet</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>View transaction signatures and explorer links</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
