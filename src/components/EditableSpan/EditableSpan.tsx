import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    renameTask: (title: string)=> void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')



    const onDoubleClickHandler = () => {
        setEditMode(true)
        setTitle(props.title)

    }
    const activateViewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onBlurActivateTitle = () =>{
        setEditMode(false)
        props.renameTask(title)
    }

    return (
        <span>
        {
            editMode === true
                ? <input autoFocus onChange={activateViewTitle} onBlur={onBlurActivateTitle} value={title}/>
                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
        }
        </span>
    )
}