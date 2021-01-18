declare type GetVuexModuleType<
    T extends VuexModuleType|{},
    _PATH extends string,
    _FULL_PATH extends string,
    _Module extends VuexModuleInstanceType,
> =
{
    _State:
        _PATH extends '' ?
            IState<_Module["state"], T & ModuleBase>
        :
            PState<_PATH, IState<_Module["state"], T & ModuleBase>>
    _Getters: IGetters<PGetters<_FULL_PATH, _Module["getters"]>, T & ModuleBase>
    _Mutations: IMutations<PMutations<_FULL_PATH, _Module["mutations"]>, T & ModuleBase>
    _Actions: IActions<PActions<_FULL_PATH, _Module["actions"]>, T & ModuleBase>
}

// this one is for the minifying usage purpose
declare type _VMT<
    T extends VuexModuleType|{},
    _PATH extends string,
    _FULL_PATH extends string,
    _Module extends VuexModuleInstanceType,
> =
{
    _State:
        _PATH extends '' ?
            IState<_Module["state"], T & ModuleBase>
        :
            PState<_PATH, IState<_Module["state"], T & ModuleBase>>
    _Getters: IGetters<PGetters<_FULL_PATH, _Module["getters"]>, T & ModuleBase>
    _Mutations: IMutations<PMutations<_FULL_PATH, _Module["mutations"]>, T & ModuleBase>
    _Actions: IActions<PActions<_FULL_PATH, _Module["actions"]>, T & ModuleBase>
}

type VuexModuleInstanceType =
{
    state: any
    getters: any
    mutations: any
    actions: any
}

type VuexModuleType =
{
    _State: any
    _Getters: any
    _Mutations: any
    _Actions: any
}

type ModuleBase =
{
    _State: {}
    _Getters: {}
    _Mutations: {}
    _Actions: {}
}

type GMAFun = {   [key: string]: (...args: any) => any   }

type IState<_S, T extends VuexModuleType> =
    _S & U2IState<T>

type PState<_PATH extends string, IState> =
    Record<`${_PATH}`, IState>

type PGetters<
    _FULL_PATH extends string,
    G extends GMAFun,
> =
{
    [K in keyof G as `${_FULL_PATH}${K & string}`]: ReturnType<G[K]>
}

type IGetters<PG, T extends VuexModuleType> =
    PG & U2IGetters<T>

type PMutations<
    _FULL_PATH extends string,
    M extends GMAFun,
> =
{
    [K in keyof M as `${_FULL_PATH}${K & string}`]: M[K]
}

type IMutations<PM, T extends VuexModuleType> =
    PM & U2IMutations<T>

type PActions<
    _FULL_PATH extends string,
    A extends GMAFun,
> =
{
    [K in keyof A as `${_FULL_PATH}${K & string}`]: A[K]
}

type IActions<PA, T extends VuexModuleType> =
    PA & U2IActions<T>

type U2IState<T extends VuexModuleType> =
    (T extends any ? ((k: T["_State"]) => void) : never ) extends (k: infer I) => void ? I : never

type U2IGetters<T extends VuexModuleType> =
    (T extends any ? ((k: T["_Getters"]) => void) : never ) extends (k: infer I) => void ? I : never

type U2IMutations<T extends VuexModuleType> =
    (T extends any ? ((k: T["_Mutations"]) => void) : never ) extends (k: infer I) => void ? I : never

type U2IActions<T extends VuexModuleType> =
    (T extends any ? ((k: T["_Actions"]) => void) : never ) extends (k: infer I) => void ? I : never
