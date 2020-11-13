import React from 'react';

export default function ConfirmationModal(props) {
    if (props.isShown) {
        return <div className="confirmation-modal">
            <p>Do you really want to delete this record?</p>
            <button onClick={props.yesFn} className="warn-button">Yes</button>
            <button onClick={props.noFn}>Cancel</button>
        </div>
    } else {
        return null;
    }
    
}