type BreadcrumbsType = {
  text: string;
};
const Breadcrumbs = ({ text }: BreadcrumbsType) => {
  return (
    <h2 className="text-black text-[32px] font-roboto-400 font-normal mb-6 lg:mb-10 ">
      {text}
    </h2>
  );
};
export default Breadcrumbs;
