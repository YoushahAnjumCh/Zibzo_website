import CategoryCard from "../../../molecules/homepage/category_card/CategoryCard";
import TitleHeading from "../../../atoms/title_headings/TitleHeading";

type Category = {
  id: number;
  image: string;
  title: string;
};

type CategoryProps = {
  categories: Category[];
};

export default function Category({ categories }: CategoryProps) {
  return (
    <>
      {/* Category Title */}
      <TitleHeading
        title="Categories"
        level={2}
        divClassName="flex  justify-start px-4  py-2"
        hClassName="md:text-2xl text-xs font-serif"
      />
      <div className="flex text-center justify-center">
        <div className="flex px-4 md:py-5 py-2 overflow-x-auto no-scrollbar overflow-y-auto  space-x-4 snap-x snap-mandatory scroll-smooth whitespace-nowrap">
          {/* Category Card */}
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              categoryImage={category.image}
              categoryTitle={category.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}
