import React from 'react';

//export default 
function PopupWithForm(props) {

    const className = `popup popup_type_${props.name} ${props.isOpen && `popup_opened`}`;

    return (
        <div className={className} >
            <div className="popup__container popup__container_type_form">
                <h2 className={`popup__title popup__title_type_${props.forms}`}>{`${props.title}`}</h2>
                <form 
                action="submit" 
                className={`form form_type_${props.name}`} 
                name={`form-${props.name}`}>
                    {props.children}
                    <button type="submit" className={`form__button-save form__button-save_type_${props.name}`}>{props.text}</button>
                </form>
                <button className="popup__button-close" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;