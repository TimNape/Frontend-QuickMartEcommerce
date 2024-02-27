import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import ProductList from "./ProductList";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { fetchAllCategories } from "../../redux/slices/categorySlice";
import {
  fetchAllProducts,
  searchProductByName,
  sortProductsByPrice,
} from "../../redux/slices/productSlice";
import { Category } from "../../types/Category";
import CategorySelection from "./CategorySelection";
import SortingFilter from "./SortingFilter";
import { useAppSelector } from "../../hooks/useAppSelector";
import SearchForm from "./SearchForm";

const Products = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector<Category[]>(
    (state) => state.categories.categories
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortPrice, setSortPrice] = useState<"asc" | "desc">("asc");
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 12 }
  );
  const [userInput, setUserInput] = useState("");
  const products = useAppSelector((state) => state.products.products);

  //Handle search product by name
  const handleSearch = (value: string) => {
    dispatch(searchProductByName(value.toLowerCase()));
  };

  const handleClear = () => {
    setUserInput("");
    //Fetch all products again to display them
    dispatch(fetchAllProducts());
  };

  //Handle sort products by price
  const handleSortPriceChange = useCallback(
    (event: SelectChangeEvent) => {
      const newSortPrice = event.target.value as "asc" | "desc";
      setSortPrice(newSortPrice);
      dispatch(sortProductsByPrice(newSortPrice));
    },
    [dispatch, setSortPrice]
  );

  //Handle sort products by category
  const handleCategoryChange = useCallback(
    (event: SelectChangeEvent) => {
      setSelectedCategory(event.target.value);
    },
    [setSelectedCategory]
  );

  //Handle pagination
  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setPagination({ ...pagination, page });
    },
    [pagination, setPagination]
  );

  //Fetch allCategories of
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Products Page
      </Typography>
      <Grid container spacing={2} flexDirection={"column"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            p: 2,
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CategorySelection
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={handleCategoryChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SearchForm
              userInput={userInput}
              setUserInput={setUserInput}
              onSearch={handleSearch}
              onClear={handleClear}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SortingFilter
              sortPrice={sortPrice}
              onChange={handleSortPriceChange}
            />
          </Grid>
        </Box>
        <ProductList
          products={products}
          selectedCategory={selectedCategory}
          pagination={pagination}
        />
        <Box
          sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2, p: 2 }}
        >
          <Pagination
            variant="outlined"
            count={10}
            page={pagination.page}
            onChange={handlePaginationChange}
          />
        </Box>
      </Grid>
    </Container>
  );
};

export default Products;