# Base Next.js App

This project is a modern Next.js 14 application using the App Router. It is configured with essential dependencies and tools to build a high-performance web application.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [DevDependencies](#devdependencies)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started, clone the repository and install the dependencies using your preferred package manager (e.g., `npm`, `yarn`, `pnpm`). Have in mind that this project was created using `pnpm`.

```bash
git clone https://github.com/your-username/base-next-app.git
cd base-next-app
pnpm install
```

## Scripts

The following scripts are available in the `package.json` file:

- **`dev`**: Starts the development server.
- **`build`**: Builds the application for production.
- **`start`**: Starts the production server.
- **`lint`**: Runs ESLint to check for code quality issues.
- **`test`**: Runs the Jest test suite.
- **`test:watch`**: Runs the Jest test suite in watch mode.

To run a script, use:

```bash
pnpm run <script-name>
```

## Project Structure

The project is organized as follows:

```plaintext
base-next-app/
├── public/               # Public assets (e.g., images, fonts)
├── src/
    ├── __tests__/            # Jest test files
    ├── @types/               # Global types
    ├── app/                  # App Router directory
    │   ├── layout.tsx        # Main layout for the app
    │   ├── page.tsx          # Main page component
    │   └── ...               # Additional pages and components
    ├── components/           # App's components
    │   ├── ui                # Shadcn's components
    │   ├── tools             # Reusable Utilities
    ├── hooks/                # Custom React hooks
    ├── styles/               # Global styles and Tailwind configuration
    ├── providers/            # The apps data providers./
├── .eslintrc.json        # ESLint configuration
├── jest.config.ts        # Jest configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

### Key Directories

- **`app/`**: Contains the App Router components, pages, and API routes.
- **`components/`**: Holds reusable UI components.
- **`hooks/`**: Contains custom React hooks.
- **`lib/`**: Includes utility functions and other libraries.
- **`styles/`**: Holds global styles and TailwindCSS configuration.

## Dependencies

- **`@builder.io/react-hydration-overlay`**: Hydration management for React.
- **`@hookform/resolvers`**: Validation resolvers for React Hook Form.
- **`@radix-ui/*`**: Radix UI components for building accessible UIs.
- **`@tanstack/react-query`**: Data-fetching and state management.
- **`@tanstack/react-table`**: Table component for data grids.
- **`classnames`, `clsx`**: Utility for conditionally joining classNames.
- **`date-fns`**: Date utility library.
- **`jsonwebtoken`**: JSON Web Token implementation.
- **`lucide-react`**: Icon set for React applications.
- **`next`, `react`, `react-dom`**: Core libraries for a Next.js app.
- **`react-hook-form`**: Forms management library for React.
- **`tailwind-merge`**: Utility to merge Tailwind CSS classes.
- **`tailwindcss-animate`**: Animation utilities for Tailwind CSS.
- **`zod`**: Schema validation library.
- **`zustand`**: State management library.

## DevDependencies

- **`@testing-library/*`**: Utilities for testing React components.
- **`@types/*`**: TypeScript type definitions for various libraries.
- **`eslint`, `eslint-config-next`**: ESLint and Next.js specific linting rules.
- **`jest`, `jest-environment-jsdom`**: JavaScript testing framework.
- **`tailwindcss`, `postcss`**: CSS framework and PostCSS for processing styles.
- **`ts-node`, `typescript`**: TypeScript compiler and Node.js support.

## Features

- **App Router**: Utilizes the Next.js 14 App Router for improved routing and layouts.
- **TailwindCSS**: Fully configured TailwindCSS for utility-first styling.
- **Radix UI**: Accessible UI components for building modern interfaces.
- **React Query**: Integrated data-fetching and state management.
- **TypeScript**: Full TypeScript support for type safety and development efficiency.
- **Testing**: Set up with Jest and Testing Library for robust unit and integration testing.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements or fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

This `README.md` provides an overview of the project, including setup instructions, project structure, key dependencies, and additional features relevant to the Next.js 14 app using the App Router.
