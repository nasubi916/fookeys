type Card = {
  id: number;
  name: string;
  waste: number;
  hungry: number;
  company: string;
  attribute?: string;
  description?: string;
  priority?: number;
  atk?: number;
  def?: number;
  tech?: number;
  heal?: number;
  rotten?: boolean; //腐ってるかのフラグ
  // special?: () => void;
};

type Character = {
  id: number;
  name: string;
  description1?: string;
  description2?: string;
  description3?: string;
  company: string;
  maxHungry?: number;
  maxHp?: number;
  initialContribution?: number;
  passive?: () => void;
};

type Timing = "before" | "after";
type Gift = {
  id: number;
  name: string;
  description: string;
  requireContribution: number;
  skill: (timing: Timing, id: string) => void;
};

type Mission = {
  id: number;
  name: string;
  achieved: boolean;
  description: string;
  reward: number;
  goalAchievement: number;
  nowAchievement: number;
  checker?: (sumFields?: SumCards, field?: Card[], hand?: Card[], donate?: boolean) => number | undefined;
};
//!使われてるか調べる
type Phase = "shop" | "battle" | "result" | "none";
type MatchStatus = "matching" | "nothing" | "waiting" | "battle";
type PlayerSign = 0 | 1;
type Status = { hp: number; hungry: number; contribution: number };
type SumCards = { num: number; waste: number; hungry: number; priority: number; atk: number; def: number; tech: number; heal: number };
type PlayerData = {
  idEnemy: string;
  idGame: string;
  name: string;
  check: boolean;
  donate: boolean;
  match: MatchStatus;
  character: number;
  gifts: number[];
  isSelectedGift: number | undefined;
  hand: Card[];
  field: Card[];
  status: Status;
  sumFields: SumCards;
};

type GameData = {
  turn: number;
  players: string[];
  missionsNum: number[];
  firstAtkPlayer: PlayerSign | undefined;
};

export type { Card, Character, Gift, Mission, Phase, MatchStatus, PlayerSign, Status, PlayerData, SumCards, GameData };
