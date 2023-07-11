<script setup lang="ts">
import { toRefs, ref, watch } from "vue";
import { e, s, i } from "@/log";
import { playerStore } from "@/main";
import { storeToRefs } from "pinia";
import { OnLongPress } from '@vueuse/components'
import { vOnClickOutside } from '@vueuse/components'

const { pushHand, popHand } = playerStore;
const { player, cardLock } = storeToRefs(playerStore);
const { hand } = toRefs(player.value);

const handSelected = ref([false, false, false, false, false, false, false, false, false]);
const longPressed = ref([false, false, false, false, false, false, false, false, false])
//WatchでCardLockを監視して､trueになったら使用するカードを手札から削除する
watch(cardLock, (newVal) => {
  if (newVal) {
    const deleteIndex = handSelected.value.reduce((acc: number[], bool, index) => {
      if (bool) acc.unshift(index);
      return acc;
    }, []);
    deleteIndex.forEach((index) => {
      hand.value.splice(index, 1);
      handSelected.value[index] = false;
    });
    console.log(i, "deleteHand: ", "hand: ", hand.value.map((card) => card.name));
  }
})
//長押しでカードの詳細を表示する
const onLongPressCallback = (index: number) => {
  longPressed.value[index] = true
  console.log("longPressedComponent: ", longPressed.value[index]);
}
const resetComponent = (index: number) => {
  longPressed.value[index] = false
}
//HandからFieldへ
const pushCard = (index: number) => {
  if (cardLock.value) return;
  if (handSelected.value[index]) throw new Error("failed to pushCard");
  handSelected.value[index] = !handSelected.value[index]
  pushHand(index)
};
//FieldからHandへ
const popCard = (index: number, id: number) => {
  if (cardLock.value) return;
  if (!handSelected.value[index]) throw new Error("failed to popCard");
  handSelected.value[index] = !handSelected.value[index]
  popHand(index, id)
};
</script>

<template>
  <div>
    <ul class="text-xs flex justify-start">
      <div v-for="(card, index) in hand" :key="card.id">
        <div v-if="!card.rotten">
          {{ "longPressed: " + longPressed[index] }}
          <!-- <div v-if="longPressed[index]" v-on-click-outside="longPressed[index] = false">
            Hello World
          </div> -->
          <vOnClickOutside v-if="false" />
          <OnLongPress @click="!handSelected[index] ? pushCard(index) : popCard(index, card.id)"
            @trigger="onLongPressCallback(index)"
            :class="handSelected[index] ? 'transform -translate-y-2' : null" class="overCard">
            <img :src="`/img/companys/${card.company}.png`" height="100" />
            <div class="overText">
              <h5>{{ card.name }}</h5>
              <p>ID:{{ card.id }}</p>
              <p>📊🚬:{{ card.company }}</p>
              <p>{{ "🍃:" + card.waste + "🍖: " + card.hungry }}</p>
              <div v-if="card.priority">
                <p>{{ "🦶: " + card.priority }}</p>
              </div>
              <div v-if="card.atk">
                <p>{{ "⚔:" + card.atk }}</p>
              </div>
              <div v-if="card.def">
                <p>{{ "🛡:" + card.def }}</p>
              </div>
              <div v-if="card.tech">
                <p>{{ "🏹:" + card.tech }}</p>
              </div>
              <div v-if="card.heal">
                <p>{{ "💖:" + card.heal }}</p>
              </div>
            </div>
          </OnLongPress>
          <button @click="resetComponent(index)">reset</button>
        </div>
        <div v-else>
          <div :class="handSelected[index] ? 'bg-red-100' : 'bg-blue-100'"
            class="w-30 h-30 rounded-lg p-4 flex flex-col justify-center items-center">
            <h5 class="text-bold">腐ってます!!!!!</h5>
          </div>
        </div>
      </div>
    </ul>
    {{ handSelected }}
  </div>
</template>
