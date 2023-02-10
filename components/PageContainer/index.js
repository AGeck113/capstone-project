import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
// copied from https://github.com/TomDoesTech/perfect-background-image-tutorial
const Box = styled.section`
  position: fixed;
  z-index: -1;
  top: 0;
  max-width: 600px;
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function BGImage() {
  const [width, setWidth] = useState();
  const [height, setheight] = useState();

  useEffect(() => {
    const { width, height } = getWindowDimensions();

    setWidth(width);

    setheight(height);
  }, []);

  useEffect(() => {
    function handleResize() {
      const { width, height } = getWindowDimensions();

      setWidth(width);

      setheight(height);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width && height) {
    return (
      <Box>
        <Image
          src="/backgroundImage.jpg"
          width={width > 600 ? "600" : width}
          height={height}
          alt="background image of a road"
        />
      </Box>
    );
  }

  return null;
}

export default BGImage;
