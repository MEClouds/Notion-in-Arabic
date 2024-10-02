// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

const withNextIntl = require("next-intl/plugin")(
  // Specify a custom path here
  "./i18n.ts"
)
module.exports = withNextIntl({
  // Other Next.js configuration ...
  images: {
    domains: ["files.edgestore.dev"],
  },
})
