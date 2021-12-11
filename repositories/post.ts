import { $axios } from '~/utils/api';

export default class PostRepository {
	axiosInstance = $axios.create({
		timeout: 1000,
	});

	async getPosts(): Promise<any> {
		const result = await this.axiosInstance.get('/posts?lastId=1&limit=10');
		return result.data;
	}
}
