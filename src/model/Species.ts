export type Species = {
  id: number;
  flavor_text_entries: [
    {
      flavor_text: string;
      language: {
        name: string;
      };
    }
  ];
};
