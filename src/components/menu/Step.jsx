import React from 'react'

const Step = ({ imgSrc, imgAlt, heading, description }) => (
    <div className="flex gap-3 items-center">
        <img className="w-16" src={imgSrc} alt={imgAlt} />
        <div>
            <h4 className="class-base4 twelve-color">{heading}</h4>
            <p>{description}</p>
        </div>
    </div>
);


export default Step