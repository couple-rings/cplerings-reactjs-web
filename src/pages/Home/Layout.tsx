import ProductCard from "src/components/product/ProductCard";

const Layout = () => {
  return (
    <div>
      {[0, 1, 2].map((item) => {
        return <ProductCard title={`Title ${item}`} key={item} />;
      })}
    </div>
  );
};

export default Layout;
