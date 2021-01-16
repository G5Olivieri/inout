import React from 'react';

import { Routes } from '@app/main/routes/routes';
import { AuthProvider } from '@app/auth/application/auth-provider';

export const App: React.FC = (): JSX.Element => (
  <AuthProvider>
    <Routes />
 </AuthProvider>
)
