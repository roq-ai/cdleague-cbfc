import { PurchaseInterface } from 'interfaces/purchase';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface TokenInterface {
  id?: string;
  name: string;
  business_id: string;
  created_at?: any;
  updated_at?: any;
  purchase?: PurchaseInterface[];
  business?: BusinessInterface;
  _count?: {
    purchase?: number;
  };
}

export interface TokenGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  business_id?: string;
}
