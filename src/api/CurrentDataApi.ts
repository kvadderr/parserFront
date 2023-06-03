import makeRequest from "../utils/makeRequest";
import { BACKEND_URL } from "../const/basicData";

function getCurrentData() {
  return makeRequest<
    undefined,
    undefined
  >({
    method: "GET",
    url: BACKEND_URL + "/currentData",
    config: { authorized: false },
  });
}

function createCurrentData(
    data: []
  ) {
    return makeRequest<undefined, undefined>({
      method: "POST",
      url: BACKEND_URL + "/currentData",
      config: { authorized: false },
      data: data,
    });
  }

  const CurrentDataApi = {
    createCurrentData,
    getCurrentData
  };
  export default CurrentDataApi;
  