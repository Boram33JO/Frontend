import cafe_01 from "./01_cafe/cafe_01.svg"
import cafe_02 from "./01_cafe/cafe_02.svg"
import cafe_03 from "./01_cafe/cafe_03.svg"
import cafe_04 from "./01_cafe/cafe_04.svg"
import cafe_05 from "./01_cafe/cafe_05.svg"
import cafe_06 from "./01_cafe/cafe_06.svg"
import res_01 from "./02_restaurant/restaurant_01.svg"
import res_02 from "./02_restaurant/restaurant_02.svg"
import res_03 from "./02_restaurant/restaurant_03.svg"
import res_04 from "./02_restaurant/restaurant_04.svg"
import res_05 from "./02_restaurant/restaurant_05.svg"
import trans_01 from "./03_transport/transport_01.svg"
import trans_02 from "./03_transport/transport_02.svg"
import trans_03 from "./03_transport/transport_03.svg"
import trans_04 from "./03_transport/transport_04.svg"
import trans_05 from "./03_transport/transport_05.svg"
import trans_06 from "./03_transport/transport_06.svg"
import school_01 from "./04_school/school_01.svg"
import school_02 from "./04_school/school_02.svg"
import school_03 from "./04_school/school_03.svg"
import school_04 from "./04_school/school_04.svg"
import school_05 from "./04_school/school_05.svg"
import school_06 from "./04_school/school_06.svg"
import exercise_01 from "./05_exercise/exercise_01.svg"
import exercise_02 from "./05_exercise/exercise_02.svg"
import exercise_03 from "./05_exercise/exercise_03.svg"
import exercise_04 from "./05_exercise/exercise_04.svg"
import exercise_05 from "./05_exercise/exercise_05.svg"
import exercise_06 from "./05_exercise/exercise_06.svg"
import park_01 from "./06_park/park_01.svg"
import park_02 from "./06_park/park_02.svg"
import park_03 from "./06_park/park_03.svg"
import park_04 from "./06_park/park_04.svg"
import park_05 from "./06_park/park_05.svg"
import park_06 from "./06_park/park_06.svg"
import liver_01 from "./07_liver/liver_01.svg"
import liver_02 from "./07_liver/liver_02.svg"
import liver_03 from "./07_liver/liver_03.svg"
import liver_04 from "./07_liver/liver_04.svg"
import liver_05 from "./07_liver/liver_05.svg"
import liver_06 from "./07_liver/liver_06.svg"
import sea_01 from "./08_sea/sea_01.svg"
import sea_02 from "./08_sea/sea_02.svg"
import sea_03 from "./08_sea/sea_03.svg"
import sea_04 from "./08_sea/sea_04.svg"
import sea_05 from "./08_sea/sea_05.svg"
import sea_06 from "./08_sea/sea_06.svg"
import library_01 from "./09_library/library_01.svg"
import library_02 from "./09_library/library_02.svg"
import library_03 from "./09_library/library_03.svg"
import library_04 from "./09_library/library_04.svg"
import library_05 from "./09_library/library_05.svg"
import library_06 from "./09_library/library_06.svg"
import culture_01 from "./10_culture/culture_01.svg"
import culture_02 from "./10_culture/culture_02.svg"
import culture_03 from "./10_culture/culture_03.svg"
import culture_04 from "./10_culture/culture_04.svg"
import culture_05 from "./10_culture/culture_05.svg"
import culture_06 from "./10_culture/culture_06.svg"
import leisure_01 from "./11_leisure/leisure_01.svg"
import leisure_02 from "./11_leisure/leisure_02.svg"
import leisure_03 from "./11_leisure/leisure_03.svg"
import leisure_04 from "./11_leisure/leisure_04.svg"
import leisure_05 from "./11_leisure/leisure_05.svg"
import leisure_06 from "./11_leisure/leisure_06.svg"
import etc_01 from "./12_etc/etc_01.svg"
import etc_02 from "./12_etc/etc_02.svg"
import etc_03 from "./12_etc/etc_03.svg"
import etc_04 from "./12_etc/etc_04.svg"
import etc_05 from "./12_etc/etc_05.svg"
import etc_06 from "./12_etc/etc_06.svg"

const cafeImages = [cafe_01, cafe_02, cafe_03, cafe_04, cafe_05, cafe_06];
const restaurantImages = [res_01, res_02, res_03, res_04, res_05];
const transportImages = [trans_01, trans_02, trans_03, trans_04, trans_05, trans_06];
const schoolImages = [school_01, school_02, school_03, school_04, school_05, school_06];
const exerciseImages = [exercise_01, exercise_02, exercise_03, exercise_04, exercise_05, exercise_06];
const parkImages = [park_01, park_02, park_03, park_04, park_05, park_06];
const liverImages = [liver_01, liver_02, liver_03, liver_04, liver_05, liver_06];
const seaImages = [sea_01, sea_02, sea_03, sea_04, sea_05, sea_06];
const libraryImages = [library_01, library_02, library_03, library_04, library_05, library_06];
const cultureImages = [culture_01, culture_02, culture_03, culture_04, culture_05, culture_06];
const leisureImages = [leisure_01, leisure_02, leisure_03, leisure_04, leisure_05, leisure_06];
const etcImages = [etc_01, etc_02, etc_03, etc_04, etc_05, etc_06];

interface CategoryImageMap {
    [key: number]: string[];
}

export const categoryImages: CategoryImageMap = {
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