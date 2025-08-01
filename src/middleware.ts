import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
	const response = await next();

	// response.headers.set(
	// 	"Content-Security-Policy",
	// 	"default-src 'self'; img-src *; script-src 'self'; style-src 'self' 'unsafe-inline'",
	// );
	response.headers.set("Content-Security-Policy", "frame-ancestors 'self'");
	response.headers.set("X-Frame-Options", "SAMEORIGIN");
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-XSS-Protection", "1; mode=block");
	response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	response.headers.set(
		"Permissions-Policy",
		"geolocation=(self 'https://www.webstarsltd.com'), microphone=()",
	);
	response.headers.set(
		"Strict-Transport-Security",
		"max-age=63072000; includeSubDomains; preload",
	);

	return response;
};
