import { DataFile } from "types/DataFile.type";
import { ConvertFile } from "types/ConvertFile.type";
import makeRequest from "../utils/makeRequest";
const apiUrl = import.meta.env.VITE_BACKEND_URL;
/*
export type DataFileAPICreateDataFileRequestData = File;
export type DataFileAPICreateDataFileResponseData =
    DataFile;

function createDataFile(
    data = DataFileAPICreateDataFileRequestData
) {
    const formData = new FormData();
    formData.append("file", data);

    return makeRequest<
        FormData,
        DataFileAPICreateDataFileResponseData
    >({
        method: "POST",
        uri: apiUrl + '/uploads',
        config: { authorized: false },
        data: formData,
    })
}
*/
export type ConvertFileAPIConvertFileRequestData = ConvertFile;
export type ConvertFileAPIConvertFileResponseData =
    ConvertFile;

function convertDataFile(
    data = ConvertFileAPIConvertFileRequestData
) {
    console.log('apiUrl', apiUrl);
    console.log('apiUrl#2', data);
    const req = {filename: data};
    return makeRequest<
        ConvertFileAPIConvertFileRequestData,
        DataFileAPICreateDataFileResponseData
    >({
        method: "POST",
        url: 'http://' + apiUrl + '/convert',
        config: { authorized: false },
        data: req,
    })
}


const DataFileAPI = {
    convertDataFile,
};
export default DataFileAPI;