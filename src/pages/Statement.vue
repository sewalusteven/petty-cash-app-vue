<script setup lang="ts">

import {dispatcher} from "../configs/dispatcher.ts";
import {computed, onMounted, ref} from "vue";
import {
  GetTransactions
} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem/sdk/ProductTeamUniscale/PettyCashService_1_0/ServiceToModule/PettyCashService/ViewStatementWithSummary";
import {
  TransactionFull
} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem/sdk/ProductTeamUniscale/PettyCashService/PettyCashService";

const transactions = ref<TransactionFull>([])
const start = ref("")
const end = ref("")

const submit = () => {
  start.value = new Date(start.value)
  end.value = new Date(end.value)

  dispatcher.request(GetTransactions.with({startDate: start.value, endDate: end.value})).then(res => {
    transactions.value = res.value
  }).catch(err => {
    console.log(err)
  })
}

const totalDebit = computed(() => {
  return transactions.value.reduce((acc, t) => {
    if(t.type === "Debit"){
      return acc + t.amount
    }
    return acc
  }, 0)
})

const totalCredit = computed(() => {
  return transactions.value.reduce((acc, t) => {
    if(t.type === "Credit"){
      return acc + t.amount
    }
    return acc
  }, 0)
})

const remainingBalance = computed(() => {
  return totalCredit.value - totalDebit.value
})

</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="p-3 flex flex-row justify-between">
      <span class="font-bold uppercase"> Statement</span>
      <div class="flex flex-row gap-1 items-center">
        <span class="capitalize text-xs">Start: </span>
        <input type="date" v-model="start" id="start" class="border  p-1 mr-3 text-xs" />

        <span class="capitalize text-xs">End: </span>
        <input type="date" v-model="end" id="end" class="border  p-1 mr-3 text-xs" />

        <button @click="submit" class="bg-blue-500 text-white p-2 rounded text-xs">Fetch Statement</button>
      </div>
    </div>

    <div class="border w-full "></div>
    <div class="min-h-40 flex flex-col gap-2 p-3">
      <div class="border-blue-400 border-2 text-sm w-1/2 flex flex-col gap-2 p-2">
        <div class="flex flex-row justify-between">
          <span class="font-bold">Total Debit</span>
          <span class="italic">{{ totalDebit }} UGX</span>
        </div>
        <div class="flex flex-row justify-between">
          <span class="font-bold">Total Credit</span>
          <span class="italic">{{ totalCredit }} UGX</span>
        </div>
        <div class="flex flex-row justify-between">
          <span class="font-bold">Remaining Balance</span>
          <span class="italic">{{ remainingBalance }} UGX</span>
        </div>
      </div>

      <div v-if="transactions.length !== 0" v-for="t in transactions" :key="t.transactionIdentifier" class="border border-dashed border-blue-400 rounded grid grid-cols-12 gap-2 text-xs p-3">
        <div class="col-span-2 flex flex-col gap-2">
          <span class="font-bold">Date</span>
          <span class="italic">{{ new Date(t.createdAt).toLocaleString() }}</span>
        </div>
        <div class="col-span-2 flex flex-col gap-2">
          <span class="font-bold">Type</span>
          <span class="italic">{{ t.type }}</span>
        </div>
        <div class="col-span-4 flex flex-col gap-2">
          <span class="font-bold">Narration</span>
          <span class="italic">{{ t.item }}</span>
        </div>
        <div class="col-span-2 flex flex-col gap-2">
          <span class="font-bold">Amount</span>
          <span class="italic">{{ t.amount }} UGX</span>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>
