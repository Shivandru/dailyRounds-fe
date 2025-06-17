import { mainConfig } from "./mainConfig";

export const generalFunction = {
  createUrl: (apiString) => {
    const url = `${mainConfig.BASE_URL}${apiString}`;
    return {
      url,
    };
  },
};
