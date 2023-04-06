import * as React from "react";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
	usePopupState,
	bindHover,
	bindMenu,
} from "material-ui-popup-state/hooks";
import { Link } from "react-router-dom";

const ItemLink = styled(Link)(({ theme }) => ({
	color: "inherit",
	textDecoration: "inherit",
}));

const MenuPopupState = (props) => {
	const { text, items = [], href = "" } = props;
	const popupState = usePopupState({
		variant: "popover",
		popupId: "demoMenu",
	});
	return (
		<React.Fragment>
			<Button variant="h6" href={href} {...bindHover(popupState)}>
				{text}
			</Button>
			<HoverMenu {...bindMenu(popupState)}>
				{items.map((item, key) => (
					<ItemLink to={href + "/item"}>
						<MenuItem
							onClick={() => {
								popupState.close();
							}}
							key={key}
						>
							{item.name}
						</MenuItem>
					</ItemLink>
				))}
			</HoverMenu>
		</React.Fragment>
	);
};

export default MenuPopupState;
