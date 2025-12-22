import { clusterApiUrl } from '@solana/web3.js';

export const SOLANA_NETWORK = 'devnet';
export const SOLANA_RPC_URL = clusterApiUrl('devnet');

export const USDC_MINT_DEVNET = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';

export const WALLET_STORAGE_KEY = 'lazorkit_wallet_session';

export const LAZORKIT_CONFIG = {
  network: SOLANA_NETWORK,
  rpcUrl: SOLANA_RPC_URL,
};

export const EXPLORER_URL = (signature: string) =>
  `https://explorer.solana.com/tx/${signature}?cluster=${SOLANA_NETWORK}`;
