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
                        <h1 class="font-bold text-2xl">Buy Lottery ({{ purchasedLotteries.length }}/3)</h1>
                        <div class="flex space-x-2">
                            <button
                                @click="addLottery()"
                                class="w-10 h-10 rounded bg-green-500 hover:bg-green-600 text-2xl text-white shadow-md"
                                :class="purchasedLotteries.length >= 3 ? 'cursor-not-allowed' : ''"
                                type="button"
                                :disabled="purchasedLotteries.length >= 3"
                            >
                                +
                            </button>

                            <button
                                @click="removeLottery()"
                                class="w-10 h-10 rounded bg-red-500 hover:bg-red-600 text-2xl text-white shadow-md"
                                :class="purchasedLotteries.length == 1 ? 'cursor-not-allowed' : ''"
                                type="button"
                                :disabled="purchasedLotteries.length == 1"
                            >
                                -
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-span-6">
                    <div v-for="(purchaseLottery, index) in purchasedLotteries" class="flex flex-col mb-2">
                        <div class="grid grid-cols-6 gap-x-2">
                            <div v-for="number in numbers" :key="number.id" class="col-span-1">
                                <input
                                    @input="updateInputValue($event, index, number.label)"
                                    class="w-full h-12 rounded text-center focus:outline-sky-500"
                                    type="text"
                                    :placeholder="number.value"
                                    maxlength="1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-6">
                    <button
                        @click="purchase()"
                        class="text-white bg-yellow-500 hover:bg-yellow-600 py-2 rounded w-full shadow-md"
                        type="button"
                    >
                        Purchase !!
                    </button>
                </div>
            </div>

            <div class="flex flex-col space-y-4">
                <h1 class="font-bold text-2xl">
                    Purchase History in round {{ this.round }} ({{
                        this.histories.lotteriesCount ? this.histories.lotteriesCount : '0'
                    }})
                </h1>
                <div class="flex flex-col space-y-2 h-60 bg-blue-500 rounded overflow-y-auto p-4">
                    <table class="table-fixed">
                        <thead>
                            <tr>
                                <th class="text-white">Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="history in histories.lotteries">
                                <td class="text-white text-center">{{ history }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { abi } from '~/static/abi.json';
const Web3 = require('web3');
export default {
    async mounted() {
        await this.connectToMetamask();
    },
    data() {
        return {
            round: null,
            purchasedLotteries: [{ first: null, second: null, third: null, fourth: null, fifth: null, sixth: null }],
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
                { id: 1, value: 1, label: 'first' },
                { id: 2, value: 2, label: 'second' },
                { id: 3, value: 3, label: 'third' },
                { id: 4, value: 4, label: 'fourth' },
                { id: 5, value: 5, label: 'fifth' },
                { id: 6, value: 6, label: 'sixth' },
            ],
            web3: null,
            contractAddress: '0x74555fdda96471e335597c1e636ec46bc63f0fd8',
            accounts: [],
            activeAccount: {
                address: null,
                balance: null,
                network: null,
            },
        };
    },
    methods: {
        addLottery() {
            if (this.purchasedLotteries.length < 3) {
                this.purchasedLotteries.push({
                    first: null,
                    second: null,
                    third: null,
                    fourth: null,
                    fifth: null,
                    sixth: null,
                });
            }
        },
        removeLottery() {
            if (this.purchasedLotteries.length > 1) {
                this.purchasedLotteries.pop();
            }
        },
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

                await this.getThisRound();
                await this.getPurchaseHistory();
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
        updateInputValue(e, index, label) {
            this.purchasedLotteries[index][label] = e.target.value;
        },
        async getThisRound() {
            try {
                const contract = await new this.web3.eth.Contract(abi, this.contractAddress);
                const response = await contract.methods.round().call();
                console.log(response);
                this.round = response;
            } catch (error) {
                console.log(error);
            }
        },
        async getPurchaseHistory() {
            try {
                const contract = await new this.web3.eth.Contract(abi, this.contractAddress, {
                    from: this.activeAccount.address,
                });
                const response = await contract.methods.showMyHistoryInThisRound(this.round).call();
                this.histories = response;
                console.log(this.histories);
            } catch (error) {
                console.log(error);
            }
        },
        async purchase() {
            try {
                const items = this.purchasedLotteries;

                const lotteries = [];

                items.map((item) => {
                    const thisLottery = `${item.first}${item.second}${item.third}${item.fourth}${item.fifth}${item.sixth}`;
                    lotteries.push(thisLottery);
                });

                const contract = await new this.web3.eth.Contract(abi, this.contractAddress);
                console.log(lotteries);
                const response = await contract.methods.purchase(lotteries).send({
                    from: this.activeAccount.address,
                    to: this.contractAddress,
                    value: 1000,
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
