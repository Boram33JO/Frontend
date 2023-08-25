import cafe_1 from "./cafe_1.svg"
import cafe_2 from "./cafe_2.svg"
import cafe_3 from "./cafe_3.svg"
import res_1 from "./res_1.svg"
import res_2 from "./res_2.svg"
import res_3 from "./res_3.svg"
import park_1 from "./park_1.svg"
import park_2 from "./park_2.svg"
import park_3 from "./park_3.svg"
import park_4 from "./park_4.svg"
import lib_1 from "./lib_1.svg"
import lib_2 from "./lib_2.svg"
import lib_3 from "./lib_3.svg"
import lib_4 from "./lib_4.svg"
import sea_1 from "./sea_1.svg"
import sea_2 from "./sea_2.svg"
import sea_3 from "./sea_3.svg"
import sea_4 from "./sea_4.svg"

const cafeImages = [cafe_1, cafe_2, cafe_3];
const restaurantImages = [res_1, res_2, res_3];
const parkImages = [park_1, park_2, park_3, park_4];
const libImages = [lib_1, lib_2, lib_3, lib_4];
const seaImages = [sea_1, sea_2, sea_3, sea_4];

interface CategoryImageMap {
    [key: number]: string[];
}

export const categoryImages: CategoryImageMap = {
    1: cafeImages,
    2: restaurantImages,
    6: parkImages,
    8: seaImages,
    9: libImages,
};