type Goods = {
  title: string;
  price: number | string;
  num: number;
  isChecked: boolean;
  isDel: boolean;
};
type Shop = {
  name: string;
  goods: Goods[];
  isChecked: boolean;
  isDel: boolean;
};
