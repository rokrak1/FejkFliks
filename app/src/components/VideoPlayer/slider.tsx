import { motion, useDragControls, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

interface GradientSliderProps {
  value: number;
  setOnMouseUpValue: (e: any) => void;
  loaded?: number;
}

export const GradientHorizontalSlider: React.FC<GradientSliderProps> = ({
  value,
  loaded,
  setOnMouseUpValue,
}) => {
  const screenWidth = window.innerWidth;
  const parentRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const xPos = useMotionValue(0);
  const xPosTrail = useMotionValue(0);
  const xPosLoaded = useMotionValue(0);

  function getXFromValue(value: number) {
    let x = value * parentRef!.current!.offsetWidth;
    return x;
  }

  useEffect(() => {
    xPos.set(getXFromValue(value));
    xPosTrail.set(getXFromValue(value) + 10);
  }, [value]);

  useEffect(() => {
    if (loaded) {
      xPosLoaded.set(getXFromValue(loaded));
    }
  }, [loaded]);

  return (
    <div
      ref={parentRef}
      className="relative flex items-center h-1 w-full bg-gray-500 max-w-full cursor-pointer"
      onClick={(e) => {
        console.log(e);
        setOnMouseUpValue(e.clientX / screenWidth);
      }}
    >
      <motion.div
        ref={handlerRef}
        className="absolute z-20 top-[-6px] h-4 w-4 bg-red-600 cursor-pointer rounded-full"
        style={{ touchAction: "none", x: xPos }}
        drag="x"
        dragMomentum={false}
        dragControls={dragControls}
        onDrag={(e, info) => {
          e.stopPropagation();
          e.preventDefault();
          xPos.set(info.point.x);
          xPosTrail.set(info.point.x + 10);
        }}
        onDragEnd={() => setOnMouseUpValue(xPos.get() / screenWidth)}
        dragElastic={0}
        dragConstraints={parentRef}
      />
      <motion.div
        className="h-1 z-10 bg-gradient-to-r from-red-700 to-red-600"
        style={{ width: xPosTrail }}
      />
      {(loaded && (
        <motion.div
          className="z-0 absolute top-0 h-1 bg-white"
          style={{ width: xPosLoaded }}
        />
      )) ||
        null}
    </div>
  );
};
