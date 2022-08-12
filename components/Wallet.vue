<template>
  <div>
    <div v-if="walletAddress">
      <p>{{ walletAddress }}</p>
      <button @click="logout">Disconnect</button>
    </div>
    <button v-else @click="connect">Connect</button>
  </div>
</template>

<script>
import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate';

import { LikeCoinWalletConnector, LikeCoinWalletConnectorMethod } from '@likecoin/wallet-connector';

export default {
  name: "WalletConnector",
  data() {
    return {
      offlineSigner: undefined,
      walletAddress: '',
      toAddress: 'like145at6ratky0leykf43zqx8q33ramxhjclh0t9u',
      amount: 1,
      isSending: false,
      isShowAlert: false,
      txHash: '',
      error: '',
    };
  },
  computed: {
    formattedWalletAddress() {
      return (
        this.walletAddress.split(`1`)[0] + `…` + this.walletAddress.slice(-4)
      );
    },
    txURL() {
      return this.connector
        ? `${this.connector.restURL}/cosmos/tx/v1beta1/txs/${this.txHash}`
        : '';
    },
  },
  watch: {
    error(error) {
      if (error) {
        this.isShowAlert = true;
      }
    },
  },
  mounted() {
    this.connector = new LikeCoinWalletConnector({
      chainId: 'likecoin-mainnet-2',
      chainName: 'LikeCoin',
      rpcURL: 'https://mainnet-node.like.co/rpc/',
      restURL: 'https://mainnet-node.like.co',
      coinType: 118,
      coinDenom: 'LIKE',
      coinMinimalDenom: 'nanolike',
      coinDecimals: 9,
      bech32PrefixAccAddr: 'like',
      bech32PrefixAccPub: 'likepub',
      bech32PrefixValAddr: 'likevaloper',
      bech32PrefixValPub: 'likevaloperpub',
      bech32PrefixConsAddr: 'likevalcons',
      bech32PrefixConsPub: 'likevalconspub',
      availableMethods: [
        LikeCoinWalletConnectorMethod.Keplr,
        LikeCoinWalletConnectorMethod.KeplrMobile,
        LikeCoinWalletConnectorMethod.LikerId,
        LikeCoinWalletConnectorMethod.Cosmostation,
      ],
      onInit: ({ accounts: [account], offlineSigner }) => {
        this.offlineSigner = offlineSigner;
        this.walletAddress = account.bech32Address || account.address;
      },
    });
    const session = this.connector.restoreSession();
    if (session?.accounts) {
      const { accounts: [account] } = session;
      this.walletAddress = account.bech32Address || account.address;
    }
  },
  methods: {
    connect() {
      this.connector.openConnectWalletModal();
    },
    logout() {
      this.connector.disconnect();
      this.walletAddress = '';
    },

    async send() {
      await this.connector.initIfNecessary();
      this.error = false;
      this.txHash = '';
      this.isSending = true;
      const client = await SigningStargateClient.connectWithSigner(
        this.connector.rpcURL,
        this.offlineSigner
      );

      const denom = this.connector.coinMinimalDenom;
      const amount = [
        {
          amount: `${this.amount * Math.pow(10, this.connector.coinDecimals)}`,
          denom,
        },
      ];
      const fee = {
        amount: [
          {
            amount: '5000',
            denom,
          },
        ],
        gas: '200000',
      };
      const result = await client.sendTokens(
        this.walletAddress,
        this.toAddress,
        amount,
        fee,
        ''
      );
      assertIsDeliverTxSuccess(result);
      this.isSending = false;

      if (result.code === 0) {
        this.txHash = result.code;
      } else {
        this.error = result.rawLog;
      }
    },
  },
};
</script>
