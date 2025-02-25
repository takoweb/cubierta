import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";

export interface MenuCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export default function MenuCard({
  image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  name = "Sample Dish",
  description = "A delicious sample dish",
  price = "1,500",
  category = "メイン",
}: Partial<MenuCardProps>) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
      <Modal>
        <ModalTrigger asChild>
          <div className="cursor-pointer">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={image}
                alt={name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-2">
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {category}
                </span>
                <span className="bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                  {price.includes("円") ? price : `${price}円`}
                </span>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalContent className="w-full max-w-3xl h-[90vh] p-0">
          <div className="flex flex-col h-full">
            <div className="h-[40vh] relative flex-shrink-0">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-2">
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {category}
                </span>
                <span className="bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                  {price.includes("円") ? price : `${price}円`}
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2
                    className="text-3xl font-bold whitespace-pre-line"
                    style={{ color: "var(--primary-color)" }}
                  >
                    {name}
                  </h2>
                </div>
                <div className="prose max-w-none">
                  <p
                    className="leading-relaxed whitespace-pre-line"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <div className="p-4">
        <h3
          className="font-semibold text-lg mb-1 whitespace-pre-line"
          style={{ color: "var(--primary-color)" }}
        >
          {name}
        </h3>
        <p
          className="text-sm line-clamp-2"
          style={{ color: "var(--secondary-color)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
