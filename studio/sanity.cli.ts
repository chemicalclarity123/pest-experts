import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'vc8zkv1m',
    dataset: 'production'
  },
  deployment: {
    // App ID to prevent prompting for hostname on every deploy
    appId: 'egoyxpcunsk7pxcxe96m2cme',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
