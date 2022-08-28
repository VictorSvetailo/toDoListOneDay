import React, {useState, MouseEvent, ChangeEvent} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')


    const activateEditMode = (e: MouseEvent<HTMLSpanElement>) => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input onChange={onChangeTitleHandler} onBlur={activateViewMode} value={title} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}