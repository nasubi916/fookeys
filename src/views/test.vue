<script setup lang="ts">
import { ref, toRefs } from "vue";
import { playerStore } from "@/main";
import { storeToRefs } from "pinia";
import { onClickOutside } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

//storeの参照
const { id, player } = storeToRefs(playerStore);
const { name, hand } = toRefs(player.value);


const modal = ref(false)
function closeModal() {
  modal.value = false
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1>Test</h1>
    <div>
      <p class="text-sm font-medium text-gray-900 truncate">id:{{ id }}</p>
      <p class="text-sm font-medium text-gray-900 truncate">name:{{ name }}</p>
    </div>


    <button @click="modal = true">
      Open Modal
    </button>
    <div v-if="modal" v-on-click-outside="closeModal">
      Hello World
    </div>
    <vOnClickOutside v-if="false" />
  </div>
</template>
