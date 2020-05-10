module.exports = {
  siteMetadata: {
    title: 'sigit.cloud',
    author: 'Sigit Priyanggoro',
    work: 'Sr Global Partner Solutions Architect',
    company: 'Amazon Web Services',
    city: 'Dallas',
    description:
      'A paginated starter blog demonstrating what Gatsby can do. Extension of gatsby-starter-blog.',
    siteUrl: 'https://nickymeuleman.github.io/gatsby-paginated-blog/',
    social: {
      linkedin: `sigitpriyanggoro`,
    },
  },
  pathPrefix: '/gatsby-paginated-blog',
  plugins: [
    // {
    //   resolve: `gatsby-plugin-appsync`,
    //   options: {
    //     mandatorySignIn: false, // true | false
    //     oauth: {}, // optional for cognito hosted UI
    //     cookieStorage: {}, // optional if you intend to use cookies. Default is localstorage for aws amplify Auth
    //     clientMetadata: {} // optional for aws amplify Auth
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
