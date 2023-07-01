import * as yup from 'yup';

export const purchaseValidationSchema = yup.object().shape({
  buyer_id: yup.string().nullable().required(),
  token_id: yup.string().nullable().required(),
});
