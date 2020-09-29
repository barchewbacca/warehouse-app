export interface Product {
  id?: string;
  name: string;
  price: string;
  contain_articles?: Unit[];
  amount?: number;
}

export interface Unit {
  art_id: string;
  amount_of: string;
}

export interface Article {
  art_id: string;
  name: string;
  stock: string;
  id?: string;
}
