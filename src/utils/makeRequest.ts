import axios, { AxiosError, AxiosResponse, Method, ResponseType } from "axios";
import { APIErrorResponseData } from "types/APIErrorResponseData.type";

const appAxiosInstance = axios.create();

export type MakeRequestConfig = {
    authorized?: boolean;
};

export default function makeRequest<
    RequestData = unknown,
    SuccessResponseData = unknown,
    ErrorResponseData = APIErrorResponseData
>({
    url = "/",
    method = "GET",
    responseType = "json",
    headers = {},
    config = {},
    params = {},
    data,
}: {
    url?: string;
    method?: Method;
    responseType?: ResponseType;
    headers?: { [key: string]: string };
    config?: MakeRequestConfig;
    data: RequestData;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any;
}) {
    if (config.authorized)
        headers = {
            ...headers,
            Authorization: "Basic ",
        };

    return appAxiosInstance<
        SuccessResponseData,
        AxiosResponse<SuccessResponseData, RequestData>,
        RequestData
    >({
        url,
        method,
        params,
        headers,
        responseType,
        data,
    })
        .then((response) => response)
        .catch((error: AxiosError<ErrorResponseData, RequestData>) => {
            if (axios.isAxiosError(error) && error.response)
                return error.response;
            throw error;
        });
}