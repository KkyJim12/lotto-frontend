<template>
  <div class="h-full bg-white bg-opacity-70 rounded">
    <div v-if="!account" class="flex items-center justify-center h-full">
      <button
        @click="connectToMetamask()"
        class="text-white shadow-md rounded bg-red-500 px-4 py-2 hover:bg-red-600"
        type="button"
      >
        Connect to Metamask
      </button>
    </div>
    <div v-else class="flex flex-col justify-between p-10 h-full">
      <div class="flex flex-col space-y-4">
        <h1 class="font-bold text-2xl">Account Detail</h1>
        <div class="space-y-2">
          <p>Address:</p>
          <p>Balance:</p>
          <p>Network:</p>
        </div>
      </div>
      <div class="flex flex-col space-y-4">
        <h1 class="font-bold text-2xl">Buy Lottery</h1>
        <div class="flex space-x-2">
          <input
            v-for="number in numbers"
            :key="id"
            class="w-10 h-10 rounded text-center focus:outline-sky-500"
            type="text"
            :placeholder="number.label"
            maxlength="1"
          />
        </div>
        <button
          class="text-white bg-green-500 hover:bg-green-600 py-2 rounded"
          type="button"
        >
          Purchase !!
        </button>
      </div>

      <div class="flex flex-col space-y-4">
        <h1 class="font-bold text-2xl">Purchase History</h1>
        <div
          class="flex flex-col space-y-2 h-60 bg-sky-500 rounded overflow-y-auto p-4"
        >
          <table class="table-fixed">
            <thead>
              <tr>
                <th class="text-white">Rounds</th>
                <th class="text-white">Tickets</th>
                <th class="text-white">Wins</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="history in histories" :key="index">
                <td class="text-white text-center">{{ history.rounds }}</td>
                <td class="text-white text-center">{{ history.tickets }}</td>
                <td class="text-white text-center">{{ history.wins }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      histories: [
        { rounds: 1, tickets: 3, wins: 2 },
        { rounds: 2, tickets: 3, wins: 2 },
        { rounds: 3, tickets: 3, wins: 2 },
        { rounds: 4, tickets: 3, wins: 2 },
        { rounds: 5, tickets: 3, wins: 2 },
        { rounds: 6, tickets: 3, wins: 2 },
        { rounds: 7, tickets: 3, wins: 2 },
        { rounds: 8, tickets: 3, wins: 2 },
        { rounds: 9, tickets: 3, wins: 2 },
        { rounds: 10, tickets: 3, wins: 2 },
        { rounds: 11, tickets: 3, wins: 2 },
        { rounds: 12, tickets: 3, wins: 2 },
      ],
      numbers: [
        { id: 1, label: 1 },
        { id: 2, label: 2 },
        { id: 3, label: 3 },
        { id: 4, label: 4 },
        { id: 5, label: 5 },
        { id: 6, label: 6 },
      ],
      web3: null,
      account: null,
    }
  },
  methods: {
    async connectToMetamask() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.web3 = window.ethereum
        this.account = accounts[0]
      } else {
        alert('You must install metamask first.')
      }
    },
  },
}
</script>
