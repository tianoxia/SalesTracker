targetScope = 'resourceGroup'

@description('Azure region for the resources.')
param location string = resourceGroup().location

@description('App Service plan name.')
param appServicePlanName string = 'salestracker-plan'

@description('App Service name. Must be globally unique.')
param appServiceName string = 'salestracker-api-app'

@description('Pricing SKU for the App Service plan.')
param skuName string = 'F1'

@description('Pricing tier for the App Service plan.')
param skuTier string = 'Free'

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: appServicePlanName
  location: location
  sku: {
	name: skuName
	tier: skuTier
	capacity: 1
  }
  properties: {}
}

resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: appServiceName
  location: location
  kind: 'app'
  properties: {
	serverFarmId: appServicePlan.id
	httpsOnly: true
	siteConfig: {
	  minTlsVersion: '1.2'
	  ftpsState: 'Disabled'
	}
  }
}

output appServicePlanResourceId string = appServicePlan.id
output webAppName string = webApp.name
output webAppDefaultHostName string = webApp.properties.defaultHostName