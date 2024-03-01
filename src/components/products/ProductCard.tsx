import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { memo } from "react";

import { Product } from "../../types/Product";
import { checkImageUrl } from "../../utils/checkImageUrl";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const images = product.images.map((image) => {
    const imageUrl = checkImageUrl(image);
    const svgUrl = `data:image/svg+xml;base64,${btoa(`<svg width="50" height="50" viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="50" fill="{theme.palette.background.paper}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M63 134H154C154.515 134 155.017 133.944 155.5 133.839C155.983 133.944 156.485 134 157 134H209C212.866 134 216 130.866 216 127C216 123.134 212.866 120 209 120H203C199.134 120 196 116.866 196 113C196 109.134 199.134 106 203 106H222C225.866 106 229 102.866 229 99C229 95.134 225.866 92 222 92H200C203.866 92 207 88.866 207 85C207 81.134 203.866 78 200 78H136C139.866 78 143 74.866 143 71C143 67.134 139.866 64 136 64H79C75.134 64 72 67.134 72 71C72 74.866 75.134 78 79 78H39C35.134 78 32 81.134 32 85C32 88.866 35.134 92 39 92H64C67.866 92 71 95.134 71 99C71 102.866 67.866 106 64 106H24C20.134 106 17 109.134 17 113C17 116.866 20.134 120 24 120H63C59.134 120 56 123.134 56 127C56 130.866 59.134 134 63 134ZM226 134C229.866 134 233 130.866 233 127C233 123.134 229.866 120 226 120C222.134 120 219 123.134 219 127C219 130.866 222.134 134 226 134Z" fill="#F3F7FF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M86.2784 139.123L82.2083 139.695C80.0207 140.002 77.998 138.478 77.6905 136.291L66.5567 57.0691C66.2492 54.8815 67.7734 52.8588 69.9611 52.5513L148.192 41.5567C150.38 41.2492 152.403 42.7734 152.71 44.961C152.71 44.961 153.422 50.0264 153.667 51.7688" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M88.8051 134.712L85.1093 135.238C83.1228 135.52 81.2887 134.139 81.0127 132.153L71.0175 60.2279C70.7415 58.2417 72.1281 56.4028 74.1146 56.1204L145.152 46.0237C147.139 45.7413 148.973 47.1225 149.249 49.1087L150.108 55.2894C150.154 55.6239 153.223 77.8233 159.313 121.888C159.619 124.1 158.093 126.145 155.906 126.454C155.882 126.457 155.858 126.461 155.835 126.463L88.8051 134.712Z" fill="#E8F0FE"/>
    <path d="M86.2784 139.123L82.2083 139.695C80.0207 140.002 77.998 138.478 77.6905 136.291L66.5567 57.0691C66.2492 54.8815 67.7734 52.8588 69.9611 52.5513L148.192 41.5567C150.38 41.2492 152.403 42.7734 152.71 44.961C152.71 44.961 153.422 50.0264 153.667 51.7688" stroke="#1F64E7" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M154.5 56.3796L155 59.5" stroke="#1F64E7" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M99.8218 60.4883C99.9805 58.9779 101.334 57.8821 102.844 58.0408L181.411 66.2986C182.922 66.4573 184.018 67.8105 183.859 69.321L175.497 148.883C175.338 150.393 173.985 151.489 172.474 151.33L93.907 143.072C92.3965 142.914 91.3007 141.561 91.4595 140.05L99.8218 60.4883Z" fill="white" stroke="#1F64E7" stroke-width="2.5"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M106.693 69.2546C106.866 67.6068 108.342 66.4115 109.99 66.5846L172.645 73.1699C174.293 73.3431 175.488 74.8193 175.315 76.4671L169.775 129.177C169.602 130.825 168.126 132.02 166.478 131.847L103.823 125.261C102.175 125.088 100.98 123.612 101.153 121.964L106.693 69.2546Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M109.741 109.878L119.538 103.27C121.172 102.168 123.365 102.42 124.706 103.864L131.879 111.587C132.237 111.972 132.833 112.014 133.242 111.683L148.581 99.2534C150.429 97.7561 153.167 98.1922 154.459 100.189L164.44 115.627L165.873 118.019L165.187 126.143C165.139 126.704 164.639 127.115 164.08 127.053L107.117 120.724C106.575 120.664 106.182 120.181 106.232 119.639L106.987 111.44L109.741 109.878Z" fill="#E8F0FE"/>
    <path d="M107.936 69.3853C108.037 68.4241 108.898 67.7268 109.86 67.8278L172.514 74.4131C173.476 74.5141 174.173 75.3752 174.072 76.3364L168.532 129.046C168.431 130.007 167.57 130.705 166.609 130.604L103.954 124.018C102.992 123.917 102.295 123.056 102.396 122.095L107.936 69.3853Z" stroke="#1F64E7" stroke-width="2.5"/>
    <circle cx="122.032" cy="85.9494" r="6" transform="rotate(6 122.032 85.9494)" fill="#F3F7FF" stroke="#1F64E7" stroke-width="2.5"/>
    <path d="M107.729 111.425C111.666 108.706 119.538 103.27 119.538 103.27C121.172 102.168 123.365 102.42 124.706 103.864L131.879 111.587C132.237 111.972 132.833 112.014 133.242 111.683L148.581 99.2534C150.298 97.8626 152.817 98.1266 154.207 99.843C154.297 99.9539 154.381 100.07 154.459 100.189C154.459 100.189 163.427 114.42 165.523 117.745" stroke="#1F64E7" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
    `)}`;
    return typeof imageUrl === "string" ? imageUrl : svgUrl;
  });

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
        image={images[0] as string}
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
