import { resolve } from "node:path";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import storyblok from "@storyblok/astro";
import basicSsl from "@vitejs/plugin-basic-ssl";
import robotsTxt from "astro-robots-txt";
import { loadEnv } from "vite";
import { shield } from "@kindspells/astro-shield";

const { STORYBLOK_TOKEN_PREVIEW, STORYBLOK_TOKEN_PUBLISHED, PUBLIC_ENV } =
	loadEnv("", process.cwd(), "");

// Set up development previews using public environment variables
const isPreviewMode = PUBLIC_ENV === "preview" || PUBLIC_ENV === "development";

const rootDir = new URL(".", import.meta.url).pathname;
const modulePath = resolve(rootDir, "src", "generated", "sriHashes.mjs");

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: netlify({ cacheOnDemandPages: true }),
	site: "https://webstarsltd.com",
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
		},
	},
	redirects: {
		"/guides": {
			status: 301,
			destination: "/",
		},
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		svelte(),
		sitemap(),
		storyblok({
			accessToken: isPreviewMode
				? STORYBLOK_TOKEN_PREVIEW
				: STORYBLOK_TOKEN_PUBLISHED,
			bridge: isPreviewMode,
			components: {
				page: "components/storyblok/page",
				"rich-text": "components/storyblok/rich-text",
				grid: "components/storyblok/grid",
				divider: "components/storyblok/divider",
				"image-item": "components/storyblok/image-item",
				"client-images-grid": "components/storyblok/client-images-grid",
				"staff-profile": "components/storyblok/staff-profile",
				"team-member-grid": "components/storyblok/team-member-grid",
				project: "components/storyblok/project",
				insight: "components/storyblok/insight",
				product: "components/storyblok/product",
				guide: "components/storyblok/guide",
				selected_insights: "components/storyblok/selected-insights",
				selected_projects: "components/storyblok/selected-projects",
				call_to_action: "components/storyblok/call-to-action",
				quote: "components/storyblok/quote",
			},
			apiOptions: {
				region: "eu",
			},
		}),
		robotsTxt({
			policy: [
				{
					userAgent: "*",
					disallow: isPreviewMode ? "/" : "",
				},
			],
		}),
		shield({
			sri: {
				hashesModule: modulePath,
				enableMiddleware: true,
			},
			securityHeaders: {
				// This option is required to configure CSP headers for your static
				// content on Netlify.
				enableOnStaticPages: { provider: "netlify" },

				// - If set, it controls how the CSP (Content Security Policy) header
				//   will be generated.
				// - If not set, no CSP header will be configured for your static
				//   content (there is no need to specify its inner options).
				contentSecurityPolicy: {
					// - If set, it controls the "default" CSP directives (they can be
					//   overriden at runtime).
					// - If not set, Astro-Shield will use a minimal set of default
					//   directives.
					cspDirectives: {
						"default-src": "'none'",
					},
				},
			},
		}),
	],
	vite: {
		plugins: [basicSsl()],
		server: {
			https: true,
		},
	},
});
