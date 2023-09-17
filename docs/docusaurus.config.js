// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Charles Schwab / TD Ameritrade Streamer',
  tagline: 'TD Ameritrade Streamer Client',
  favicon: 'img/favicon.ico',
  url: 'https://allensarkisyan.github.io',
  // Set the /<baseUrl>/
  baseUrl: '/schwab-td-ameritrade-streamer/',
  organizationName: 'allensarkisyan',
  projectName: 'schwab-td-ameritrade-streamer',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Charles Schwab / TD Ameritrade Streamer',
        // logo: {
        //   alt: 'Charles Schwab / TD Ameritrade Streamer',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'sidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/allensarkisyan/schwab-td-ameritrade-streamer',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'README',
                to: '/',
              },
              {
                label: 'TD Ameritrade Streamer',
                to: '/td-streamer',
              },
            ],
          },
          // {
          //   title: 'Community',
          //   items: [
          //     // {
          //     //   label: 'Stack Overflow',
          //     //   href: 'https://stackoverflow.com/questions/tagged/schwab-td-ameritrade-streamer',
          //     // },
          //     // {
          //     //   label: 'Discord',
          //     //   href: 'https://discordapp.com/invite',
          //     // },
          //     // {
          //     //   label: 'Twitter',
          //     //   href: 'https://twitter.com/allensarkisyan',
          //     // },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Blog',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/allensarkisyan/schwab-td-ameritrade-streamer',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Allen Sarkisyan. XT-TX. All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
