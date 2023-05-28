import { CollectionsRepository } from "types/CollectionsRepository.type";
import makeRequest from "../utils/makeRequest";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export type CollectionsRepositoryAPICollectionsRepositoryResponseData =
    CollectionsRepository;

function getCollectionsRepository(
) {
    return makeRequest<
        undefined,
        CollectionsRepositoryAPICollectionsRepositoryResponseData
    >({
        method: "GET",
        url: 'http://' + apiUrl + '/collections',
        config: { authorized: false }
    })
}


const CollectionsAPI = {
    getCollectionsRepository,
};
export default CollectionsAPI;