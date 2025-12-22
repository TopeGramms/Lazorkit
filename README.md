# Lazorkit Next.js Starter

A production-ready Next.js starter project demonstrating Lazorkit SDK integration with passkey authentication and gasless Solana transactions on Devnet.

## Features

- **Passkey Authentication**: No seed phrases or extensions - authenticate with Face ID, Touch ID, or fingerprint
- **Smart Wallet**: On-chain smart wallet with WebAuthn verification
- **Gasless Transactions**: Send SOL without paying gas fees (sponsored by paymaster)
- **Session Persistence**: Auto-restore wallet session on page refresh
- **Modern Stack**: Built with Next.js 14 App Router and TypeScript
- **Beautiful UI**: Clean, professional interface using shadcn/ui components

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd lazorkit-nextjs-starter
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Configure environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
lazorkit-nextjs-starter/
├── app/
│   ├── page.tsx              # Landing page
│   ├── wallet/page.tsx       # Wallet dashboard
│   ├── layout.tsx            # Root layout
│   └── providers.tsx         # Lazorkit provider setup
├── components/
│   ├── PasskeyLogin.tsx      # Passkey authentication
│   ├── WalletStatus.tsx      # Wallet info display
│   └── SendUsdc.tsx          # Transaction component
├── lib/
│   ├── lazorkit.ts           # SDK configuration
│   ├── solana.ts             # Solana utilities
│   └── constants.ts          # App constants
├── tutorials/
│   ├── 01-passkey-wallet.md  # Passkey setup guide
│   └── 02-gasless-transaction.md  # Transaction guide
└── README.md
```

## Usage

### Connect Wallet

1. Navigate to the Wallet page
2. Click "Connect with Passkey"
3. Authenticate with your biometric (Face ID, Touch ID, or fingerprint)
4. Your smart wallet is created and connected

### Send Transactions

1. Ensure your wallet is connected
2. Get test SOL from the [Solana Faucet](https://faucet.solana.com)
3. Enter recipient address and amount
4. Click "Send Transaction"
5. View transaction on Solana Explorer

## How It Works

### Passkey Authentication

Lazorkit uses WebAuthn to create passkey-based smart wallets:

1. User clicks connect button
2. Browser prompts for biometric authentication
3. WebAuthn creates a secure credential
4. Smart wallet is deployed on Solana
5. User is authenticated without private keys

### Gasless Transactions

Transactions are sponsored by a paymaster service:

1. Create transaction (e.g., SOL transfer)
2. Sign with passkey
3. Lazorkit submits to paymaster
4. Paymaster covers gas fees
5. Transaction confirmed on-chain

## Configuration

### Environment Variables (Optional)

```env
# IPFS URL for Lazorkit
NEXT_PUBLIC_IPFS_URL=https://ipfs.io

# Paymaster URL for gasless transactions
NEXT_PUBLIC_PAYMASTER_URL=
```

Default values are provided, so no configuration is required for basic usage.

### Network Settings

By default, the app connects to Solana Devnet. To change networks, update `lib/constants.ts`:

```typescript
export const SOLANA_NETWORK = 'devnet'; // or 'mainnet-beta', 'testnet'
export const SOLANA_RPC_URL = clusterApiUrl('devnet');
```

## Tutorials

- [Tutorial 01: Creating a Passkey Wallet](./tutorials/01-passkey-wallet.md)
- [Tutorial 02: Sending Gasless Transactions](./tutorials/02-gasless-transaction.md)

## Development

### Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npm run typecheck
```

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Blockchain**: Solana (Devnet)
- **Wallet SDK**: Lazorkit

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings
4. (Optional) Add environment variables

### Other Platforms

The app works on any platform that supports Next.js:

- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway
- Render

## Troubleshooting

### Passkey Not Working

- Ensure you're using a supported browser (Chrome, Safari, Edge)
- Check that your device has biometric authentication enabled
- Try using a different authentication method (e.g., security key)

### Transaction Failures

- Verify your wallet has sufficient SOL balance
- Check recipient address is valid
- Ensure you're connected to Devnet
- View browser console for error details

### Session Not Persisting

- Check browser allows localStorage
- Try clearing browser cache
- Reconnect your wallet

## Resources

- [Lazorkit Documentation](https://lazorkit.com)
- [Lazorkit NPM Package](https://www.npmjs.com/package/@lazorkit/wallet)
- [Solana Documentation](https://docs.solana.com)
- [WebAuthn Guide](https://webauthn.guide)
- [Solana Explorer](https://explorer.solana.com)
- [Solana Faucet](https://faucet.solana.com)

## Security Notes

- This is a **development/demo project** for Solana Devnet
- Do NOT use on mainnet without thorough security audits
- Lazorkit SDK is in active development
- Always verify transaction details before signing
- Keep your passkeys secure

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- GitHub Issues: Report bugs and request features
- Lazorkit Discord: Community support
- Documentation: Check tutorials and guides

## Acknowledgments

- Built with [Lazorkit SDK](https://lazorkit.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Powered by [Solana](https://solana.com)

---

**Happy Building!** 🚀
