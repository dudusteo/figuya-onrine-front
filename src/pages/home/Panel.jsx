import * as React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(1),
//         width: 'auto',
//     },a
// }));

const Image = styled("img")(({ theme }) => ({
	height: "100%",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translateX(-50%) translateY(-50%)",
}));

const size = {
	base: {
		height: "600px",
		width: "300px",
		clipPath: "polygon(40% 0%, 100% 0%, 60% 100%, 0% 100%);",
	},
	small: {
		height: "284px",
		width: "260px",
		clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);",
	},
};

const Panel = ({ img, small, sx }) => {
	const sizing = small ? size.small : size.base;
	return (
		<Box
			sx={{
				position: "relative",
				height: sizing.height,
				width: sizing.width,
				clipPath: sizing.clipPath,
				...sx,
			}}
		>
			<Image alt="" src={img} />
		</Box>
	);
};

export default Panel;
