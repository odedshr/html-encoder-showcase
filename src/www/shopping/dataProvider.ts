
export type ProductData = {
  id: string;
  name: string;
  image: string;
  cost: number;
  inStock: boolean;
};
export type Results = { count: number, items: ProductData[] }

const items: ProductData[] = [
  {
    id: "5f0ad42fd57dcd5562ea1887",
    name: "Oreo cheesecake",
    image: "./images/oreo_cheesecake.png",
    cost: 25,
    inStock: true,
  },
  {
    id: "5f0ad42f79cd26ad2c7c6ead",
    name: "Raspberry shortcake",
    image: "./images/raspberry_shortcake.png",
    cost: 30,
    inStock: true,
  },
  {
    id: "5f0ad42f40d1155866b3becd",
    name: "Blood orange tart",
    image: "./images/blood_orange_tart.png",
    cost: 26,
    inStock: true,
  },
  {
    id: "5f0ad42feb950792d6f51654",
    name: "Choc chip whoopie pies (6 pcs)",
    image: "./images/choc_chip_whoopie_pies.png",
    cost: 18,
    inStock: true
  },
  {
    id: "5f0ad42f360f064ef9d2e488",
    name: "Peanut butter cups pies (12 pcs)",
    image: "./images/peanut_butter_cups_pies.png",
    cost: 12,
    inStock: false
  },
  {
    id: "5f0ad42fcedb7efdbb323991",
    name: "Sea salt brownies (12 pcs)",
    image: "./images/sea_salt_brownies.png",
    cost: 20,
    inStock: true
  }
]

const data = {
  "count": 12,
  items
};

export async function get(): Promise<Results> {
  return new Promise(resolve => resolve(data));
}