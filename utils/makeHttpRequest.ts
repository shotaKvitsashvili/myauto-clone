import axios, { AxiosRequestConfig, Method } from 'axios';
// import { baseUrl } from '@/constants/endpoints';

// const BASE_URL = baseUrl;

const makeHttpRequest = async <T>(
    method: Method,
    url: string,
    data?: any,
    token?: string,
): Promise<T> => {
    const config: AxiosRequestConfig = {
        method,
        url,
        data,
        headers: {
            'Accept-Language': 'ka'
        }
    };

    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    try {
        const response = await axios(config);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(error.response.data.message || 'Request failed');
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error setting up the request');
        }
    }
};

export default makeHttpRequest;
