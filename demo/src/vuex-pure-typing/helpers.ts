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



// Derive optimized clean paramenter list //
type GetNeatenedMutationOrActionParamList<PrefixedMutationsOrActionsCombination, K> =
    GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K> extends never ?
        [type: K]
        :
        undefined extends GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K> ? 
            [type: K, payload?: GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K>]
            :
            [type: K, payload: GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K>]

type GetContextNeatenedMutationOrActionParamList<PrefixedMutationsOrActionsCombination, K, CommitOptions> =
    GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K> extends never ?
        [type: K, options: CommitOptions]
        :
        undefined extends GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K> ? 
            [type: K, payload: GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K>|null, options: CommitOptions]    // We make agreement that if a mutation has no payload passed in (still the parameter list needs an option after payload), then save its place with null.
            :
            [type: K, payload: GetMutationOrActionPayLoad<PrefixedMutationsOrActionsCombination, K>, options: CommitOptions]

type CommitSignature<_Module extends { _Mutations: any }> =
{
    <K extends keyof _Module["_Mutations"]>(...args: GetNeatenedMutationOrActionParamList<_Module["_Mutations"], K>): ReturnType<_Module["_Mutations"][K]>
}

type ContextCommitSignature<_Module extends { _Mutations: any }> =
{
    <K extends keyof _Module["_Mutations"]>(...args: GetContextNeatenedMutationOrActionParamList<_Module["_Mutations"], K, { root: true }>): ReturnType<_Module["_Mutations"][K]>
}

type DispatchSignature<_Module extends { _Actions: any }> =
{
    <K extends keyof _Module["_Actions"]>(...args: GetNeatenedMutationOrActionParamList<_Module["_Actions"], K>): Promise<ReturnType<_Module["_Actions"][K]>>
}

type ContextDispatchSignature<_Module extends { _Actions: any }> =
{
    <K extends keyof _Module["_Actions"]>(...args: GetContextNeatenedMutationOrActionParamList<_Module["_Actions"], K, { root: true }>): Promise<ReturnType<_Module["_Actions"][K]>>
}

type LocalCommitSignature<_M extends { [key: string]: (...args: any) => void }> =
{
    <K extends keyof _M>(...args: GetNeatenedMutationOrActionParamList<_M, K>): ReturnType<_M[K]>
}



export
{
    GetNeatenedMutationOrActionParamList,
    GetContextNeatenedMutationOrActionParamList,
    CommitSignature,
    ContextCommitSignature,
    DispatchSignature,
    ContextDispatchSignature,
    LocalCommitSignature,
}