import MenuCard from "./public/MenuCard";

import { type MenuCardProps } from "./public/MenuCard";

export default function RecipeCard(props: Partial<MenuCardProps>) {
  return <MenuCard {...props} />;
}
