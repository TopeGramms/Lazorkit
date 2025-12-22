import { SOLANA_RPC_URL } from './constants';

export const LAZORKIT_CONFIG = {
  rpcUrl: SOLANA_RPC_URL,
  portalUrl: process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.lazor.sh',
  paymasterConfig: process.env.NEXT_PUBLIC_PAYMASTER_URL
    ? {
        paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL,
        apiKey: process.env.NEXT_PUBLIC_PAYMASTER_API_KEY,
      }
    : undefined,
};

export const saveWalletSession = (publicKey: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lazorkit_wallet_pubkey', publicKey);
  }
};

export const getWalletSession = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lazorkit_wallet_pubkey');
  }
  return null;
};

export const clearWalletSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('lazorkit_wallet_pubkey');
  }
};
