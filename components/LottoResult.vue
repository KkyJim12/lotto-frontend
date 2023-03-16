<template>
  <div
    class="h-full bg-white bg-opacity-70 rounded p-10 flex flex-col justify-between"
  >
    <div class="flex flex-col space-y-4">
      <h1 class="font-bold text-2xl">Round 200</h1>
      <div class="flex space-x-4">
        <div
          v-for="result in results"
          :key="index"
          class="rounded bg-blue-500 w-20 h-20 flex items-center justify-center"
        >
          <p class="font-bold text-white text-4xl">{{ result.value }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col space-y-4">
      <h1 class="font-bold text-2xl">Prize</h1>
      <div class="flex space-x-4">
        <div
          v-for="prize in prizes"
          :class="`flex flex-col space-y-2 bg-${prize.color}-500 rounded p-4`"
        >
          <p class="text-sm text-white font-bold">{{ prize.label }} match</p>
          <p class="text-xs text-white font-bold">
            Prize: {{ prize.rewards }} $
          </p>
          <p class="text-xs text-white font-bold">
            Winners: {{ prize.winners }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col space-y-4">
      <h1 class="font-bold text-2xl">Winner History</h1>
      <div
        class="flex flex-col space-y-2 h-80 bg-blue-500 rounded overflow-y-auto p-4"
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
</template>
<script>
export default {
  data() {
    return {
      prizes: [
        {
          label: '1 match',
          rewards: 10000,
          winners: 12,
          color: 'red',
        },
        {
          label: '2 match',
          rewards: 10000,
          winners: 12,
          color: 'green',
        },
        {
          label: '3 match',
          rewards: 10000,
          winners: 12,
          color: 'blue',
        },
        {
          label: '4 match',
          rewards: 10000,
          winners: 12,
          color: 'sky',
        },
        {
          label: '5 match',
          rewards: 10000,
          winners: 12,
          color: 'green',
        },
        {
          label: '6 match',
          rewards: 10000,
          winners: 12,
          color: 'red',
        },
      ],
      results: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
      ],
    }
  },
}
</script>
