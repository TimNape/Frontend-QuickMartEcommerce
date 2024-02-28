import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { memo } from "react";

import { Product } from "../../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        margin: "auto",
        position: "relative",
      }}
    >
      <CardMedia
        image={product.images[0]}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          backgroundPosition: "center",
        }}
      />
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "info.main",
              textAlign: "center",
              minHeight: 260,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "info.contrastText",
              }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "info.contrastText",
              }}
            >
              {product.price}$
            </Typography>
          </Box>
          <Link
            to={`/products/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "block",
                textAlign: "center",
                color: "info.contrastText",
              }}
            >
              Detail
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(ProductCard);
