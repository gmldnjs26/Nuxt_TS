import { NuxtAxiosInstance } from '@nuxtjs/axios';

// eslint-disable-next-line
let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
	axiosInstance.setBaseURL('http://localhost:3087');
	$axios = axiosInstance;
}

export { $axios };
