'use client';

import {
  useMutation,
  type DefaultError,
  type UseMutationOptions,
  type UseBaseMutationResult,
} from '@tanstack/react-query';
import { useRef, type ReactNode } from 'react';

import { ToastAction, type ToastActionElement } from '@/components/ui/toast';

import { useToast } from './use-toast.hook';

/**
 * Options for using a mutation with toast notifications.
 *
 * @template TData - The type of data returned by the mutation. Defaults to `unknown`.
 * @template TError - The type of error returned by the mutation. Defaults to `DefaultError`.
 * @template TVariables - The type of variables passed to the mutation. Defaults to `void`.
 * @template TContext - The type of context passed to the mutation. Defaults to `unknown`.
 */
export interface UseMutationWithToastOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
> extends UseMutationOptions<TData, TError, TVariables, TContext> {
  /**
   * Custom error message to display in the toast notification.
   */
  toastCustomError?: string;

  /**
   * Custom success message to display in the toast notification.
   */
  toastCustomSuccessMessage?: string;

  /**
   * Action element to include in the toast notification.
   */
  toastAction?: ToastActionElement;

  /**
   * The maximum number of retry attempts for the mutation.
   */
  retryLimit?: number;
}

export function useMutationWithToast<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
>({
  toastCustomSuccessMessage = 'Operação concluída com sucesso!',
  toastCustomError = 'Ocorreu um erro durante a operação.',
  toastAction,
  onSuccess,
  onError,
  retryLimit = 6,
  ...options
}: UseMutationWithToastOptions<
  TData,
  TError,
  TVariables,
  TContext
>): UseBaseMutationResult<TData, TError, TVariables, TContext> & {
  isRetryAttemptsExceeded: boolean;
} {
  const { toast } = useToast();
  const retriesCountRef = useRef(0);

  const mutationResult = useMutation<TData, TError, TVariables, TContext>({
    ...options,
    onSuccess: (data, variables, context) => {
      toast({
        title: toastCustomSuccessMessage,
        variant: 'success',
      });

      return onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (retriesCountRef.current >= retryLimit) {
        toast({
          title: 'Tentativas de repetição excedidas',
          description: `Você atingiu o limite máximo de tentativas de ${retryLimit}.`,
        });

        return onError?.(error, variables, context);
      }

      let description: ReactNode;

      if (error instanceof Error) {
        description = error.message;
      } else {
        description = (
          <>
            <strong>Error:</strong>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </>
        );
      }

      retriesCountRef.current++;

      toast({
        title: toastCustomError,
        variant: 'destructive',
        description,
        action: toastAction ?? (
          <ToastAction
            altText="Tente de novo"
            onClick={() => mutationResult.mutateAsync(variables)}
          >
            Tente de novo
          </ToastAction>
        ),
      });

      return onError?.(error, variables, context);
    },
  });

  return {
    ...mutationResult,
    isRetryAttemptsExceeded: retriesCountRef.current >= retryLimit,
  };
}
