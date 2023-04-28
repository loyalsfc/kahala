import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AppContainer({styles, icon, note, storeName}) {
    return (
        <div className={styles.appContainer}>
            <FontAwesomeIcon icon={icon} />
            <div>
                <span>{note}</span>
                <h5>{storeName}</h5>
            </div>
        </div>
    )
}

export default AppContainer
