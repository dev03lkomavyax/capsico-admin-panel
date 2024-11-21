import React from 'react';

const LineWithDots = ({ data,width }) => {
    // const width = 400;
    const height = 50;
    const lineLength = width - 40; // 20px padding on each side

    // Calculate positions based on the data length
    const step = lineLength / (data.length - 1);

    return (
        <svg width={width} height={height}>
            <polyline
                fill="none"
                stroke="#1AA6F1"
                strokeWidth="2"
                points={data.map((item, index) => {
                    const x = 20 + index * step;
                    const y = height / 2 - item; // Adjust y position based on the data
                    return `${x},${y}`;
                }).join(' ')}
            />
            {data.map((item, index) => {
                const x = 20 + index * step;
                const y = height / 2 - item;
                return (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#1AA6F1"
                    />
                );
            })}
        </svg>
    );
};

export default LineWithDots;