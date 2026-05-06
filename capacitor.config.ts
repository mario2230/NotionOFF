import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'NotionOFF',
  webDir: 'dist',
  plugins: {
    capacitorSQLite: {
      eletronWindowsLocation: 'C:\\sqlite\\databases',
      androidIsEncryption: false,
      iosIsEncryption: false,
    },
  },
};

export default config;
