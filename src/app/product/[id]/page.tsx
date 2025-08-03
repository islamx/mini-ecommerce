type Props = {
  params: { id: string };
};

function ProductDetailsPage({ params }: Props) {
  return <h1 className="text-xl">Product Details for ID: {params.id}</h1>;
}

export default ProductDetailsPage;
