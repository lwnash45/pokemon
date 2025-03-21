import React, { memo } from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * Enum for snackbar alert severity levels
 */
export enum SnackbarSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity?: SnackbarSeverity;
  onClose: () => void;
  autoHideDuration?: number;
}

export const SnackbarAlert = memo(function SnackbarAlert({
  open,
  message,
  severity = SnackbarSeverity.SUCCESS,
  onClose,
  autoHideDuration = 4000,
}: SnackbarAlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
});
