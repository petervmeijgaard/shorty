import unplugin from 'unplugin-icons/webpack';

export const withIcons = (nextConfig = {}) => {
  /** @type {import('next').NextConfig} */
  const additionalConfig = {
    webpack(config) {
      config.plugins.push(
        unplugin({
          compiler: 'jsx',
          jsx: 'react',
        }),
      );

      return config;
    }
  };

  return Object.assign({}, nextConfig, additionalConfig);
};

export default withIcons;
