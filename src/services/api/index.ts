import axios from "axios";

export const request = axios.create({
	baseURL: process.env.REACT_APP_URL
});

function generateInterceptor(request: any) {
	request.interceptors.request.use(
		function (config: any) {
			config.headers["API-KEY"] = "secret-api-key";
			config.headers["Accept-Encoding"] = "gzip,defiate,br";
			config.headers["Connection"] = "keep-alive";
			return config;
		},
		(error: any) => Promise.reject(error)
	);
	request.interceptors.response.use(
		(config: any) => config,
		(error: any) => {
			if (error?.response?.status === 401) {

			}

			return Promise.reject(error);
		}
	);
}

generateInterceptor(request);
