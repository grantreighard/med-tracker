import React, { useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

export default function ConfirmationModal(props) {
    const [scrollY, setScrollY] = useState(0);
    useScrollPosition(({ currPos }) => {
        setScrollY(currPos.y);
    })

    if (props.isShown) {
        return <div className="confirmation-modal" style={{top: -scrollY}}>
            <p>Do you really want to delete this record?</p>
            <button onClick={props.yesFn} className="warn-button">Yes</button>
            <button onClick={props.noFn}>Cancel</button>
        </div>
    } else {
        return null;
    }
    
}