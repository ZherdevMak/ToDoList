import React, {ChangeEvent} from 'react';
type CheckBoxType = {
    callBack: (isDone:boolean) => void
    isDone: boolean
}
const CheckBox = (props:CheckBoxType) => {
    const changeIsDoneHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input type='checkbox' checked={props.isDone} onChange={changeIsDoneHandler}/>
    );
};

export default CheckBox;