<script setup lang="ts">
import { toRefs, ref } from "vue";
import { e, s, i } from "@/log";
import { playerStore } from "@/main";
import { storeToRefs } from "pinia";
import { watchShopEnd } from "@/server/useShop";
import type { Card } from "@/types";

const { offer, player, phase } = storeToRefs(playerStore);
const { hand, check } = toRefs(player.value);

const isOfferSelected = ref([false, false, false]);
//選択を確定させたらHandにtrueのカードを追加して､offerを空にする
const offerHand = async () => {
  const offerHand: Card[] = offer.value.filter((card, index) => isOfferSelected.value[index]);
  console.log(i, "offer2Hand: ", offerHand.map((card) => card.name));
  hand.value.push(...offerHand);
  hand.value.sort((a, b) => a.id - b.id);
  console.log(i, "offer2Hand");
  //!今のままだと選択確定を押さなければofferが残るが､ポップアップになる予定なのでOk
  offer.value.splice(0, offer.value.length);
  isOfferSelected.value = [false, false, false];
  await watchShopEnd();
}

</script>

<template>
  <div>
    <div v-if="phase === 'shop'">
      <button @click="offerHand()" :class="check ? 'bg-red-500' : 'bg-blue-500'">選択確定</button>
      {{ isOfferSelected }}
      <ul class="text-xs flex justify-start">
        <div v-for="(card, index) in offer" :key="card.id">
          <button @click="isOfferSelected[index] = !isOfferSelected[index]">
            <div :class="isOfferSelected[index] ? 'bg-red-100' : 'bg-blue-100'"
              class="w-30 h-30 rounded-lg p-4 flex flex-col justify-center items-center">
              <h5 class="text-bold">{{ card.name }}</h5>
              <p class="text-gray-600">ID:{{ card.id }}</p>
              <p class="text-gray-600">📊🚬:{{ card.company }}</p>
              <p class="text-gray-600">{{ "🍃:" + card.waste + "🍖: " + card.hungry }}</p>
              <div v-if="card.priority">
                <p class="text-gray-600">{{ "🦶: " + card.priority }}</p>
              </div>
              <div v-if="card.atk">
                <p class="text-gray-600">{{ "⚔:" + card.atk }}</p>
              </div>
              <div v-if="card.def">
                <p class="text-gray-600">{{ "🛡:" + card.def }}</p>
              </div>
              <div v-if="card.tech">
                <p class="text-gray-600">{{ "🏹:" + card.tech }}</p>
              </div>
            </div>
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>
