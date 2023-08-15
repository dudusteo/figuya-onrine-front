import { Box, CssBaseline } from "@mui/material";
import * as React from "react";

import FigurineService from "../../services/figurineService";
import HomePanel from "../../core/home-panel";

const Home = () => {
	const [items, setItems] = React.useState<Figurine[]>([]);

	React.useEffect(() => {
		FigurineService.getAllFigurines().then((data: Figurine[]) =>
			setItems(data)
		);
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				m: 4,
			}}
		>
			<CssBaseline />
			<HomePanel items={items} />
		</Box>
	);
};

export default Home;
