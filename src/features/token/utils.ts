export function getCookie(key: string) {
	function escape(s: string) {
		return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
	}
	const match = document.cookie.match(
		RegExp("(?:^|;\\s*)" + escape(key) + "=([^;]*)")
	);
	return match ? match[1] : null;
}
