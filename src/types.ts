export type Inputs = {
  gm: string;
  team: string;
  players: {
    name: string;
    aav: string | null;
    years: string | null;
  }[];
};
