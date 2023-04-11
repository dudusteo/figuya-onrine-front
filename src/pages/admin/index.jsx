import * as React from "react";

import {
	Box,
	Button,
	CssBaseline,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import AuthService from "../../services/auth.service";
import FreeSoloCreateOption from "../../core/free-solo-create-option";
import FigurineService from "../../services/figurine.service";
import { useTranslation } from "react-i18next";

const top100Films = [
	{ title: "The Shawshank Redemption", year: 1994 },
	{ title: "The Godfather", year: 1972 },
	{ title: "The Godfather: Part II", year: 1974 },
	{ title: "The Dark Knight", year: 2008 },
	{ title: "12 Angry Men", year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: "Pulp Fiction", year: 1994 },
	{
		title: "The Lord of the Rings: The Return of the King",
		year: 2003,
	},
	{ title: "The Good, the Bad and the Ugly", year: 1966 },
	{ title: "Fight Club", year: 1999 },
	{
		title: "The Lord of the Rings: The Fellowship of the Ring",
		year: 2001,
	},
	{
		title: "Star Wars: Episode V - The Empire Strikes Back",
		year: 1980,
	},
	{ title: "Forrest Gump", year: 1994 },
	{ title: "Inception", year: 2010 },
	{
		title: "The Lord of the Rings: The Two Towers",
		year: 2002,
	},
	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ title: "Goodfellas", year: 1990 },
	{ title: "The Matrix", year: 1999 },
	{ title: "Seven Samurai", year: 1954 },
	{
		title: "Star Wars: Episode IV - A New Hope",
		year: 1977,
	},
	{ title: "City of God", year: 2002 },
	{ title: "Se7en", year: 1995 },
	{ title: "The Silence of the Lambs", year: 1991 },
	{ title: "It's a Wonderful Life", year: 1946 },
	{ title: "Life Is Beautiful", year: 1997 },
	{ title: "The Usual Suspects", year: 1995 },
	{ title: "Léon: The Professional", year: 1994 },
	{ title: "Spirited Away", year: 2001 },
	{ title: "Saving Private Ryan", year: 1998 },
	{ title: "Once Upon a Time in the West", year: 1968 },
	{ title: "American History X", year: 1998 },
	{ title: "Interstellar", year: 2014 },
	{ title: "Casablanca", year: 1942 },
	{ title: "City Lights", year: 1931 },
	{ title: "Psycho", year: 1960 },
	{ title: "The Green Mile", year: 1999 },
	{ title: "The Intouchables", year: 2011 },
	{ title: "Modern Times", year: 1936 },
	{ title: "Raiders of the Lost Ark", year: 1981 },
	{ title: "Rear Window", year: 1954 },
	{ title: "The Pianist", year: 2002 },
	{ title: "The Departed", year: 2006 },
	{ title: "Terminator 2: Judgment Day", year: 1991 },
	{ title: "Back to the Future", year: 1985 },
	{ title: "Whiplash", year: 2014 },
	{ title: "Gladiator", year: 2000 },
	{ title: "Memento", year: 2000 },
	{ title: "The Prestige", year: 2006 },
	{ title: "The Lion King", year: 1994 },
	{ title: "Apocalypse Now", year: 1979 },
	{ title: "Alien", year: 1979 },
	{ title: "Sunset Boulevard", year: 1950 },
	{
		title: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
		year: 1964,
	},
	{ title: "The Great Dictator", year: 1940 },
	{ title: "Cinema Paradiso", year: 1988 },
	{ title: "The Lives of Others", year: 2006 },
	{ title: "Grave of the Fireflies", year: 1988 },
	{ title: "Paths of Glory", year: 1957 },
	{ title: "Django Unchained", year: 2012 },
	{ title: "The Shining", year: 1980 },
	{ title: "WALL·E", year: 2008 },
	{ title: "American Beauty", year: 1999 },
	{ title: "The Dark Knight Rises", year: 2012 },
	{ title: "Princess Mononoke", year: 1997 },
	{ title: "Aliens", year: 1986 },
	{ title: "Oldboy", year: 2003 },
	{ title: "Once Upon a Time in America", year: 1984 },
	{ title: "Witness for the Prosecution", year: 1957 },
	{ title: "Das Boot", year: 1981 },
	{ title: "Citizen Kane", year: 1941 },
	{ title: "North by Northwest", year: 1959 },
	{ title: "Vertigo", year: 1958 },
	{
		title: "Star Wars: Episode VI - Return of the Jedi",
		year: 1983,
	},
	{ title: "Reservoir Dogs", year: 1992 },
	{ title: "Braveheart", year: 1995 },
	{ title: "M", year: 1931 },
	{ title: "Requiem for a Dream", year: 2000 },
	{ title: "Amélie", year: 2001 },
	{ title: "A Clockwork Orange", year: 1971 },
	{ title: "Like Stars on Earth", year: 2007 },
	{ title: "Taxi Driver", year: 1976 },
	{ title: "Lawrence of Arabia", year: 1962 },
	{ title: "Double Indemnity", year: 1944 },
	{
		title: "Eternal Sunshine of the Spotless Mind",
		year: 2004,
	},
	{ title: "Amadeus", year: 1984 },
	{ title: "To Kill a Mockingbird", year: 1962 },
	{ title: "Toy Story 3", year: 2010 },
	{ title: "Logan", year: 2017 },
	{ title: "Full Metal Jacket", year: 1987 },
	{ title: "Dangal", year: 2016 },
	{ title: "The Sting", year: 1973 },
	{ title: "2001: A Space Odyssey", year: 1968 },
	{ title: "Singin' in the Rain", year: 1952 },
	{ title: "Toy Story", year: 1995 },
	{ title: "Bicycle Thieves", year: 1948 },
	{ title: "The Kid", year: 1921 },
	{ title: "Inglourious Basterds", year: 2009 },
	{ title: "Snatch", year: 2000 },
	{ title: "3 Idiots", year: 2009 },
	{ title: "Monty Python and the Holy Grail", year: 1975 },
];

const Admin = () => {
	const { t } = useTranslation();

	const [images, setImages] = React.useState([]);
	const [showAdminBoard, setShowAdminBoard] = React.useState(false);

	React.useEffect(() => {
		const user = AuthService.getCurrentUser();

		if (user) {
			setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
		}
		FigurineService.getFiles().then((data) => {
			setImages(data);
		});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		FigurineService.addFigurine(data)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.log(error.response.data.message));
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
			{showAdminBoard && (
				<>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{
							display: "flex",
							flexDirection: "row",
						}}
					>
						<FreeSoloCreateOption
							id="productName"
							options={top100Films}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t("item.productName")}
									name="productName"
								/>
							)}
						/>
						<FreeSoloCreateOption
							id="origin"
							options={top100Films}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t("item.origin")}
									name="origin"
								/>
							)}
						/>
						<FreeSoloCreateOption
							id="company"
							options={top100Films}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t("item.company")}
									name="company"
								/>
							)}
						/>
						<FreeSoloCreateOption
							id="type"
							options={top100Films}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t("item.type")}
									name="type"
								/>
							)}
						/>

						<RadioGroup defaultValue="used" name="condition">
							<FormControlLabel
								value="used"
								control={<Radio />}
								label={t("item.used")}
							/>
							<FormControlLabel
								value="new"
								control={<Radio />}
								label={t("item.new")}
							/>
						</RadioGroup>

						<TextField
							id="price"
							name="price"
							label={t("item.price")}
						/>
						<Button variant="contained" component="label">
							{t("button.upload")}
							<input
								hidden
								accept="image/jpeg"
								multiple
								type="file"
								name="image"
							/>
						</Button>
						<Button variant="contained" type="submit">
							{t("button.add")}
						</Button>
					</Box>
					{images.map((image, index) => (
						<img key={index} alt={image.name} src={image.url}></img>
					))}
				</>
			)}
		</Box>
	);
};

export default Admin;
