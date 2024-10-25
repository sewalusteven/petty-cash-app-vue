<script setup lang="ts">
import {computed, ref} from 'vue'
import {
  NewTransactionInput
} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem/sdk/ProductTeamUniscale/PettyCashService/PettyCashService";

import {dispatcher} from "../configs/dispatcher.ts";
import {
  NewTransaction
} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem/sdk/ProductTeamUniscale/PettyCashService_1_0/ServiceToModule/PettyCashService/CaptureTransaction";
import {Result} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem";
type messageType =  "success" | "error";
interface messageInfo {
  message: string,
  type: messageType,
  details?: Result
}

const formInput = ref<NewTransactionInput>({
  amount: 0,
  createdAt: new Date(),
  type: "debit",
  item: "",

})

const message = ref<messageInfo>({
  message: "",
  type: "success"
})

const isMessage = ref<boolean>(false);

const submit = () => {
  formInput.value.createdAt = new Date(formInput.value.createdAt);
  dispatcher.request(NewTransaction.with(formInput.value)).then(res => {
    isMessage.value = true;
    if(res.success){
      message.value = {
        message: "Transaction has been added",
        type: "success",
        details: res
      }
    }else {
      message.value = {
        message: "Transaction failed to add",
        type: "error",
        details: res
      }
    }

  }).catch(err => {
    isMessage.value = true;
    message.value = {
      message: "Transaction failed to add",
      type: "error",
      details: err
    }})

}

</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="p-3">
        <span class="font-bold uppercase"> Input Transaction</span>
    </div>

    <div class="border w-full "></div>

    <div v-if="isMessage" :class="message.type === 'success' ? 'text-green-700': 'text-red-700'">
      {{ message.message }}
    </div>

    <div class="min-h-40 flex flex-col gap-2 p-3">
        <div class="flex flex-col gap-2">
            <label for="amount">Amount</label>
            <input type="number" v-model="formInput.amount" id="amount" class="border  p-1" />
        </div>
        <div class="flex flex-col gap-2">
            <label for="date">Date</label>
            <input type="date" v-model="formInput.createdAt" id="date" class="border  p-1" />
        </div>
    
        <div class="flex flex-col gap-2">
            <label for="description">Description</label>
            <input v-model="formInput.item" type="text" id="description" class="border p-1" />
        </div>
    
        <div class="flex flex-col gap-2">
            <label for="type">Type</label>
            <select v-model="formInput.type" id="type" class="border p-1">
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
            </select>
        </div>
    
        <div class="flex flex-row gap-2">
            <button @click="submit" class="bg-blue-500 text-white p-2 rounded">Submit</button>
        </div>
    </div>

  </div>
</template>

<style scoped>

</style>
