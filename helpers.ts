type GetMutationOrActionPayLoad<T, K> = GetMutationOrActionParams<GetTypeOfKey<T, K>>

type GetMutationOrActionParams<T> =
    T extends () => any ?
        never
        :
        T extends (state: any, payload: infer R) => any ?
            unknown extends R ?
                never
                : 
                R
            :
            never

type GetTypeOfKey<T, K> = {   [Key in keyof T]: K extends keyof T ? T[K] : never   }[keyof T]

type GetNeatenedMutationOrActionParamList<PrefixedMutationsOrActionsCombination, K, CommitOptions> =
    GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K> extends never ?
        [type: K, options?: CommitOptions]
        :
        undefined extends GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K> ? 
            [type: K, payload?: GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K>, options?: CommitOptions]
            :
            [type: K, payload: GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K>, options?: CommitOptions]

export
{
    GetNeatenedMutationOrActionParamList,
}