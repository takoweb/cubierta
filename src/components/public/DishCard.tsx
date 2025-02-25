import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";

interface DishCardProps {
  image: string;
  name: string;
  description: string;
  ingredients: string;
}

export default function DishCard({
  image,
  name,
  description,
  ingredients,
}: DishCardProps) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <div className="cursor-pointer group">
          <div className="aspect-square relative bg-gray-100 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-2">
            <h3 className="font-medium text-sm text-center truncate">{name}</h3>
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
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6">{name}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">説明</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">材料</h3>
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {ingredients}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
