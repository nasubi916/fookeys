import type { Card } from "@/types";
import { changeHandValue, changeStatusValue, changeSumCardsValue, drawOneCard } from "@/server/useShopUtils";
const allCards: Card[] = [
  {
    id: 0,
    name: "腐ったカード",
    waste: 0,
    hungry: 0,
    company: "none",
    description: "このカードは使用できない。",
    rotten: true,
  },
  {
    id: 1,
    name: "ホットドック",
    waste: 5,
    hungry: 10,
    company: "galdaybee",
    attribute: "atk",
    atk: 25,
  },
  {
    id: 2,
    name: "ドーナツ",
    waste: 5,
    hungry: 20,
    company: "rapidpot",
    attribute: "atk",
    atk: 40,
  },
  {
    id: 3,
    name: "タコス",
    waste: 5,
    hungry: 20,
    company: "galdaybee",
    attribute: "atk",
    atk: 50,
  },
  {
    id: 4,
    name: "ハンバーガー",
    waste: 4,
    hungry: 30,
    company: "galdaybee",
    attribute: "atk",
    atk: 80,
  },
  {
    id: 5,
    name: "ペッパーライス",
    waste: 4,
    hungry: 30,
    company: "galdaybee",
    attribute: "atk",
    description: "このラウンド中、スピード🦶-2で行動する。",
    priority: -2,
    atk: 105,
  },
  {
    id: 6,
    name: "改造マシュマロ",
    waste: 4,
    hungry: 40,
    company: "unlimit",
    attribute: "atk",
    description: "ラウンド終了時にこのカードが手札にあるとき、手札にあるカードの満腹度を🍖-10する。",
    atk: 40,
  },
  {
    id: 7,
    name: "パンケーキ",
    waste: 4,
    hungry: 40,
    company: "rapidpot",
    attribute: "atk",
    description: "このカードは自身の満腹度🍖50ごとに満腹度を🍖-5する。",
    atk: 85,
  },
  {
    id: 8,
    name: "クレープ",
    waste: 4,
    hungry: 40,
    company: "rapidpot",
    attribute: "atk",
    atk: 95,
  },
  {
    id: 9,
    name: "フライドチキン",
    waste: 4,
    hungry: 40,
    company: "galdaybee",
    attribute: "atk",
    atk: 105,
  },
  {
    id: 10,
    name: "改造フライドチキン",
    waste: 4,
    hungry: 40,
    company: "unlimit",
    attribute: "atk",
    description: "このラウンド中、相手のあらゆる効果を無視してマッスルダメージを与える。",
    atk: 105,
  },
  {
    id: 11,
    name: "ピザ",
    waste: 4,
    hungry: 40,
    company: "galdaybee",
    attribute: "atk",
    description: "このラウンド中、スピード🦶-2で行動する。",
    priority: -2,
    atk: 135,
  },
  {
    id: 12,
    name: "悩み中",
    waste: 3,
    hungry: 50,
    company: "galdaybee",
    attribute: "atk",
    atk: 135,
  },
  {
    id: 13,
    name: "ハンバーグ",
    waste: 2,
    hungry: 50,
    company: "galdaybee",
    attribute: "atk",
    atk: 145,
  },
  {
    id: 14,
    name: "ショートケーキ",
    waste: 3,
    hungry: 60,
    company: "rapidpot",
    attribute: "atk",
    atk: 155,
  },
  {
    id: 15,
    name: "ローストターキー",
    waste: 3,
    hungry: 60,
    company: "galdaybee",
    attribute: "atk",
    atk: 160,
  },
  {
    id: 16,
    name: "ステーキ",
    waste: 2,
    hungry: 60,
    company: "galdaybee",
    attribute: "atk",
    atk: 170,
  },
  {
    id: 17,
    name: "生ハム",
    waste: 4,
    hungry: 10,
    company: "bianca",
    attribute: "tech",
    description: "貢献度を🔔+5する。",
    priority: 1,
    tech: 5,
  },
  {
    id: 18,
    name: "マカロン",
    waste: 5,
    hungry: 10,
    company: "rapidpot",
    attribute: "tech",
    tech: 10,
  },
  {
    id: 19,
    name: "アイスティー",
    waste: 5,
    hungry: 10,
    company: "bianca",
    attribute: "tech",
    tech: 15,
  },
  {
    id: 20,
    name: "チーズ",
    waste: 4,
    hungry: 20,
    company: "bianca",
    attribute: "tech",
    description: "貢献度を🔔+5する。",
    priority: 1,
    tech: 15,
  },
  {
    id: 21,
    name: "ミルクティー",
    waste: 5,
    hungry: 20,
    company: "bianca",
    attribute: "tech",
    tech: 30,
  },
  {
    id: 22,
    name: "ティラミス",
    waste: 4,
    hungry: 30,
    company: "rapidpot",
    attribute: "tech",
    tech: 25,
  },
  {
    id: 23,
    name: "フランスパン",
    waste: 4,
    hungry: 30,
    company: "bianca",
    attribute: "tech",
    tech: 50,
  },
  {
    id: 24,
    name: "改造まんぷく寿司",
    waste: 4,
    hungry: 40,
    company: "unlimit",
    attribute: "tech",
    description: "このカードが手札にあるときに❤️HPが0になった場合、❤️+200、🍖-300して復活する。",
    tech: 40,
  },
  {
    id: 25,
    name: "ワッフル",
    waste: 4,
    hungry: 40,
    company: "rapidpot",
    attribute: "tech",
    description: "このカードは自身の満腹度🍖50ごとに満腹度を🍖-5する。",
    tech: 50,
  },
  {
    id: 26,
    name: "改造チーズ",
    waste: 4,
    hungry: 40,
    company: "unlimit",
    attribute: "tech",
    description: "貢献度を🔔+20する。",
    tech: 55,
  },
  {
    id: 27,
    name: "アヒージョ",
    waste: 4,
    hungry: 40,
    company: "bianca",
    attribute: "tech",
    tech: 65,
  },
  {
    id: 28,
    name: "チョコケーキ",
    waste: 3,
    hungry: 50,
    company: "rapidpot",
    attribute: "tech",
    tech: 45,
  },
  {
    id: 29,
    name: "スパゲッティ",
    waste: 3,
    hungry: 50,
    company: "bianca",
    attribute: "tech",
    description: "このカードは相手の満腹度が🍖100以上のとき、テクニックダメージを⚡️+30する。",
    tech: 75,
  },
  {
    id: 30,
    name: "グラタン",
    waste: 3,
    hungry: 50,
    company: "bianca",
    attribute: "tech",
    tech: 85,
  },
  {
    id: 31,
    name: "ドリア",
    waste: 3,
    hungry: 60,
    company: "bianca",
    attribute: "tech",
    description: "このカードは相手の満腹度が🍖100以上のとき、テクニックダメージを⚡️+30する。",
    tech: 90,
  },
  {
    id: 32,
    name: "ローストビーフ",
    waste: 3,
    hungry: 60,
    company: "bianca",
    attribute: "tech",
    tech: 100,
  },
  {
    id: 33,
    name: "かき氷",
    waste: 4,
    hungry: 5,
    company: "norma",
    attribute: "def",
    def: 35,
  },
  {
    id: 34,
    name: "プリン",
    waste: 5,
    hungry: 10,
    company: "rapidpot",
    attribute: "def",
    def: 30,
  },
  {
    id: 35,
    name: "ラムネ",
    waste: 5,
    hungry: 10,
    company: "norma",
    attribute: "def",
    def: 35,
  },
  {
    id: 36,
    name: "りんご飴",
    waste: 4,
    hungry: 15,
    company: "norma",
    attribute: "def",
    def: 70,
  },
  {
    id: 37,
    name: "焼き鳥",
    waste: 5,
    hungry: 20,
    company: "norma",
    attribute: "def",
    def: 70,
  },
  {
    id: 38,
    name: "おにぎり",
    waste: 4,
    hungry: 30,
    company: "norma",
    attribute: "def",
    description: "このラウンド中、スピード🦶+1で行動する。",
    priority: 1,
    def: 80,
  },
  {
    id: 39,
    name: "モンブラン",
    waste: 4,
    hungry: 30,
    company: "rapidpot",
    attribute: "def",
    def: 105,
  },
  {
    id: 40,
    name: "焼きそば",
    waste: 4,
    hungry: 30,
    company: "norma",
    attribute: "def",
    def: 110,
  },
  {
    id: 41,
    name: "焼きおにぎり",
    waste: 4,
    hungry: 40,
    company: "norma",
    attribute: "def",
    description: "このラウンド中、スピード🦶+1で行動する。",
    priority: 1,
    def: 115,
  },
  {
    id: 42,
    name: "シュークリーム",
    waste: 4,
    hungry: 40,
    company: "rapidpot",
    attribute: "def",
    description: "このカードは自身の満腹度🍖50ごとに満腹度を🍖-5する。",
    def: 130,
  },
  {
    id: 43,
    name: "イカ焼き",
    waste: 4,
    hungry: 40,
    company: "norma",
    attribute: "def",
    def: 145,
  },
  {
    id: 44,
    name: "改造おにぎり",
    waste: 4,
    hungry: 40,
    company: "unlimit",
    attribute: "def",
    description: "2ラウンドの間、スピード🦶+100で行動する。",
    def: 145,
  },
  {
    id: 45,
    name: "たこ焼き",
    waste: 3,
    hungry: 50,
    company: "norma",
    attribute: "def",
    description: "このカードは相手より後に行動したとき、満腹度が🍖0になる。",
    def: 75,
  },
  {
    id: 46,
    name: "ロールケーキ",
    waste: 3,
    hungry: 50,
    company: "rapidpot",
    attribute: "def",
    def: 180,
  },
  {
    id: 47,
    name: "お好み焼き",
    waste: 3,
    hungry: 50,
    company: "norma",
    attribute: "def",
    def: 185,
  },
  {
    id: 48,
    name: "メンチカツ",
    waste: 3,
    hungry: 60,
    company: "norma",
    attribute: "def",
    description: "このカードは相手より後に行動したとき、満腹度が🍖0になる。",
    def: 110,
  },
  {
    id: 49,
    name: "ラーメン",
    waste: 3,
    hungry: 60,
    company: "norma",
    attribute: "def",
    def: 220,
  },
  {
    id: 50,
    name: "ジャンボフランクフルト",
    waste: 4,
    hungry: 15,
    company: "galdaybee",
    attribute: "atk",
    description: "このカードは後攻のとき、マッスルダメージを💪+75する。",
  },
  {
    id: 51,
    name: "うどん",
    waste: 5,
    hungry: 15,
    company: "hanamie",
    attribute: "sup",
    description: "このラウンド中、スピードを🦶+2で行動する。",
    priority: 2,
  },
  {
    id: 52,
    name: "おはぎ",
    waste: 4,
    hungry: 20,
    company: "hanamie",
    attribute: "sup",
    description: "次のラウンド開始時、マッスルカードを1枚ドローする。",
  },
  {
    id: 53,
    name: "大福",
    waste: 4,
    hungry: 20,
    company: "hanamie",
    attribute: "sup",
    description: "次のラウンド開始時、テクニックカードを1枚ドローする。",
  },
  {
    id: 54,
    name: "ようかん",
    waste: 4,
    hungry: 20,
    company: "hanamie",
    attribute: "sup",
    description: "次のラウンド開始時、シールドカードを1枚ドローする。",
  },
  {
    id: 55,
    name: "八ツ橋",
    waste: 4,
    hungry: 20,
    company: "hanamie",
    attribute: "sup",
    description: "次のラウンド開始時、サポートカードを1枚ドローする。",
  },
  {
    id: 56,
    name: "たい焼き",
    waste: 4,
    hungry: 25,
    company: "norma",
    attribute: "sup",
    description: "このカードは使用時の自身の満腹度と同じだけシールドを獲得する。",
  },
  {
    id: 57,
    name: "蕎麦",
    waste: 5,
    hungry: 25,
    company: "hanamie",
    attribute: "sup",
    description: "このラウンド中、スピードを🦶+3で行動する。",
    priority: 3,
  },
  {
    id: 58,
    name: "フライドポテト",
    waste: 4,
    hungry: 30,
    company: "galdaybee",
    attribute: "sup",
    description: "手札にあるマッスルカードのマッスルダメージを💪+10する。",
  },
  {
    id: 59,
    name: "焼き芋",
    waste: 4,
    hungry: 30,
    company: "norma",
    attribute: "sup",
    description: "ラウンド終了時、残っているシールドを次のラウンドに持ち越す。",
  },
  {
    id: 60,
    name: "まんぷく寿司・梅",
    waste: 4,
    hungry: 40,
    company: "hanamie",
    attribute: "heal",
    description: "HPを❤️+50回復する。",
    heal: 50,
  },
  {
    id: 61,
    name: "改造エナジードリンク",
    waste: 4,
    hungry: 40,
    company: "unlimit",
    attribute: "sup",
    description: "次のラウンド開始時、初期消費期限を🦠8、満腹度を🍖0で固定したランダムなカードを3枚ドローする。",
  },
  {
    id: 62,
    name: "まんぷく寿司・竹",
    waste: 4,
    hungry: 50,
    company: "hanamie",
    attribute: "heal",
    description: "HPを❤️+100回復する。",
    heal: 100,
  },
  {
    id: 63,
    name: "うな重",
    waste: 5,
    hungry: 50,
    company: "hanamie",
    attribute: "sup",
    description: "このラウンド中､防御を+999する｡",
    def: 999,
  },
  {
    id: 64,
    name: "アップルパイ",
    waste: 4,
    hungry: 55,
    company: "rapidpot",
    attribute: "sup",
    description: "最大満腹度を🍖+20する。",
  },
  {
    id: 65,
    name: "まんぷく寿司・松",
    waste: 4,
    hungry: 60,
    company: "hanamie",
    attribute: "heal",
    description: "HPを❤️+150回復する。",
    heal: 150,
  },
  {
    id: 66,
    name: "プロテイン",
    waste: 5,
    hungry: 75,
    company: "galdaybee",
    attribute: "sup",
    description: "このラウンド中、与えるマッスルダメージを2倍にする。",
  },
];
export default allCards;
