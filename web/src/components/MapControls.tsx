import React, { useState } from "react";
import { Box, useColorMode, Button, Radio, RadioGroup } from "@chakra-ui/core";

// mapbox://styles/mapbox/streets-v11
// mapbox://styles/mapbox/satellite-streets-v11

interface MapControlsProps {
  defaultColor: string;
  mapMode: string;
  handleSetMapMode: any;
}

const MapControls: React.FC<MapControlsProps> = ({
  defaultColor,
  mapMode,
  handleSetMapMode,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };
  const color = { light: "black", dark: "white" };

  return (
    <Box
      style={{
        position: "absolute",
        zIndex: 10,
        top: 60,
        right: 5,
      }}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      p={1}
    >
      <Box p={1}>Map Style</Box>
      <Box p={1}>
        <RadioGroup onChange={handleSetMapMode} value={mapMode}>
          <Radio value="monochrome">Monochrome</Radio>
          <Radio value="streets">Streets</Radio>
          <Radio value="satellite">Satellite</Radio>
        </RadioGroup>
      </Box>
      <Box p={1}>
        <Button variantColor={defaultColor}>Zoom Out</Button>
      </Box>
    </Box>
  );
};

export default MapControls;
