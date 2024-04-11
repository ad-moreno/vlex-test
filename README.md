# Web App for Viewing and Selecting Jurisdictions from a Fake API

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Production Mode](#production-mode)
  - [Development Mode](#development-mode)
- [License](#license)

## Overview

This application allows the selection of jurisdictions recursively from a fake API and stores them in a React state.

## Technologies Used

Built with TypeScript, React, and Vite. The styling is achieved through Tailwind CSS, and React Query is used for queries and cache management. Data from the fake API is validated using Zod schemas to ensure the expected data structure.

## Getting Started

### Prerequisites

- Node 20+ should be installed.
- Install dependencies with `npm i`.

### Production Mode

- Build the application with `npm run build`.
- The `dist` directory will contain the static files ready for deployment. These can be tested using, for example, [serve](https://www.npmjs.com/package/serve) by running `npx serve dist`.

### Development Mode

- Start the development server with `npm run dev` for hot reloading and dynamic page behavior.

## License

This project is licensed under the GNU General Public License (GPL). For more information, please refer to the `LICENSE` file in this repository.
