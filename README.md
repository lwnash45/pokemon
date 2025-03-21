# Pokémon Team Builder

A web application that allows users to browse Pokémon, create teams, and compare team statistics.

## Features

- Browse and search Pokémon by name or type
- View detailed information about each Pokémon including stats, abilities, and moves
- Create and manage Pokémon teams of 6
- Compare teams to analyze strengths and weaknesses
- Visualize team statistics and type matchups

## Technologies Used

- **Frontend**: React, Next.js, TypeScript
- **UI Framework**: Material-UI
- **State Management**: React Hooks
- **Routing**: Next.js App Router
- **Data Visualization**: Plotly.js
- **API Integration**: Axios with PokéAPI (https://pokeapi.co/)
- **Animation**: Framer Motion

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser localhost on port 3000, if you've like to change the port you can add a .env file to the root and delare PORT environment variable:
   ```
   http://localhost:3000
   ```

## Project Structure

- `src/app`: Main application components, pages, and layout
- `src/app/pages`: Page components for different routes
- `src/app/theme`: Theme configuration for Material-UI
- `src/app/shared`: Shared UI components and utilities
- `src/hooks`: Custom React hooks for data fetching and state management
- `src/lib`: Utilities, API clients, and helper functions
- `src/config`: Application configuration
- `src/environment`: Environment-specific configuration

## Testing

The project uses Jest for testing. Run tests with:

```bash
npm test
# or
yarn test
```

## Usage

- **Home Page**: Browse and search for Pokémon
- **Teams Page**: View and manage your created teams
- **Compare Page**: Compare statistics between different teams

## Data Storage Warning

All team data is stored in the browser's sessionStorage, so your teams will not persist between sessions. This is mainly because due to a time constraint I wasn't able to make a proper backend with storage in a more robust solution like a database. This is mostly due to wanting to avoid data integrity issues while developing the app but also I always try to avoid using localStorage unless it's absolutely necessary because managing data inside the client can often become more troublesome than just taking the time to store the data properly.
