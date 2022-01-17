export default function ({ store, redirect }) {
	console.log('authenticate');
	if (!store.state.users.me) {
		return redirect('/');
	}
}
