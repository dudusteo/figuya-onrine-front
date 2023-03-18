import * as React from 'react'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import {
    usePopupState,
    bindHover,
    bindMenu,
} from 'material-ui-popup-state/hooks'

const MenuPopupState = (props) => {
    const { text, items = [] } = props;
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoMenu',
    })
    return (
        <React.Fragment>
            <Button variant="h6" {...bindHover(popupState)}>
                {text}
            </Button>
            <HoverMenu
                {...bindMenu(popupState)}
            >
                {items.map((item, key) =>
                    (<MenuItem onClick={popupState.close} key={key}>{item}</MenuItem>)
                )}

            </HoverMenu>
        </React.Fragment>
    )
}

export default MenuPopupState