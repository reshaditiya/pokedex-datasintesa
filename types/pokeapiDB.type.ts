type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type PokemonGameIndex = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

type PokemonVersionDetail = {
  rarity: number;
  version: {
    name: string;
    url: string;
  };
};

type PokemonHeldItem = {
  item: {
    name: string;
    url: string;
  };
  version_details: PokemonVersionDetail[];
};

type PokemonMove = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
};

type PokemonSpecies = {
  name: string;
  url: string;
};

type PokemonSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  versions: {
    generation_i: {
      red_blue: {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
      yellow: {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
    };
    // Add other generation versions here
  };
};

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonData = {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: PokemonGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_types: any[]; // Replace with actual type if available
  species: PokemonSpecies;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
};

export type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};
