var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const items = [
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
];
const data = {
    "count": 12,
    items
};
export function get() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => resolve(data));
    });
}
//# sourceMappingURL=dataProvider.js.map