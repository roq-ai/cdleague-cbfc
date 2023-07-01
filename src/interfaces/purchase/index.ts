import { UserInterface } from 'interfaces/user';
import { TokenInterface } from 'interfaces/token';
import { GetQueryInterface } from 'interfaces';

export interface PurchaseInterface {
  id?: string;
  buyer_id: string;
  token_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  token?: TokenInterface;
  _count?: {};
}

export interface PurchaseGetQueryInterface extends GetQueryInterface {
  id?: string;
  buyer_id?: string;
  token_id?: string;
}
