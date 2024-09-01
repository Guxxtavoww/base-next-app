import type { Locale } from '@/config/i18n.config';
import type { ReactNode, Dispatch, SetStateAction } from 'react';

declare global {
  /**
   * Type that extends a given type with a `children` property of type `ReactNode`.
   * @template T - The type to extend, defaults to an empty object.
   */
  export type WithChildren<T extends Record<string, any> = {}> = T &
    Readonly<{ children: ReactNode }>;

  /**
   * Type that can either be of a specified type `T` or `null`.
   * @template T - The type that can be nullable.
   */
  export type Nullable<T> = T | null;

  /**
   * Type that can either be of a specified type `T`, `null`, or `undefined`.
   * @template T - The type that can be optional or nullable.
   */
  export type Maybe<T> = Nullable<T> | undefined;

  /**
   * Type for an object with string keys and values that are either strings or undefined.
   */
  type MyRecord = Record<string, string | undefined>;

  /**
   * Type for the state setter function returned by the `useState` hook.
   * @template T - The type of the state.
   */
  export type UseStateSetFn<T> = Dispatch<SetStateAction<T>>;

  /**
   * Props for a server component page, including route parameters and search parameters.
   * @template ParamsType - The type of route parameters.
   * @template SearchParamsType - The type of search parameters.
   */
  export type ServerComponentPageProps<
    ParamsType extends MyRecord = MyRecord,
    SearchParamsType extends MyRecord = MyRecord
  > = {
    params: ParamsType & { locale: Locale };
    searchParams: SearchParamsType;
  };

  /**
   * Props for an error page component.
   */
  export type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
  };

  /**
   * Base entity type with common fields like `id`, `created_at`, and `updated_at`.
   * @template T - The type to extend the base entity with additional fields.
   */
  export type BaseEntity<T extends Record<string, any>> = {
    id: string;
    created_at: string;
    updated_at: Nullable<string>;
  } & T;

  /**
   * Metadata for paginated responses.
   */
  export interface PaginationMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }

  /**
   * Type for a paginated response.
   * @template T - The type of the items in the paginated response.
   */
  export interface PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
  }

  /**
   * Type for an option in a select or dropdown component.
   */
  export interface Option {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    withCount?: boolean;
  }

  /**
   * Type for a field used to filter data in a data table.
   * @template TData - The type of the data being filtered.
   */
  export interface DataTableFilterField<TData> {
    label: string;
    value: keyof TData;
    placeholder?: string;
    options?: Option[];
  }

  /**
   * Type for an option used to filter data in a data table.
   * @template TData - The type of the data being filtered.
   */
  export interface DataTableFilterOption<TData> {
    id: string;
    label: string;
    value: keyof TData;
    options: Option[];
    filterValues?: string[];
    filterOperator?: string;
    isMulti?: boolean;
  }

  export type ObjectKeys<T extends Record<string, unknown>, Key = keyof T> =
    // Check if key is a string.
    Key extends string
      ? // Continue to check if key has nested objects.
        T[Key] extends Record<string, unknown>
        ? // If nested object is found, recursively run the ObjectKeys on it.
          `${Key}.${ObjectKeys<T[Key]>}`
        : // If nested object is not found, return the key.
          `${Key}`
      : // Return nothing.
        never;
}
