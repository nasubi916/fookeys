<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted } from "vue";
import { RouterView } from "vue-router";
import { deletePlayer } from "@/server/usePlayerID";
import { tryOnMounted, tryOnUnmounted, tryOnBeforeUnmount } from "@vueuse/core";


onMounted(async () => {
  console.log("マウントされました");
});

//アプリが閉じられたらユーザーIDを削除する
tryOnBeforeUnmount(async () => {
  await deletePlayer();
  console.log("アンマウントされました");
});
</script>

<template>
  <div class="bg-gray-600 h-screen">
    <RouterView />
  </div>
</template>
