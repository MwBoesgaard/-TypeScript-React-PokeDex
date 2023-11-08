export type Pokemon = {
  id: number;
  name: string;
  height: number; // decimeters (increments of 100 cm)
  weight: number; // hectograms (increments of 100 g)
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  species: {
    url: string;
  };
};
