import { HttpResponse, http } from "msw";

const ipLookupResponse = {
  success: true,
  data: {
    capital: "moon",
    country: "universe",
    countryCode: "000",
    flag: {
      flag_Icon: "Un",
    },
  },
};

export const apiHandlers = [
  http.get(import.meta.env.VITE_IP_LOOKUP, () => {
    return HttpResponse.json(ipLookupResponse);
  }),
];
