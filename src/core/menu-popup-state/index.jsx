import * as React from "react";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
	usePopupState,
	bindHover,
	bindMenu,
} from "material-ui-popup-state/hooks";
import { Link } from "@mui/material";

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
