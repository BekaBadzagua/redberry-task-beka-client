import React from 'react';
import classes from '../Modals.module.css'
import CloseIcon from '@material-ui/icons/Close'

const MediumModal = props => {
    let modalClasses = [classes.Modal, classes.MediumModal]
    let buttons = [];
    if (props.save)
        buttons.push(<button key={buttons.length} onClick={props.save}>დამატება</button>)


    return (
        <div className={modalClasses.join(" ")}>
            <header>
                <span onClick={() => props.onClose()}>
                    <CloseIcon />
                </span>
            </header>
            <div>
                {props.children}
            </div>
            <footer>
                {buttons}
            </footer>
        </div>
    );
}


export default MediumModal;