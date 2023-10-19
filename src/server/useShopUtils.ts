import { toRefs } from "vue";
import { e, s, i } from "@/log";
import { gameStore, playerStore } from "@/main";
import { storeToRefs } from "pinia";
import { db } from "./firebase";
import { collection, deleteField, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { converter } from "@/server/converter";
import type { Card, GameData, PlayerData, Attribute, Status, SumCards } from "@/types";
import allCharacters from "@/assets/allCharacters";
import allMissions from "@/assets/allMissions";
import allCards from "@/assets/allCards";

//Collectionの参照
const playersRef = collection(db, "players").withConverter(converter<PlayerData>());
const gamesRef = collection(db, "games").withConverter(converter<GameData>());

//cardをランダムに1枚引く
export function drawCard(attribute?: Attribute): Card {
  let selectCard;
  while (!selectCard) {
    if (attribute) {
      const pickCard = structuredClone(allCards[Math.floor(Math.random() * allCards.length)]);
      if (attribute === "atk" && pickCard.id >= 1 && pickCard.id <= 16) selectCard = pickCard;
      if (attribute === "tech" && pickCard.id >= 17 && pickCard.id <= 32) selectCard = pickCard;
      if (attribute === "def" && pickCard.id >= 33 && pickCard.id <= 49) selectCard = pickCard;
      if (attribute === "sup" && pickCard.id >= 50) selectCard = pickCard;
    } else {
      let pickCard = structuredClone(allCards[Math.floor(Math.random() * allCards.length)]);
      if (pickCard.id !== 0) selectCard = pickCard;
    }
  }
  return selectCard;
}
//cardをランダムに1枚引く
export function drawOneCard(order?: Attribute | number): void {
  const { player, id } = storeToRefs(playerStore);
  const { hand } = toRefs(player.value);

  if (hand.value.length >= 9) return;
  if (typeof order === "number") {
    hand.value.push(structuredClone(allCards[order]));
  } else {
    hand.value.push(drawCard(order));
  }
  hand.value = [...hand.value].sort((a, b) => a.id - b.id);
  updateDoc(doc(playersRef, id.value), { hand: hand.value });
}
//drawExchangedCardを実行する
export async function draw3ExchangedCard() {
  console.log(i, "draw3ExchangedCardを実行しました");
  const { id, player, log } = storeToRefs(playerStore);
  const { hand } = toRefs(player.value);

  let selectCards: Card[] = [];
  for (let i = 0; i < 3; i++) {
    if (hand.value.length >= 9) return;
    let selectCard = drawCard();
    selectCard.waste = 8;
    selectCard.hungry = 0;
    selectCards[i] = selectCard;
    hand.value.push(selectCard);
    hand.value = [...hand.value].sort((a, b) => a.id - b.id);
  }
  updateDoc(doc(playersRef, id.value), { hand: hand.value });
  log.value = "draw3ExchangedCard: " + selectCards.map((card) => card.name);
}
//cardをHandに6枚セットする
export async function setHand(): Promise<void> {
  console.log(i, "setHandを実行しました");
  const { id, player } = storeToRefs(playerStore);
  const { hand } = toRefs(player.value);

  for (let i = 0; i < 6; i++) {
    if (hand.value.length >= 9) {
      console.log(i, "hand is full");
      return;
    } else {
      hand.value.push(drawCard());
    }
    hand.value = [...hand.value].sort((a, b) => a.id - b.id);
  }
  updateDoc(doc(playersRef, id.value), { hand: hand.value });
}
//Cardを3枚提示する
export async function setOffer(): Promise<void> {
  console.log(i, "setOfferを実行しました");
  const { offer } = storeToRefs(playerStore);

  offer.value = [];
  for (let i = 0; i < 3; i++) {
    offer.value.push(drawCard());
    offer.value = [...offer.value].sort((a, b) => a.id - b.id);
  }
}
//Handをすべて入れ替える
export async function changeAllHand(): Promise<void> {
  console.log(i, "changeAllHandを実行しました");
  const { id, player, log } = storeToRefs(playerStore);
  const { hand } = toRefs(player.value);

  const num = hand.value.length;
  hand.value = [];
  for (let i = 0; i < num; i++) {
    hand.value.push(drawCard());
  }
  updateDoc(doc(playersRef, id.value), { hand: hand.value });
  log.value = "changeAllHand: " + hand.value.map((card) => card.name);
}
//指定のcardを1枚引く
//missionを3つセットする
export async function setMissions(): Promise<void> {
  console.log(i, "setMissionsを実行しました");
  const { player, sign, log } = storeToRefs(playerStore);
  const { idGame } = toRefs(player.value);
  const { game, missions } = storeToRefs(gameStore);
  const { missionsNum } = toRefs(game.value);

  if (!sign.value) {
    for (let i = 0; i < 3; i++) {
      const selectMission = Math.floor(Math.random() * allMissions.length);
      missionsNum.value[i] = selectMission;
      //同じmissionがセットされないようにする
      for (let j = 0; j < i; j++) {
        if (allMissions[missionsNum.value[i]].id === allMissions[missionsNum.value[j]].id) {
          i--;
          missions.value?.pop();
          break;
        }
      }
    }
    updateDoc(doc(gamesRef, idGame.value), { missionsNum: missionsNum.value });
    missions.value = missionsNum.value.map((num) => allMissions[num]);
    console.log(i, "missionにミッションを追加しました");
    log.value = "missionにミッションを追加しました";
    console.log(
      i,
      "missions: ",
      allMissions[missionsNum.value[0]].name,
      allMissions[missionsNum.value[1]].name,
      allMissions[missionsNum.value[2]].name
    );
    updateDoc(doc(gamesRef, idGame.value), { firstAtkPlayer: deleteField() });
  } else {
    console.log(i, "ミッションを監視します");
    const unsubscribe = onSnapshot(doc(gamesRef, idGame.value), (snap) => {
      const updateMissions = snap.data()?.missionsNum as number[] | undefined;
      if (updateMissions?.length === 3) {
        missionsNum.value = updateMissions;
        missions.value = missionsNum.value.map((num) => allMissions[num]);
        console.log(i, "missionsにミッションを追加しました");
        console.log(
          i,
          "missions: ",
          allMissions[missionsNum.value[0]].name,
          allMissions[missionsNum.value[1]].name,
          allMissions[missionsNum.value[2]].name
        );
        //監視を解除する
        unsubscribe();
        console.log(i, "missionsの監視を解除しました");
      }
    });
  }
}
//SumCardsの値を変更する
export function changeSumCardsValue(key: keyof SumCards, value: number): void {
  console.log(i, "changeSumCardsValueを実行しました");
  const { log, sumCards } = storeToRefs(playerStore);

  sumCards.value[key] += value;
  console.log(i, "changeSumCardsValue: ", key, sumCards.value[key]);
}
//Handの値を変更する
export function changeHandValue(key: keyof SumCards | "waste", value: number, attribute?: Attribute): void {
  console.log(i, "changeHandValueを実行しました");
  const { id, player, log } = storeToRefs(playerStore);
  const { hand } = toRefs(player.value);

  hand.value.forEach((card) => {
    if (!attribute) card[key] += value;
    else if (card.attribute === attribute) card[key] += value;
  });

  updateDoc(doc(playersRef, id.value), { hand: hand.value });
}
//Handの腐ったカードを削除する
export function deleteAllRottenCard(): void {
  console.log(i, "reduceWaste0を実行しました");
  const { deleteAllWaste0 } = playerStore;
  const { id, player, log } = storeToRefs(playerStore);
  const { hand } = toRefs(player.value);

  deleteAllWaste0();
  updateDoc(doc(playersRef, id.value), { hand: hand.value });
}
//Statusの値を変更する
export function changeStatusValue(key: keyof Status, value: number): void {
  console.log(i, "changeStatusValueを実行しました");
  const { id, player, log } = storeToRefs(playerStore);
  const { status, character } = toRefs(player.value);

  status.value[key] += value;
  const maxHp = 600 + (allCharacters[character.value].maxHp ?? 0);
  if (key === "hp" && status.value.hp > maxHp) status.value.hp = maxHp;
  if (key === "hungry" && status.value.hungry < 0) status.value.hungry = 0;
  updateDoc(doc(playersRef, id.value), { status: status.value });
  console.log(i, "changeStatusValue: ", key, status.value[key]);
}
