import React, { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "../../assets/icons/icons";
import { AnimatePresence, motion } from "framer-motion";

const DraggableScrollContainer: React.FC<{
  children: React.ReactNode;
  enableControls?: boolean;
}> = ({ children, enableControls }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const itemRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startDragging = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const pageX = e.type.includes("mouse")
      ? (e as React.MouseEvent).pageX
      : (e as React.TouchEvent).touches[0].pageX;
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const stopDragging = () => {
    if (!isDragging || !containerRef.current) return;
    setIsDragging(false);

    // Update the current index based on scroll position
    const currentScroll = containerRef.current.scrollLeft;
    const closestIndex = itemRefs.current.reduce((closest, elem, index) => {
      const box = elem.getBoundingClientRect();
      const offset =
        box.left +
        containerRef.current.scrollLeft -
        containerRef.current.offsetLeft;
      if (
        Math.abs(offset - currentScroll) <
        Math.abs(
          offset -
            (itemRefs.current[closest]?.getBoundingClientRect().left +
              containerRef.current.scrollLeft -
              containerRef.current.offsetLeft) || 0
        )
      ) {
        return index;
      }
      return closest;
    }, 0);
    setCurrentIndex(closestIndex);
  };

  const onDrag = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !containerRef.current) return;
    setIsDragging(true);
    const pageX = e.type.includes("mouse")
      ? (e as React.MouseEvent).pageX
      : (e as React.TouchEvent).touches[0].pageX;
    const x = pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollToItem = (index) => {
    if (!containerRef.current || !itemRefs.current[index]) return;

    const target = itemRefs.current[index];
    const scrollX = target.offsetLeft - containerRef.current.offsetLeft - 20;

    containerRef.current.scrollTo({
      left: scrollX,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const handleClickRight = () => {
    if (currentIndex < itemRefs.current.length - 1) {
      scrollToItem(currentIndex + 1);
    }
  };

  const handleClickLeft = () => {
    if (currentIndex > 0) {
      scrollToItem(currentIndex - 1);
    }
  };

  const arrowsNecessary = () => {
    if (!containerRef.current) return false;
    return containerRef.current.scrollWidth > containerRef.current.clientWidth;
  };

  // Create ref for each child
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(
      0,
      React.Children.count(children)
    );
  }, [children]);

  return (
    <div
      className="w-full h-max relative"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        ref={containerRef}
        onMouseDown={startDragging as React.MouseEventHandler<HTMLDivElement>}
        onMouseUp={stopDragging as React.MouseEventHandler<HTMLDivElement>}
        onMouseLeave={stopDragging as React.MouseEventHandler<HTMLDivElement>}
        onMouseMove={onDrag as React.MouseEventHandler<HTMLDivElement>}
        onTouchStart={startDragging as React.TouchEventHandler<HTMLDivElement>}
        onTouchEnd={stopDragging as React.TouchEventHandler<HTMLDivElement>}
        onTouchMove={onDrag as React.TouchEventHandler<HTMLDivElement>}
        className="flex gap-5 mt-5 overflow-x-auto  w-full cursor-pointer px-5 relative"
      >
        {React.Children.map(children, (child, index) => (
          <div ref={(el) => (itemRefs.current[index] = el)}>{child}</div>
        ))}
      </motion.div>
      <AnimatePresence>
        {enableControls && isHovering && arrowsNecessary() && (
          <>
            <SlideControl direction="left" onClick={handleClickLeft} />
            <SlideControl direction="right" onClick={handleClickRight} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const SlideControl: React.FC<{
  direction: "left" | "right";
  onClick: () => void;
}> = ({ direction, onClick }) => {
  return (
    <motion.div
      className="absolute top-0 h-full z-20 flex items-center cursor-pointer"
      style={{
        [direction]: 0,
      }}
      whileHover={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(4px)",
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        exit={{ opacity: 0 }}
      >
        <ArrowIcon size={50} color="#fff" direction={direction} />
      </motion.span>
    </motion.div>
  );
};

export default DraggableScrollContainer;
