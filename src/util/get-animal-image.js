// 강아지 이미지
import dog1 from "../assets/animal/animal_dog1.svg";
import dog2 from "../assets/animal/animal_dog2.svg";
import dog3 from "../assets/animal/animal_dog3.svg";
import dog4 from "../assets/animal/animal_dog4.svg";
import dog5 from "../assets/animal/animal_dog5.svg";
import dog6 from "../assets/animal/animal_dog6.svg";
import dog7 from "../assets/animal/animal_dog7.svg";
import dog8 from "../assets/animal/animal_dog8.svg";
import dog9 from "../assets/animal/animal_dog9.svg";
import dog10 from "../assets/animal/animal_dog10.svg";

// 고양이 이미지
import cat1 from "../assets/animal/animal_cat1.svg";
import cat2 from "../assets/animal/animal_cat2.svg";
import cat3 from "../assets/animal/animal_cat3.svg";
import cat4 from "../assets/animal/animal_cat4.svg";
import cat5 from "../assets/animal/animal_cat5.svg";
import cat6 from "../assets/animal/animal_cat6.svg";
import cat7 from "../assets/animal/animal_cat7.svg";
import cat8 from "../assets/animal/animal_cat8.svg";
import cat9 from "../assets/animal/animal_cat9.svg";
import cat10 from "../assets/animal/animal_cat10.svg";

// 곰 이미지
import bear1 from "../assets/animal/animal_bear1.svg";
import bear2 from "../assets/animal/animal_bear2.svg";
import bear3 from "../assets/animal/animal_bear3.svg";
import bear4 from "../assets/animal/animal_bear4.svg";
import bear5 from "../assets/animal/animal_bear5.svg";
import bear6 from "../assets/animal/animal_bear6.svg";
import bear7 from "../assets/animal/animal_bear7.svg";
import bear8 from "../assets/animal/animal_bear8.svg";
import bear9 from "../assets/animal/animal_bear9.svg";
import bear10 from "../assets/animal/animal_bear10.svg";

// 개구리 이미지
import frog1 from "../assets/animal/animal_frog1.svg";
import frog2 from "../assets/animal/animal_frog2.svg";
import frog3 from "../assets/animal/animal_frog3.svg";
import frog4 from "../assets/animal/animal_frog4.svg";
import frog5 from "../assets/animal/animal_frog5.svg";
import frog6 from "../assets/animal/animal_frog6.svg";
import frog7 from "../assets/animal/animal_frog7.svg";
import frog8 from "../assets/animal/animal_frog8.svg";
import frog9 from "../assets/animal/animal_frog9.svg";
import frog10 from "../assets/animal/animal_frog10.svg";

// 돼지 이미지
import pig1 from "../assets/animal/animal_pig1.svg";
import pig2 from "../assets/animal/animal_pig2.svg";
import pig3 from "../assets/animal/animal_pig3.svg";
import pig4 from "../assets/animal/animal_pig4.svg";
import pig5 from "../assets/animal/animal_pig5.svg";
import pig6 from "../assets/animal/animal_pig6.svg";
import pig7 from "../assets/animal/animal_pig7.svg";
import pig8 from "../assets/animal/animal_pig8.svg";
import pig9 from "../assets/animal/animal_pig9.svg";
import pig10 from "../assets/animal/animal_pig10.svg";

// 토끼 이미지
import rabbit1 from "../assets/animal/animal_rabbit1.svg";
import rabbit2 from "../assets/animal/animal_rabbit2.svg";
import rabbit3 from "../assets/animal/animal_rabbit3.svg";
import rabbit4 from "../assets/animal/animal_rabbit4.svg";
import rabbit5 from "../assets/animal/animal_rabbit5.svg";
import rabbit6 from "../assets/animal/animal_rabbit6.svg";
import rabbit7 from "../assets/animal/animal_rabbit7.svg";
import rabbit8 from "../assets/animal/animal_rabbit8.svg";
import rabbit9 from "../assets/animal/animal_rabbit9.svg";
import rabbit10 from "../assets/animal/animal_rabbit10.svg";

const animalImages = {
  dog1,
  dog2,
  dog3,
  dog4,
  dog5,
  dog6,
  dog7,
  dog8,
  dog9,
  dog10,

  cat1,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  cat7,
  cat8,
  cat9,
  cat10,

  bear1,
  bear2,
  bear3,
  bear4,
  bear5,
  bear6,
  bear7,
  bear8,
  bear9,
  bear10,

  frog1,
  frog2,
  frog3,
  frog4,
  frog5,
  frog6,
  frog7,
  frog8,
  frog9,
  frog10,

  pig1,
  pig2,
  pig3,
  pig4,
  pig5,
  pig6,
  pig7,
  pig8,
  pig9,
  pig10,

  rabbit1,
  rabbit2,
  rabbit3,
  rabbit4,
  rabbit5,
  rabbit6,
  rabbit7,
  rabbit8,
  rabbit9,
  rabbit10,
};

export function getAnimalImage(animalKey, profileColor) {
  const key = `${animalKey}${profileColor}`;
  return animalImages[key] || null;
}
