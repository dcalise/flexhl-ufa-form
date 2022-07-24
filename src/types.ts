export type Inputs = {
  gm: string;
  team: string;
  players: {
    name: string;
    url?: string;
    aav: string | null;
    years: string | null;
  }[];
};
