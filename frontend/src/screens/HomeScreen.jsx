import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import {
  useGetProductsQuery,
  useGetTopProductsQuery,
} from "../slices/productsApiSlice";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const {
    data,
    isLoading: isProductsLoading,
    error,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const { isLoading: isCarouselLoading } = useGetTopProductsQuery();

  // Show loader if products are loading, or if carousel is loading on home page
  const showLoader = isProductsLoading || (!keyword && isCarouselLoading);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to="/" className="btn btn-light mb-4">
              Go Back
            </Link>
          )}
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={false}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
