import { type ZodSchema, type ZodTypeDef, z } from 'zod';

import { isNullableValue } from './is-nullable-value.util';

export function createNullableTransform<
  TOutput = unknown,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput
>(schema: ZodSchema<TOutput, TDef, TInput>) {
  return schema
    .optional()
    .nullable()
    .transform((value) => (isNullableValue(value) ? undefined : value));
}

/**
 * -----------------------------------------------------------------------------
 * Default Schemas
 * -----------------------------------------------------------------------------
 */
export const numberSchema = z.number().safe('Value is not safe');
export const stringSchema = z.string().trim();
export const emailStringSchema = stringSchema.email();
export const urlStringSchema = stringSchema.url();
export const uuidSchema = stringSchema.uuid();
export const orderParamSchema = z.enum(['ASC', 'DESC']);
export const integerNumberSchema = numberSchema.int();
export const floatNumberSchema = numberSchema.refine((val) => val % 1 !== 0, {
  message: 'Value must be float',
});

export const stringToNumberSchema = stringSchema
  .refine((value) => !Number.isNaN(+value))
  .transform(Number);

export const paginationParamSchema = z
  .union([stringSchema, integerNumberSchema])
  .refine((value) => !Number.isNaN(+value))
  .transform(Number);

export const booleanStringSchema = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true');

export const phoneNumberStringSchema = stringSchema.refine(
  (data) => {
    const phoneNumberRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    return phoneNumberRegex.test(data);
  },
  {
    message: 'Invalid phone number format',
  }
);

export const timeStringSchema = stringSchema.time({ precision: 3 });

export const datetimeStringSchema = stringSchema
  .datetime()
  .transform((value) => new Date(value));

export const dateStringSchema = stringSchema
  .date()
  .transform((value) => new Date(value));

export const endDateStringSchema = dateStringSchema.transform((endDate) => {
  endDate.setDate(endDate.getDate() + 1);

  return endDate;
});

/**
 * -----------------------------------------------------------------------------
 * Optional Schemas
 * -----------------------------------------------------------------------------
 */
export const optionalEmailStringSchema =
  createNullableTransform(emailStringSchema);

export const optionalStringSchema = createNullableTransform(stringSchema);

export const optionalStringToNumberSchema =
  createNullableTransform(stringToNumberSchema);

export const optionalPhoneNumberStringSchema = createNullableTransform(
  phoneNumberStringSchema
);

export const optionalUuidSchema = createNullableTransform(uuidSchema);

export const optionalUrlStringSchema = createNullableTransform(urlStringSchema);

export const optionalIntegerNumberSchema =
  createNullableTransform(integerNumberSchema);

export const optionalFloatNumberSchema =
  createNullableTransform(floatNumberSchema);

export const optionalPaginationParamSchema = createNullableTransform(
  paginationParamSchema
);

export const optionalTimeStringSchema =
  createNullableTransform(timeStringSchema);

export const optionalDatetimeStringSchema =
  createNullableTransform(datetimeStringSchema);

export const optionalEndDateStringSchema =
  createNullableTransform(endDateStringSchema);

export const optionalDateStringSchema =
  createNullableTransform(dateStringSchema);

export const optionalBooleanStringSchema =
  createNullableTransform(booleanStringSchema);

export const optionalOrderParamSchema =
  createNullableTransform(orderParamSchema);
