import * as React from "react";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import MenuItem from "@mui/material/MenuItem";
import {
	usePopupState,
	bindHover,
	bindMenu,
} from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";
import { IconButton, SxProps } from "@mui/material";

interface LinkItem {
	name: string;
	href: string;
	onClick?: () => void;
}

interface IconPopupStateProps {
	children: React.ReactNode;
	items: LinkItem[];
	href?: string;
	sx?: SxProps;
}

const IconPopupState = ({ children, items = [], href = "", sx }: IconPopupStateProps) => {
	const navigate = useNavigate();

	const popupState = usePopupState({
		variant: "popover",
		popupId: "demoMenu",
	});
	return (
		<React.Fragment>
			<IconButton
				color="inherit"
				onClick={() => navigate(href)}
				{...bindHover(popupState)}
				sx={{ ...sx }}
			>
				{children}
			</IconButton>
			<HoverMenu {...bindMenu(popupState)}>
				{items.map((item: LinkItem, index: number) => (
					<MenuItem
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
