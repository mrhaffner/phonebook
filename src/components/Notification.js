import React from 'react'

const Notification = ({message, messageClass}) => {
    if (message === null) {
        return null
    }

    return (
        <div className={messageClass ? 'added' : 'deleted'}>
            {message}
        </div>
    )
}

export default Notification