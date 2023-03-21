<template>
    <div class="h-full bg-white bg-opacity-70 rounded">
        <div v-if="!activeAccount.address" class="flex items-center justify-center h-full">
            <button
                @click="connectToMetamask()"
                class="text-white shadow-md rounded bg-red-500 px-4 py-2 hover:bg-red-600"
                type="button"
            >
                Connect to Metamask
            </button>
        </div>
        <div v-else-if="activeAccount.network !== 5" class="flex items-center justify-center h-full">
            <button
                @click="switchNetwork()"
                class="text-white shadow-md rounded bg-yellow-500 px-4 py-2 hover:bg-yellow-600"
                type="button"
            >
                Wrong network !! Switch network to goerli
            </button>
        </div>
        <div v-else class="flex flex-col justify-between p-10 h-full">
            <div class="flex flex-col space-y-4">
                <h1 class="font-bold text-2xl">Account Detail</h1>
                <div class="space-y-2">
                    <p>Address: {{ activeAccount.address }}</p>
                    <p>
                        Balance:
                        {{ web3.utils.fromWei(activeAccount.balance, 'ether') }} eth
                    </p>
                    <p>
                        Network:
                        {{ activeAccount.network === 5 ? 'Goerli' : 'Wrong network' }}
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-6 gap-y-4 gap-x-2">
                <div class="col-span-6">
                    <div class="flex justify-between">
                        <h1 class="font-bold text-2xl">Buy Lottery</h1>
                        <div class="flex space-x-2">
                            <button
                                class="w-10 h-10 rounded bg-green-500 hover:bg-green-600 text-2xl text-white shadow-md"
                                type="button"
                            >
                                +
                            </button>

                            <button
                                class="w-10 h-10 rounded bg-red-500 hover:bg-red-600 text-2xl text-white shadow-md"
                                type="button"
                            >
                                -
                            </button>
                        </div>
                    </div>
                </div>
                <div v-for="number in numbers" :key="id" class="col-span-1">
                    <input
                        class="w-full h-12 rounded text-center focus:outline-sky-500"
                        type="text"
                        :placeholder="number.label"
                        maxlength="1"
                    />
                </div>
                <div class="col-span-6">
                    <button class="text-white bg-yellow-500 hover:bg-yellow-600 py-2 rounded w-full shadow-md" type="button">
                        Purchase !!
                    </button>
                </div>
            </div>

            <div class="flex flex-col space-y-4">
                <h1 class="font-bold text-2xl">Purchase History</h1>
                <div class="flex flex-col space-y-2 h-60 bg-blue-500 rounded overflow-y-auto p-4">
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
const Web3 = require('web3');
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
            accounts: [],
            activeAccount: {
                address: null,
                balance: null,
                network: null,
            },
        };
    },
    methods: {
        async connectToMetamask() {
            if (window.ethereum) {
                this.accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                this.web3 = new Web3(window.ethereum);
                this.activeAccount = {
                    address: await this.web3.utils.toChecksumAddress(this.accounts[0]),
                    balance: await this.web3.eth.getBalance(this.accounts[0]),
                    network: await this.web3.eth.net.getId(),
                };
            } else {
                alert('You must install metamask first.');
            }
        },
        async switchNetwork() {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(5) }],
            });

            this.activeAccount = {
                address: await this.web3.utils.toChecksumAddress(this.accounts[0]),
                balance: await this.web3.eth.getBalance(this.accounts[0]),
                network: await this.web3.eth.net.getId(),
            };
        },
    },
};
</script>

<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: auto;
    scrollbar-color: #c8c4ca #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 16px;
}

*::-webkit-scrollbar-track {
    background: #ffffff;
}

*::-webkit-scrollbar-thumb {
    background-color: #c8c4ca;
    border-radius: 10px;
    border: 3px solid #ffffff;
}
</style>
