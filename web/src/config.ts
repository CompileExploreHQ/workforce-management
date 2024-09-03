declare global {
  interface Window {
    _env_: { [key: string]: string | undefined };
  }
}

// eslint-disable-next-line no-underscore-dangle
window._env_ = window._env_ ?? {};

function getEnv(name: string, defaultValue: string) {
  // eslint-disable-next-line no-underscore-dangle
  return window._env_[name] ?? process.env[name] ?? defaultValue;
}

export const API_ENDPOINT = getEnv("REACT_APP_API_URL", "/api");
