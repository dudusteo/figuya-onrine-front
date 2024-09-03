import * as React from "react";

import {
	CssBaseline,
	Box,
	Collapse,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Paper,
	useMediaQuery,
	Theme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import ProductService, { Product } from "../../services/productService";
import ProductCard from "./ProductCard";
import TaxonService from "../../services/taxonService";
import { RelationType, TaxonAttr } from "@spree/storefront-api-v2-sdk/dist/*";


interface Taxon extends TaxonAttr {
	children?: Taxon[];
}

const buildTaxonTree = (taxons: TaxonAttr[]): Taxon[] => {
	const taxonMap: { [key: string]: Taxon } = {};
	const roots: Taxon[] = [];

	// Initialize taxon map
	taxons.forEach((taxon) => {
		taxonMap[taxon.id] = { ...taxon, children: [] };
	});

	// Build the tree
	taxons.forEach((taxon) => {
		if (taxon.attributes.is_root === false) {
			let relationType: RelationType;
			if (Array.isArray(taxon.relationships.parent.data))
				relationType = taxon.relationships.parent.data[0];
			else
				relationType = taxon.relationships.parent.data;
			const parent = taxonMap[relationType.id];
			if (parent) {
				parent.children?.push(taxonMap[taxon.id]);
			}
		} else {
			roots.push(taxonMap[taxon.id]);
		}
	});

	return roots;
};

const Shop = () => {
	const { t } = useTranslation();
	const [products, setProducts] = React.useState<Product[]>([]);
	const [taxonTree, setTaxonTree] = React.useState<Taxon[]>([]);
	const [collapse, setCollapse] = React.useState<number>(0);

	const [filter, setFilter] = React.useState<{ [key: string]: number | string }>({});

	React.useEffect(() => {
		TaxonService.getTaxons().then((response) => {
			const taxons: TaxonAttr[] = response.data;
			const tree = buildTaxonTree(taxons);
			setTaxonTree(tree);
		});
	}, []);



	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);

	const updateCollapse = (collapseIndex: number) => {
		setCollapse((prevCollapse) => {
			return prevCollapse ^ (1 << collapseIndex);
		});
	};

	const onButtonClicked = (taxonNumber: string) => {
		setFilter({ "filter[taxons]": taxonNumber });
	};

	React.useEffect(() => {
		ProductService.getProducts(filter).then((products) => {
			setProducts(products);
		});
	}, [filter]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: isSmallScreen ? "column" : "row",
				minHeight: "100vh",
				m: 2,
			}}
		>
			<CssBaseline />
			<Box sx={{ flexGrow: 1, minWidth: "12rem", maxWidth: "8vw" }}>
				<Paper
					variant="outlined"
					sx={{
						backgroundColor: (theme: Theme) =>
							theme.palette.primary.light + 50,
					}}
				>
					<List
						component="nav"
						aria-label="mailbox folders"
						sx={{ color: "primary.main" }}
					>
						{taxonTree.map((taxonRoot, rootIndex) => (
							<div key={taxonRoot.id}>
								<ListItemButton onClick={() => updateCollapse(rootIndex)}>
									<ListItemText primary={t(`shop.${taxonRoot.attributes.name.toLowerCase()}`)} />
								</ListItemButton>
								<Collapse in={(collapse & (1 << rootIndex)) === 0} timeout="auto">
									<List component="div" disablePadding>
										{taxonRoot.children?.map((taxon, childIndex) => (
											<ListItemButton key={childIndex} sx={{ pl: 4 }} onClick={() => onButtonClicked(taxon.id)}>
												<ListItemText primary={t(`shop.${taxon.attributes.name.toLowerCase()}`)} />
											</ListItemButton>
										))}
									</List>
								</Collapse>
								<Divider />
							</div>
						))}
					</List>
				</Paper>
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				{products && (
					<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 8, lg: 12, xl: 12 }} >
						{products.map((product) => (
							<Grid item key={product.id} xs={4} sm={4} md={4} lg={4} xl={3} >
								<ProductCard product={product} />
							</Grid>
						))}
					</Grid>
				)}
			</Box>
		</Box>
	);
};

export default Shop;
