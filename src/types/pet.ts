export interface Pet {
  id: string;
  title: string;
  breed: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  size?: number;
}

export interface CareTip {
  id: string;
  title: string;
  category: string;
  description: string;
}

export interface GroomingTip {
  id: string;
  title: string;
  petType: string;
  frequency: string;
  description: string;
}