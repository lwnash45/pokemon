import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import { useMemo, memo } from 'react';
import { Theme } from '@mui/material/styles';

interface HoverIconButtonProps {
  icon: React.ReactNode;
  tooltipTitle: string;
  onClick: (e: React.MouseEvent) => void;
  position: {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };
  isVisible: boolean;
}

export const HoverIconButton = memo(function HoverIconButton({
  icon,
  tooltipTitle,
  onClick,
  position,
  isVisible,
}: HoverIconButtonProps) {
  const buttonStyles = useMemo(
    () => ({
      position: 'absolute',
      ...position,
      zIndex: 2,
      '&:hover': {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
      },
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      pointerEvents: isVisible ? 'auto' : 'none',
      borderRadius: '8px',
    }),
    [position, isVisible]
  );

  return (
    <Tooltip title={tooltipTitle} placement="top">
      <IconButton size="small" onClick={onClick} sx={buttonStyles}>
        {icon}
      </IconButton>
    </Tooltip>
  );
});
