# NxMonorepoStartup

## Start the project

### Prerequisites
- Docker & 
- Docker Compose

### Run the Application

1. **Build and start the Docker containers**:
    ```sh
    docker-compose up --build
    ```

2. **Access the application**:
    - Backend: `http://localhost:3000`
    - MailHog: `http://localhost:8025`

3. **Stop the Docker containers**:
    ```sh
    docker-compose down
    ```
   
### Environment Variables

Ensure you have a `.env` file in the root directory with the following variables:

```dotenv
NODE_ENV=development
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_pass
APP_EMAIL=your_app_email
APP_USERNAME=your_app_username
MAIL_TRANSPORT_HOST=localhost
MAIL_TRANSPORT_PORT=1025
GOOGLE_APP_PASSWORD=your_google_app_password
GOOGLE_MAIL=your_google_mail
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
PASSWORD_STRENGTH_SCORE=your_password_strength_score
TOKEN_EXPIRATION_TIME_IN_HOURS=your_token_expiration_time_in_hours
RESET_PASSWORD_MAX_ATTEMPTS=your_reset_password_max_attempts
RESET_PASSWORD_RESET_INTERVAL_IN_SECOND=your_reset_password_reset_interval_in_seconds
SALT_ROUNDS=your_salt_rounds
REFRESH_TOKEN_SALT_ROUNDS=your_refresh_token_salt_rounds


## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve front-end
```

To create a production bundle:

```sh
npx nx build front-end
```

To see all available targets to run for a project, run:

```sh
npx nx show project front-end
```
        
These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

---

## Generate New Code for Angular
You can use Nx to generate new components, services, and other code structures. Here are some common commands:

### Generate a New Component

To generate a new Angular component, use:

```sh
npx nx g @nx/angular:component my-component --directory=apps/front-end/src/app/components
```
Generate a New Service
```sh
npx nx g @nx/angular:service my-service --project=front-end
```
Generate a New Library
```sh
npx nx g @nx/angular:lib my-lib --directory=libs
```
Generate a New Module
```sh
npx nx g @nx/angular:module my-module --directory=apps/front-end/src/app/modules
```

List of Available Generators
```sh
npx nx list @nx/angular
```
To see the capabilities of a specific plugin, use:
```sh
npx nx list <plugin-name>
```

---

## Generate New Code for NestJS

You can use Nx to generate new modules, services, controllers, and other code structures for NestJS. Here are some common commands:

### Generate a New Module

Generate Module

```sh
npx nx g @nx/nest:module my-module --directory=apps/back-end/src/app
```
Generate Service
```sh
npx nx g @nx/nest:service my-service --directory=apps/back-end/src/app
```
Generate Controller
```sh
npx nx g @nx/nest:controller my-controller --directory=apps/back-end/src/app
```
List of Available Generators
```sh
npx nx list @nx/nest
```
To see the capabilities of a specific plugin, use:
```sh
npx nx list <plugin-name>
```

---

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


## Database Setup
```markdown
# Project Setup

## Prisma ORM Integration

### 1. Install Prisma CLI and Client
Add Prisma as a dependency in your project by running the following commands:
```sh
npm install @prisma/client
npm install prisma --save-dev
```

### 2. Initialize Prisma
Initialize Prisma in your project. This will create a `prisma` directory with a `schema.prisma` file.
```sh
npx prisma init
```

### 3. Configure the Prisma Schema
Edit the `prisma/schema.prisma` file to define your data model. Here is an example:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            Int      @id @default(autoincrement())
  name          String
  email         String   @unique
  password      String
  username      String   @unique
  role          Role     @default(user)
  startHour     String
  shiftDuration Int
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum Role {
  admin
  user
}
```

### 4. Set Up the Database Connection
Add your database connection URL to the `.env` file created by Prisma. For example:
```env
DATABASE_URL="postgresql://filip:Welcome123@localhost:5432/nx-monorepo-startup?schema=public"
```

### 5. Run Prisma Migrate
Use Prisma Migrate to create the database schema based on your Prisma schema.
```sh
npx prisma migrate dev --name init
```
This command will:
1. Create the necessary tables and columns in your database.
2. Generate the Prisma Client to interact with your database.

### 6. Generate Prisma Client
Generate the Prisma Client to interact with your database.
```sh
npx prisma generate
```

### 7. Use Prisma Client in Your Code
Import and use the Prisma Client in your application. Here is an example in a NestJS service:
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
```

### Database Seeding

This project includes a database seeding capability to populate your database with initial data, including a predefined admin user. This is particularly useful for development and testing purposes.

#### Seed Script

The seed script is located at `prisma/seed.ts`. It creates a default admin user with the following credentials:

- Email: admin@example.com
- Password: admin123
- Username: admin
- Role: admin

You can modify this script to add more default users or change the admin user's details as needed.

#### Running the Seed

To run the seed script manually:
This will run all the seed functions

```
npx prisma db seed
```

```
npm run seed:admin
```

```
npm run seed:user
```

```
npm run seed:machines-users
```
## Docker Setup

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. **Build and start the Docker containers**:
    ```sh
    docker-compose up --build
    ```

2. **Access the application**:
    - Backend: `http://localhost:3000`
    - MailHog: `http://localhost:8025`

3. **Stop the Docker containers**:
    ```sh
    docker-compose down
    ```

### Environment Variables

Ensure you have a `.env` file in the root directory with the following variables:

```dotenv
NODE_ENV=development
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_pass
APP_EMAIL=your_app_email
APP_USERNAME=your_app_username
MAIL_TRANSPORT_HOST=localhost
MAIL_TRANSPORT_PORT=1025
GOOGLE_APP_PASSWORD=your_google_app_password
GOOGLE_MAIL=your_google_mail
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
PASSWORD_STRENGTH_SCORE=your_password_strength_score
TOKEN_EXPIRATION_TIME_IN_HOURS=your_token_expiration_time_in_hours
RESET_PASSWORD_MAX_ATTEMPTS=your_reset_password_max_attempts
RESET_PASSWORD_RESET_INTERVAL_IN_SECOND=your_reset_password_reset_interval_in_seconds
SALT_ROUNDS=your_salt_rounds
REFRESH_TOKEN_SALT_ROUNDS=your_refresh_token_salt_rounds
