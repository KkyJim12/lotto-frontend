export const state = () => ({
  accountAddress: '',
  web3: null,
})

export const mutations = {
  setWeb3(state, { web3 }) {
    state.web3 = web3
  },
  setAccount(state, { account }) {
    state.accountAddress = account
  },
}
