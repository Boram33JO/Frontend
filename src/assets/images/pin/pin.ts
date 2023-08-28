import cafe from "./01_cafe.svg";
import restaurant from "./02_restaurant.svg";
import transport from "./03_transport.svg";
import school from "./04_school.svg";
import exercise from "./05_exercise.svg";
import park from "./06_park.svg";
import liver from "./07_liver.svg";
import sea from "./08_sea.svg";
import library from "./09_library.svg";
import culture from "./10_culture.svg";
import leisure from "./11_leisure.svg";
import etc from "./12_etc.svg";

interface CategoryPinMap {
    [key: number]: string;
}

export const CategoryPinImages: CategoryPinMap = {
    1: cafe,
    2: restaurant,
    3: transport,
    4: school,
    5: exercise,
    6: park,
    7: liver,
    8: sea,
    9: library,
    10: culture,
    11: leisure,
    12: etc,
};
