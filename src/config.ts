export const SITE = {
	title: 'DEMB docs',
	description: 'Documentation for using the DEMB server cluster',
	defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true',
		alt:
			'astro logo on a starry expanse of space,' +
			' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};

export const KNOWN_LANGUAGES = {
	English: 'en',
};

// Uncomment this to add an "Edit this page" button to every page of documentation.
export const GITHUB_EDIT_URL = `https://github.com/DEMBresearch/DEMBresearch.github.io/tree/main/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   appId: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
	en: [
		{ text: '', header: true },
		{ text: 'DEMB Servers', header: true },
		{ text: 'Home', link: 'en/introduction' },
		{ text: 'Available resources', link: 'en/resources' },
		{ text: 'Databases', link: 'en/databases' },
		{ text: 'Software', link: 'en/software' },
		{ text: 'Common problems', link: 'en/problems' },
		{ text: 'FAQ', link: 'en/faq' },
	],
};