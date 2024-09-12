import * as React from "react";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
	usePopupState,
	bindHover,
	bindMenu,
} from "material-ui-popup-state/hooks";
import { Link, SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LinkItem {
	name: string;
	href?: string;
}

interface IconPopupStateProps {
	text: string;
	items: LinkItem[];
	href?: string;
	sx?: SxProps;
}
const MenuPopupState = ({
	text,
	items = [],
	href,
	sx,
}: IconPopupStateProps) => {
	const popupState = usePopupState({
		variant: "popover",
		popupId: "demoMenu",
	});

	const navigate = useNavigate();

	return (
		<React.Fragment>
			<Button
				color="inherit"
				onClick={href ? () => navigate(href) : undefined}
				{...bindHover(popupState)}
				sx={{ ...sx }}
			>
				{text}
			</Button>
			<HoverMenu {...bindMenu(popupState)}>
				{items.map((item, index) => (
					<Link underline="hover" key={index} href={href + "/item"}>
						<MenuItem
							onClick={() => {
								popupState.close();
							}}
						>
							{item.name}
						</MenuItem>
					</Link>
				))}
			</HoverMenu>
		</React.Fragment>
	);
};

export default MenuPopupState;
