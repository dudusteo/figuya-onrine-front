import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ReactImage from "../../core/react-image";
import { Product } from "../../services/productService";

const StyledPaper = styled(Paper)(({ theme }) => ({
	border: `1px solid ${theme.palette.primary.main + "12"}`,
	boxShadow: `0px 2px 1px -1px ${theme.palette.primary.main + "20"}, 0px 1px 1px 0px ${theme.palette.primary.main + "14"}, 0px 1px 3px 0px ${theme.palette.primary.main + "12"}`,
}));

interface ProductCardProps {
	product: Product;
	handleNavigation: (product: Product) => void;
	handleAddItemToCart: (product: Product) => void;
}

const ProductCard = ({ product, handleNavigation, handleAddItemToCart }: ProductCardProps) => {
	const { t } = useTranslation();

	const title = product.attributes.name;
	const priceTitle = product.attributes.display_price;

	return (
		<StyledPaper
			variant="outlined"
			sx={{
				p: 2,
				height: "30rem",
				width: "100%",
			}}
		>
			<Box sx={{
				height: "70%",
				display: "flex",
				justifyContent: "center",
			}}>
				<Box sx={{
					aspectRatio: "14/18",
					height: "100%"
				}}>
					<ReactImage
						sx={{
							width: "100%",
							height: "100%",
							cursor: "pointer",
						}}
						onClick={() => handleNavigation(product)}
						image={product.images[0]}
					/>
				</Box>

			</Box>
			<Box sx={{
				height: "30%",
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "column",
			}}>
				<Box sx={{ py: 1 }}>
					<Typography
						variant="subtitle2"
						sx={{ color: "primary.main", cursor: "pointer" }}
						onClick={() => handleNavigation(product)}
					>
						{title}
					</Typography>
				</Box>

				<Typography
					variant="h6"
					align="right"
					sx={{ color: "primary.main" }}
				>
					{priceTitle}
				</Typography>

				<Button
					variant="contained"
					onClick={(e) => {
						e.stopPropagation();
						handleAddItemToCart(product);
					}}
				>
					{t("add-to-cart")}
				</Button>
			</Box>
		</StyledPaper>
	);
};

const SkeletonProductCard = () => {
	return (
		<StyledPaper
			variant="outlined"
			sx={{
				p: 2,
				height: "30rem",
				width: "100%",
			}}
		>
			<Box sx={{
				height: "70%",
				display: "flex",
				justifyContent: "center",
			}}>
				<Box sx={{
					aspectRatio: "14/18",
					height: "100%",
				}}>
					<Skeleton variant="rectangular" width="100%" height="100%" />
				</Box>
			</Box>
			<Box sx={{
				height: "30%",
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "column",
			}}>
				<Box sx={{ py: 1 }}>
					<Typography
						variant="subtitle2"
						sx={{ color: "primary.main", cursor: "pointer" }}
					>
						<Skeleton variant="text" width="60%" />
					</Typography>
				</Box>
				<Typography
					variant="h6"
					align="right"
					sx={{ color: "primary.main" }}
				>
					<Skeleton variant="text" width="40%" />
				</Typography>

				<Skeleton variant="rectangular" width="100%" height={36} />
			</Box>
		</StyledPaper>
	);
};

export { ProductCard, SkeletonProductCard };