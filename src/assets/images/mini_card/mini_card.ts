import cafe_01 from "./01_cafe/mini_cafe_01.svg"
import cafe_02 from "./01_cafe/mini_cafe_02.svg"
import cafe_03 from "./01_cafe/mini_cafe_03.svg"
import cafe_04 from "./01_cafe/mini_cafe_04.svg"
import res_01 from "./02_restaurant/mini_restaurant_01.svg"
import res_02 from "./02_restaurant/mini_restaurant_02.svg"
import res_03 from "./02_restaurant/mini_restaurant_03.svg"
import res_04 from "./02_restaurant/mini_restaurant_04.svg"
import trans_01 from "./03_transport/mini_transport_01.svg"
import trans_02 from "./03_transport/mini_transport_02.svg"
import trans_03 from "./03_transport/mini_transport_03.svg"
import trans_04 from "./03_transport/mini_transport_04.svg"
import school_01 from "./04_school/mini_school_01.svg"
import school_02 from "./04_school/mini_school_02.svg"
import school_03 from "./04_school/mini_school_03.svg"
import school_04 from "./04_school/mini_school_04.svg"
import exercise_01 from "./05_exercise/mini_exercise_01.svg"
import exercise_02 from "./05_exercise/mini_exercise_02.svg"
import exercise_03 from "./05_exercise/mini_exercise_03.svg"
import exercise_04 from "./05_exercise/mini_exercise_04.svg"
import park_01 from "./06_park/mini_park_01.svg"
import park_02 from "./06_park/mini_park_02.svg"
import park_03 from "./06_park/mini_park_03.svg"
import park_04 from "./06_park/mini_park_04.svg"
import liver_01 from "./07_liver/mini_liver_01.svg"
import liver_02 from "./07_liver/mini_liver_02.svg"
import liver_03 from "./07_liver/mini_liver_03.svg"
import liver_04 from "./07_liver/mini_liver_04.svg"
import sea_01 from "./08_sea/mini_sea_01.svg"
import sea_02 from "./08_sea/mini_sea_02.svg"
import sea_03 from "./08_sea/mini_sea_03.svg"
import sea_04 from "./08_sea/mini_sea_04.svg"
import library_01 from "./09_library/mini_library_01.svg"
import library_02 from "./09_library/mini_library_02.svg"
import library_03 from "./09_library/mini_library_03.svg"
import library_04 from "./09_library/mini_library_04.svg"
import culture_01 from "./10_culture/mini_culture_01.svg"
import culture_02 from "./10_culture/mini_culture_02.svg"
import culture_03 from "./10_culture/mini_culture_03.svg"
import culture_04 from "./10_culture/mini_culture_04.svg"
import leisure_01 from "./11_leisure/mini_leisure_01.svg"
import leisure_02 from "./11_leisure/mini_leisure_02.svg"
import leisure_03 from "./11_leisure/mini_leisure_03.svg"
import leisure_04 from "./11_leisure/mini_leisure_04.svg"
import etc_01 from "./12_etc/mini_etc_01.svg"
import etc_02 from "./12_etc/mini_etc_02.svg"
import etc_03 from "./12_etc/mini_etc_03.svg"
import etc_04 from "./12_etc/mini_etc_04.svg"

const cafeImages = [cafe_01, cafe_02, cafe_03, cafe_04];
const restaurantImages = [res_01, res_02, res_03, res_04];
const transportImages = [trans_01, trans_02, trans_03, trans_04];
const schoolImages = [school_01, school_02, school_03, school_04];
const exerciseImages = [exercise_01, exercise_02, exercise_03, exercise_04];
const parkImages = [park_01, park_02, park_03, park_04];
const liverImages = [liver_01, liver_02, liver_03, liver_04];
const seaImages = [sea_01, sea_02, sea_03, sea_04];
const libraryImages = [library_01, library_02, library_03, library_04];
const cultureImages = [culture_01, culture_02, culture_03, culture_04];
const leisureImages = [leisure_01, leisure_02, leisure_03, leisure_04];
const etcImages = [etc_01, etc_02, etc_03, etc_04];

interface CategoryImageMap {
    [key: number]: string[];
}

export const miniCategoryImages: CategoryImageMap = {
    1: cafeImages,
    2: restaurantImages,
    3: transportImages,
    4: schoolImages,
    5: exerciseImages,
    6: parkImages,
    7: liverImages,
    8: seaImages,
    9: libraryImages,
    10: cultureImages,
    11: leisureImages,
    12: etcImages
};