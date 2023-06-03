import { CollectionsRepository } from "types/CollectionsRepository.type";
import makeRequest from "../utils/makeRequest";
import { BACKEND_URL } from "../const/basicData";

export type CollectionsRepositoryAPICollectionsRepositoryRequestData =
  CollectionsRepository;
export type CollectionsRepositoryAPICollectionsRepositoryResponseData =
  CollectionsRepository;

function getCollectionsRepository() {
  return makeRequest<
    undefined,
    CollectionsRepositoryAPICollectionsRepositoryResponseData
  >({
    method: "GET",
    url: BACKEND_URL + "/collections",
    config: { authorized: false },
  });
}

function createCollectionsRepository(
  data: CollectionsRepositoryAPICollectionsRepositoryRequestData
) {
  return makeRequest<undefined, undefined>({
    method: "POST",
    url: BACKEND_URL + "/collections",
    config: { authorized: false },
    data: data,
  });
}

function updateCollectionsRepository(
  data: CollectionsRepositoryAPICollectionsRepositoryRequestData
) {
  return makeRequest<
    CollectionsRepositoryAPICollectionsRepositoryRequestData,
    undefined
  >({
    method: "PUT",
    url: BACKEND_URL + "/collections",
    config: { authorized: false },
    data: data,
  });
}

function deleteCollectionsRepository(
  data: string
) {
  console.log('delete', data)
  return makeRequest<
    undefined,
    undefined
  >({
    method: "DELETE",
    url: BACKEND_URL + "/collections",
    config: { authorized: false },
    data: data,
  });
}

const CollectionsAPI = {
  getCollectionsRepository,
  createCollectionsRepository,
  updateCollectionsRepository,
  deleteCollectionsRepository
};
export default CollectionsAPI;
