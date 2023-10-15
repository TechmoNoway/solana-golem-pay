import { forwardRef } from "react";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

interface IconifyProps {
  icon: string;
  width?: number;
  height: number;
  sx?: object;
  color: string;
}

const Iconify = forwardRef<SVGSVGElement, IconifyProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

Iconify.displayName = "Iconify";

export default Iconify;
