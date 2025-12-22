import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SOLANA_RPC_URL, USDC_MINT_DEVNET } from './constants';

export const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

export async function getBalance(publicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
}

export async function getUsdcBalance(walletAddress: PublicKey): Promise<number> {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletAddress, {
      mint: new PublicKey(USDC_MINT_DEVNET),
    });

    if (tokenAccounts.value.length === 0) {
      return 0;
    }

    const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    return balance || 0;
  } catch (error) {
    console.error('Error fetching USDC balance:', error);
    return 0;
  }
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
