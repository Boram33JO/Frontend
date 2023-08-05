import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';

interface ScrollableComponentProps {
    children: React.ReactNode;
}

const ScrollableComponent: React.FC<ScrollableComponentProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX - (containerRef.current?.offsetLeft || 0));
        setScrollLeft(containerRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const x = e.clientX - (containerRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 3;
        containerRef.current!.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <ScrollContainer
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </ScrollContainer>
    );
};

export default ScrollableComponent;

const ScrollContainer = styled.div`
    overflow: hidden;
    white-space: nowrap;
`