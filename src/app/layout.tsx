'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeContextProvider } from './theme/theme-context';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://cdn.worldvectorlogo.com/logos/pokemon-6.svg" />
        <link rel="apple-touch-icon" href="https://cdn.worldvectorlogo.com/logos/pokemon-6.svg" />
        <title>Pokémon Teams</title>
        <meta name="description" content="Pokemon application" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
