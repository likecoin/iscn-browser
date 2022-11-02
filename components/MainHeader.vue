<template>
  <div>
    <header>
      <div>
        <NuxtLink class="gradient-text" to="/">
          ISCN Browser
        </NuxtLink>
      </div>
      <div style="flex: 1" />
      <div>
        <a class="item-text" href="https://iscn.io" target="_blank">
          ISCN specificaiton
        </a>
      </div>
      <div>
        <a class="item-text" href="https://like.co" target="_blank">
          About LikeCoin
        </a>
      </div>
    </header>
    <div style="margin-left: 20px; margin-right: 20px">
      <WalletConnector />
      <form :action="`${BASE_PATH}/search`">
        <label>Search: <input type="text" name="q"></label>
      </form>
    </div>
  </div>
</template>

<script>
import WalletConnector from './Wallet.vue'
import { BASE_PATH } from '@/config'
export default {
  components: {
    WalletConnector,
  },
  data () {
    return {
      BASE_PATH,
    }
  }
}
</script>

<style>
header {
  display: flex;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: #28646e;
  width: 100%;
  height: 100px;
  align-items: center;
}
.gradient-text {
  display: flex;
  flex-wrap: nowrap;
  max-width: max-content;

  margin-left: 10px;
  font-size: 64px;
  color: transparent;
  line-height: 1.35;
  font-weight: 600;
  font-size: 48px;
  background-clip: text;
  -webkit-background-clip: text;
  --tw-gradient-to: #f0e6b4;
  --tw-gradient-from: #d2f0f0;
  --tw-gradient-stops: var(--tw-gradient-from),
    var(--tw-gradient-to, rgba(210, 240, 240, 0));
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.item-text {
  margin-left: 10px;
  margin-right: 10px;
  color: #EBEBEB;
}
</style>
