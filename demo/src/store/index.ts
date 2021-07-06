import { createStore } from "vuex"

import M1, { _Module as _M1 } from "./M1"
import M2, { _Module as _M2 } from "./M2"
import M3, { _Module as _M3 } from "./M3"

/**********************************************************************************************************************/

const modules =
{
    M1,
    M2,
    M3,
}

const state: _S =
{
    val_num: 0,
    val_str: 'root',
    val_bool: true,
    val_obj: { a: null },
    val_complex_obj: { a1: { b: [123, 'abc'] }, a2: false },
}

const getters =
{
    getSomeNumber(state: _S)
    {
        return 123
    },
    getSomeString(state: _S)
    {
        return 'abc'
    },
}

const mutations =
{
    getValNum(state: _S, payload: {
        val_num: _S["val_num"]
    }){
        state.val_num = payload.val_num
    },
    getValStr(state: _S, payload: {
        val_str: _S["val_str"]
    }){
        state.val_str = payload.val_str
    },
    getValBool(state: _S, payload: {
        val_bool: _S["val_bool"]
    }){
        state.val_bool = payload.val_bool
    },
    getValObj(state: _S, payload: {
        val_obj: _S["val_obj"]
    }){
        state.val_obj = payload.val_obj
    },
    getValComplexObj(state: _S, payload: {
        val_complex_obj: _S["val_complex_obj"]
    }){
        state.val_complex_obj = payload.val_complex_obj
    },
}

const actions =
{
    doSomething_1(context: _Context)
    {
        return true
    },
    doSomething_2(context: _Context, payload: {
        params: any
    }){
        return false
    },
}

interface _S
{
    val_num: number
    val_str: string
    val_bool: boolean
    val_obj: { a: any }
    val_complex_obj: { a1: { b: [number, string] }, a2: boolean }
}

const Module =
{
    // strict: process.env.NODE_ENV !== 'production',
    // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],

    namespaced: true,
    modules,
    state,
    getters,
    mutations,
    actions,
}

const store = createStore(Module as any)

/**********************************************************************************************************************/
// vuex-pure-typing //
type _PREFIX_PATH = ''
type _PATH = ''
type _FULL_PATH = `${_PREFIX_PATH}${_PATH}`
type _Context = ActionContext<_S, typeof getters, typeof mutations>
type _Module = _VMT<_PATH, _FULL_PATH, typeof Module, _M1|_M2|_M3>
type _RootState = _Module['_State']

export { _FULL_PATH, _Module, _RootState }

/**********************************************************************************************************************/

export default store

export
{
    Module,
}
