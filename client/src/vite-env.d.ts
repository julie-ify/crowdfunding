/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEMPLATE_CLIENT_ID: string;
  readonly VITE_CHAIN_ID: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
