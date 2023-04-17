import * as React from "react";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import MenuItem from "@mui/material/MenuItem";
import {
	usePopupState,
	bindHover,
	bindMenu,
} from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

const IconPopupState = (props) => {
	const { children, items = [], ...rest } = props;
	const navigate = useNavigate();

	const popupState = usePopupState({
		variant: "popover",
		popupId: "demoMenu",
	});
	return (
		<React.Fragment>
			<IconButton color="inherit" {...bindHover(popupState)} {...rest}>
				{children}
			</IconButton>
			<HoverMenu {...bindMenu(popupState)}>
				{items.map((item, index) => (
					<MenuItem
						href={item.href}
						onClick={() => {
							item.onClick && item.onClick();
							item.href && navigate(item.href);
							popupState.close();
						}}
						key={index}
					>
						{item.name}
					</MenuItem>
				))}
			</HoverMenu>
		</React.Fragment>
	);
};

export default IconPopupState;
