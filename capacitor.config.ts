import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.notion.lite',
  appName: 'Notion Lite',
  webDir: 'dist',
  plugins: {
    CapacitorSQLite: {
      electronWindowsLocation: 'C:\\sqlite\\databases',
      androidIsEncryption: false,
      iosIsEncryption: false,
    },
  },
};

export default config;