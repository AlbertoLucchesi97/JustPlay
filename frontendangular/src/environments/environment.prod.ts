import { default as authInfo } from '../../auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain: authInfo.domain,
    clientId: authInfo.clientId,
    redirect_uri: window.location.origin + '/signin-callback',
    scope: authInfo.scope,
    audience: authInfo.audience,
  },
  dev: {
    serverUrl: authInfo.serverUrl,
  },
};
