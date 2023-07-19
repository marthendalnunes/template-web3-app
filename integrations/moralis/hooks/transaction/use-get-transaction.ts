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
      const testRes = await res.text()
      console.log('debug res', testRes)
      if (!res.ok) throw new Error(testRes)

      return res.json() as Promise<GetTransactionResponse>
    },
    enabled,
    useErrorBoundary: true,
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
