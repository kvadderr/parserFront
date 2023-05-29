import { CollectionsRepository } from "types/CollectionsRepository.type";
import makeRequest from "../utils/makeRequest";
import { BACKEND_URL } from "../const/basicData"

export type CollectionsRepositoryAPICollectionsRepositoryResponseData =
    CollectionsRepository;

function getCollectionsRepository(
) {
    return makeRequest<
        undefined,
        CollectionsRepositoryAPICollectionsRepositoryResponseData
    >({
        method: "GET",
        url: BACKEND_URL + '/collections',
        config: { authorized: false }
    })
}


const CollectionsAPI = {
    getCollectionsRepository,
};
export default CollectionsAPI;