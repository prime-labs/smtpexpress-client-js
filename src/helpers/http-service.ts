import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  HttpClientConstructorParams,
  HttpClientParams,
  HttpClientResolverDTO,
  HttpClientResolverError,
} from "./types";

export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(params: HttpClientConstructorParams) {
    this.axiosInstance = axios.create({
      ...params,
      baseURL: "https://api.smtpexpress.com",
    });
  }

  async resolver<T>(fn: Promise<AxiosResponse>): HttpClientResolverDTO<T> {
    let data: T | null = null;
    let error: null | HttpClientResolverError = null;

    try {
      const { data: apiResponse } = await fn;
      data = apiResponse;
    } catch (_error) {
      error = _error.response?.data || {
        message: _error.message,
        statusCode: 400,
      };
    }
    return { data, error };
  }

  async SendRequest<DAO, DTO = Record<any, any>, DQO = Record<any, any>>(
    params: HttpClientParams<DTO, DQO>
  ) {
    return this.resolver<DAO>(
      this.axiosInstance[params.method](
        params.path,
        params.body ? params.body : { params: params.query || {} },
        params.body && params.query ? { params: params.query } : {}
      )
    );
  }
}
