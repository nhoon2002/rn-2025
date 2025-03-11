import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  if (process.env.MY_ENVIRONMENT === 'production') {
    /* your production config */
    return {
      ...config,
      name: 'rn-2025',
      slug: 'rn-2025',
    };
  } else {
    /* your development config */
    return {
      ...config,
      name: 'rn-2025',
      slug: 'rn-2025',
    };
  }
};
