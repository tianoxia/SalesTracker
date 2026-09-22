# Sales Tracker

A sales tracking application to help track commission and determine each salesperson’s quarterly bonus.

## Get Started

1. Install:

   ```bash
   npm install
   ```

2. Run:

   ```bash
   npm run dev
   ```

3. Open:

   `http://localhost:5173`

## Solution Structure

```plaintext
SalesTracker.sln
├── SalesTracker.Api/                  # ASP.NET Core Web API (.NET 9)
│   ├── Controllers/
│   ├── Program.cs
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   ├── main.bicep                     # API infra (App Service plan + Web App)
│   └── azure-pipelines.yml            # API CI/CD pipeline
├── SalesTracker.Core/                 # Domain models, interfaces, contracts
├── SalesTracker.Infrastructure/       # EF Core, repositories, data access
├── salestracker.client/               # React + Vite client app
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── main.tsx
│   ├── staticwebapp.bicep             # Static Web App infra
│   ├── azure-pipelines.client.yml     # Client CI/CD pipeline
│   └── vite.config.ts
└── README.md
```

## Client Structure (salestracker.client/src)

```plaintext
src/
├── assets/            # Static assets (images, fonts)
├── components/        # Reusable components
├── hooks/             # Custom React hooks
├── layouts/           # Layout components
├── pages/             # Page components
├── routes/            # Application routes
├── api/               # API services
├── stores/            # State management
├── styles/            # Global styles
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── vite-env.d.ts      # Vite type declarations
```

## Configuration

### Vite Config

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 5173,
    open: true
  }
})
```

### TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "preserve",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Environment Variables

Create a `.env` file in the client root directory:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My Vite App
```

Access variables in your code:

```ts
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

### API Configuration

- API project path: `SalesTracker.Api`
- Main startup file: `SalesTracker.Api/Program.cs`
- Local settings file: `SalesTracker.Api/appsettings.Development.json`

Current behavior:

- The API uses EF Core SQL Server in `Program.cs` via `UseSqlServer(...)`.
- Development uses LocalDB through `ConnectionStrings:DefaultConnection`.

Example connection string (development):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=sales_tracker;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### EF Core Migrations (SQL Server)

From solution root (`SalesTracker`), run:

```bash
dotnet ef migrations add InitialCreate \
  --project .\SalesTracker.Infrastructure\SalesTracker.Infrastructure.csproj \
  --startup-project .\SalesTracker.Api\SalesTracker.Api.csproj \
  --context SalesTracker.Infrastructure.Data.SalesDbContext \
  --output-dir Migrations
```

This creates migration files and updates `SalesDbContextModelSnapshot` under:

- `SalesTracker.Infrastructure/Migrations`

Apply migrations to LocalDB:

```bash
dotnet ef database update \
  --project .\SalesTracker.Infrastructure\SalesTracker.Infrastructure.csproj \
  --startup-project .\SalesTracker.Api\SalesTracker.Api.csproj
```

## Azure DevOps Pipelines

This solution uses two YAML pipelines.

### 1) API Pipeline

- YAML path: `SalesTracker.Api/azure-pipelines.yml`
- Runs on pool: `SelfHosted-Test`
- Main responsibilities:
  - Deploy API infrastructure from `SalesTracker.Api/main.bicep`
  - Restore/build/test .NET projects
  - Publish and deploy `SalesTracker.Api` to App Service (`salestracker-api-app`)

### 2) Client Pipeline

- YAML path: `salestracker.client/azure-pipelines.client.yml`
- Runs on pool: `SelfHosted-Test`
- Main responsibilities:
  - Deploy Static Web App infrastructure from `salestracker.client/staticwebapp.bicep`
  - Build React client
  - Deploy static content to Azure Static Web Apps

### Required Pipeline Variables

- `STATIC_WEB_APP_API_TOKEN` (Secret): deployment token from the target Static Web App (`salestracker-client-app`)

### Notes

- Client pipeline is path-filtered to `salestracker.client/**`.
- API pipeline is path-filtered to backend folders.
- For production client builds, ensure `VITE_API_URL` points to the deployed API endpoint (for example: `https://salestracker-api-app.azurewebsites.net/api`).

## Testing

```bash
npm run test
# or
yarn test
```

## Linting

```bash
npm run lint
# or
yarn lint
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.
