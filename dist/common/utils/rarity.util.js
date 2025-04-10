"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rarity = void 0;
exports.getRandomRarity = getRandomRarity;
var Rarity;
(function (Rarity) {
    Rarity["COMMON"] = "COMMON";
    Rarity["RARE"] = "RARE";
    Rarity["SUPER_RARE"] = "SUPER_RARE";
    Rarity["LEGENDARY"] = "LEGENDARY";
    Rarity["MYTHICAL"] = "MYTHICAL";
})(Rarity || (exports.Rarity = Rarity = {}));
function getRandomRarity() {
    const random = Math.random() * 100;
    if (random < 1)
        return Rarity.MYTHICAL;
    if (random < 8)
        return Rarity.LEGENDARY;
    if (random < 20)
        return Rarity.SUPER_RARE;
    if (random < 40)
        return Rarity.RARE;
    return Rarity.COMMON;
}
//# sourceMappingURL=rarity.util.js.map