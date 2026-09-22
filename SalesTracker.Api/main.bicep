targetScope = 'resourceGroup'

@description('Azure region for the resources.')
param location string = 'centralus'

@description('App Service plan name.')
param appServicePlanName string = 'salestracker-plan'

@description('App Service name. Must be globally unique.')
param appServiceName string = 'salestracker-api-app'

@description('Pricing SKU for the App Service plan.')
param skuName string = 'F1'

@description('Pricing tier for the App Service plan.')
param skuTier string = 'Free'

@description('Azure SQL logical server name. Must be globally unique.')
param sqlServerName string = 'salestracker-sql-${uniqueString(resourceGroup().id)}'

@description('Azure SQL database name.')
param sqlDatabaseName string = 'sales_tracker'

@description('Azure SQL admin login username.')
param sqlAdminLogin string = 'sqladminuser'

@secure()
@description('Azure SQL admin login password.')
param sqlAdminPassword string

@description('Azure SQL database SKU name (for example: Basic, S0, GP_S_Gen5_1).')
param sqlDatabaseSkuName string = 'Basic'

@description('Allow all Azure services to access the SQL server firewall.')
param allowAzureServices bool = true

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

resource sqlServer 'Microsoft.Sql/servers@2023-08-01-preview' = {
  name: sqlServerName
  location: location
  properties: {
	administratorLogin: sqlAdminLogin
	administratorLoginPassword: sqlAdminPassword
	version: '12.0'
	publicNetworkAccess: 'Enabled'
  }
}

resource sqlDatabase 'Microsoft.Sql/servers/databases@2023-08-01-preview' = {
  name: '${sqlServer.name}/${sqlDatabaseName}'
  location: location
  sku: {
	name: sqlDatabaseSkuName
	tier: sqlDatabaseSkuName == 'Basic' ? 'Basic' : 'Standard'
  }
  properties: {
	collation: 'SQL_Latin1_General_CP1_CI_AS'
  }
}

resource allowAzureServicesFirewallRule 'Microsoft.Sql/servers/firewallRules@2023-08-01-preview' = if (allowAzureServices) {
  name: '${sqlServer.name}/AllowAzureServices'
  properties: {
	startIpAddress: '0.0.0.0'
	endIpAddress: '0.0.0.0'
  }
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

resource webAppConnectionStrings 'Microsoft.Web/sites/config@2023-12-01' = {
  name: '${webApp.name}/connectionstrings'
  properties: {
	DefaultConnection: {
	  value: 'Server=tcp:${sqlServer.name}.database.windows.net,1433;Initial Catalog=${sqlDatabaseName};Persist Security Info=False;User ID=${sqlAdminLogin};Password=${sqlAdminPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;'
	  type: 'SQLAzure'
	}
  }
}

output appServicePlanResourceId string = appServicePlan.id
output webAppName string = webApp.name
output webAppDefaultHostName string = webApp.properties.defaultHostName
output sqlServerFullyQualifiedDomainName string = sqlServer.properties.fullyQualifiedDomainName
output sqlDatabaseResourceId string = sqlDatabase.id
