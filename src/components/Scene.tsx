import { useEffect, useRef } from "react";
import { Cube } from "./three/cube";
import { debounce } from "../utils/debounce";

function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const cubeInstance = Cube(canvas);

    const debouncedResize = debounce(() => {
      if (cubeInstance && cubeInstance.onWindowResize) {
        cubeInstance.onWindowResize();
      }
    }, 100);

    const onResize = () => {
      debouncedResize();
    };

    window.addEventListener("resize", onResize);

    container.addEventListener("mouseenter", () => {
      if (cubeInstance && cubeInstance.enableControls) {
        cubeInstance.enableControls();
      }
    });

    container.addEventListener("mouseleave", () => {
      if (cubeInstance && cubeInstance.disableControls) {
        cubeInstance.disableControls();
      }
    });

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default Scene;
