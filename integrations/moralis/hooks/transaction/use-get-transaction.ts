import type { GetTransactionJSONResponse, GetTransactionResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

interface GetTransactionArgs {
  chain: string
  transactionHash: string
  enabled?: boolean
}

export function useGetTransaction({ chain, transactionHash, enabled }: GetTransactionArgs) {
  return useQuery(['get-transaction', chain, transactionHash], {
    queryFn: async () => {
      const res = await fetch(`/integration/moralis/api/transaction/getTransaction?chain=${chain}&transactionHash=${transactionHash}&format=result`)
      console.log('debug res', res)
      if (!res.ok) throw new Error(String(res))

      return res.json() as Promise<GetTransactionResponse>
    },
    enabled,
  })
}

export function useGetTransactionRaw({ chain, transactionHash, enabled }: GetTransactionArgs) {
  return useQuery(['get-transaction-raw', chain, transactionHash], {
    queryFn: async () => {
      const res = await fetch(`/integration/moralis/api/transaction/getTransaction?chain=${chain}&transactionHash=${transactionHash}&format=raw`)
      if (!res.ok) throw new Error(String(res))

      return res.json() as Promise<GetTransactionJSONResponse>
    },
    enabled,
  })
}
