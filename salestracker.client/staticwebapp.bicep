targetScope = 'resourceGroup'

@description('Azure region for the Static Web App resource.')
param location string = resourceGroup().location

@description('Static Web App name. Must be globally unique.')
param staticWebAppName string = 'salestracker-client-app'

@description('SKU name for Static Web App.')
param skuName string = 'Free'

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: staticWebAppName
  location: location
  sku: {
	name: skuName
	tier: skuName
  }
  properties: {}
}

output staticWebAppName string = staticWebApp.name
output staticWebAppDefaultHostName string = staticWebApp.properties.defaultHostname
