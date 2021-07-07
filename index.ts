declare type GetVuexModuleType<
    _PATH extends string,
    _FULL_PATH extends string,
    _Module extends VuexModuleInstanceType,
    VuexModuleTypeUnion extends VuexModuleType|{} = {},
> =
{
    _State:
        _PATH extends '' ?
            GetIntersectedState<_Module["state"], VuexModuleTypeUnion & VuexModuleTypeBase>
            :
            GetPrefixedState<_PATH, GetIntersectedState<_Module["state"], VuexModuleTypeUnion & VuexModuleTypeBase>>
    _Getters: GetIntersectedGetters<GetPrefixedGetters<_FULL_PATH, _Module["getters"]>, VuexModuleTypeUnion & VuexModuleTypeBase>
    _Mutations: GetIntersectedMutations<GetPrefixedMutations<_FULL_PATH, _Module["mutations"]>, VuexModuleTypeUnion & VuexModuleTypeBase>
    _Actions: GetIntersectedActions<GetPrefixedActions<_FULL_PATH, _Module["actions"]>, VuexModuleTypeUnion & VuexModuleTypeBase>
}

/**
 * Alias of Vuex Module Type.
 * (this one is for the minifying usage purpose).
 */
declare type _VMT<
    _PATH extends string,
    _FULL_PATH extends string,
    _Module extends VuexModuleInstanceType,
    VuexModuleTypeUnion extends VuexModuleType|{} = {},
> =
{
    _State:
        _PATH extends '' ?
            GetIntersectedState<_Module["state"], VuexModuleTypeUnion & VuexModuleTypeBase>
            :
            GetPrefixedState<_PATH, GetIntersectedState<_Module["state"], VuexModuleTypeUnion & VuexModuleTypeBase>>
    _Getters: GetIntersectedGetters<GetPrefixedGetters<_FULL_PATH, _Module["getters"]>, VuexModuleTypeUnion & VuexModuleTypeBase>
    _Mutations: GetIntersectedMutations<GetPrefixedMutations<_FULL_PATH, _Module["mutations"]>, VuexModuleTypeUnion & VuexModuleTypeBase>
    _Actions: GetIntersectedActions<GetPrefixedActions<_FULL_PATH, _Module["actions"]>, VuexModuleTypeUnion & VuexModuleTypeBase>
}

declare type ActionContext<_S, _G, _M> =
{
    dispatch: any // ActionContext is a member of dispatch, thus dispatch cannot circularly reference itself
    commit: import("vuex").ContextCommit & import("./helpers").LocalCommitSignature<_M>
    state: _S
    getters: _G
    rootState: import("vuex").nestedState
    rootGetters: import("vuex").Getters
}

type VuexModuleInstanceType =
{
    state: any
    getters: any
    mutations: any
    actions: any
}

// Define common used types --------------------------------------------------------------------------------------------
type VuexModuleType =
{
    _State: any
    _Getters: any
    _Mutations: any
    _Actions: any
}

type VuexModuleTypeBase =
{
    _State: {}
    _Getters: {}
    _Mutations: {}
    _Actions: {}
}

type GMAFuntionType = {   [key: string]: (...args: any) => any   }



// Deduce _State -------------------------------------------------------------------------------------------------------
type GetIntersectedState<_S, VuexModuleTypeUnion extends VuexModuleType> =
    _S & UnionToIntersectionState<VuexModuleTypeUnion>

type GetPrefixedState<_PATH extends string, IntersectedState> =
    Record<`${_PATH}`, IntersectedState>



// Deduce _Getters -----------------------------------------------------------------------------------------------------
type GetPrefixedGetters<
    _FULL_PATH extends string,
    GettersType extends GMAFuntionType,
> =
{
    [K in keyof GettersType as `${_FULL_PATH}${K & string}`]: ReturnType<GettersType[K]>
}

type GetIntersectedGetters<PrefixedGetters, VuexModuleTypeUnion extends VuexModuleType> =
    PrefixedGetters & UnionToIntersectionGetters<VuexModuleTypeUnion>



// Deduce _Mutations ---------------------------------------------------------------------------------------------------
type GetPrefixedMutations<
    _FULL_PATH extends string,
    MutationsType extends GMAFuntionType,
> =
{
    [K in keyof MutationsType as `${_FULL_PATH}${K & string}`]: MutationsType[K]
}

type GetIntersectedMutations<PrefixedMutations, VuexModuleTypeUnion extends VuexModuleType> =
    PrefixedMutations & UnionToIntersectionMutations<VuexModuleTypeUnion>



// Deduce _Actions -----------------------------------------------------------------------------------------------------
type GetPrefixedActions<
    _FULL_PATH extends string,
    ActionsType extends GMAFuntionType,
> =
{
    [K in keyof ActionsType as `${_FULL_PATH}${K & string}`]: ActionsType[K]
}

type GetIntersectedActions<PrefixedActions, VuexModuleTypeUnion extends VuexModuleType> =
    PrefixedActions & UnionToIntersectionActions<VuexModuleTypeUnion>



// helpers /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Derive intersection of _State, _Getters, _Mutations, _Actions respectively from VuexModuleType //
type UnionToIntersectionState<Union extends VuexModuleType> =
    (Union extends any ? ((k: Union["_State"]) => void) : never ) extends (k: infer I) => void ? I : never

type UnionToIntersectionGetters<Union extends VuexModuleType> =
    (Union extends any ? ((k: Union["_Getters"]) => void) : never ) extends (k: infer I) => void ? I : never

type UnionToIntersectionMutations<Union extends VuexModuleType> =
    (Union extends any ? ((k: Union["_Mutations"]) => void) : never ) extends (k: infer I) => void ? I : never

type UnionToIntersectionActions<Union extends VuexModuleType> =
    (Union extends any ? ((k: Union["_Actions"]) => void) : never ) extends (k: infer I) => void ? I : never
