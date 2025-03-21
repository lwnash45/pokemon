import { Card, CardContent, CardProps } from '@mui/material';
import { motion } from 'framer-motion';
import { ReactNode, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

interface AnimatedCardProps {
  children: ReactNode;
  contentPadding?: boolean;
  cardProps?: CardProps;
  initialAnimation?: {
    opacity?: number;
    y?: number;
  };
  hoverAnimation?: {
    y?: number;
    scale?: number;
  };
  transitionDuration?: number;
}

export function AnimatedCard({
  children,
  contentPadding = true,
  cardProps,
  initialAnimation = { opacity: 0, y: 20 },
  hoverAnimation = { y: -5 },
  transitionDuration = 0.5,
}: AnimatedCardProps) {
  const theme = useTheme();

  const cardStyles = useMemo(
    () => ({
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      borderRadius: theme.spacing(2),
      overflow: 'visible',
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(10px)',
      ...(cardProps?.sx || {}),
    }),
    [theme, cardProps?.sx]
  );

  return (
    <motion.div
      initial={initialAnimation}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: transitionDuration }}
    >
      <Card sx={cardStyles} whileHover={hoverAnimation} component={motion.div} {...cardProps}>
        {contentPadding ? <CardContent>{children}</CardContent> : children}
      </Card>
    </motion.div>
  );
}
