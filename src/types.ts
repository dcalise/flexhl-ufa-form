export type Inputs = {
  gm: string;
  team: string;
  players: {
    name: string;
    aav: string | null;
    years: number | null;
  }[];
};
