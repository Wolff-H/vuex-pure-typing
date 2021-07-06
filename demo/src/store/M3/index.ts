import { _FULL_PATH as _PREFIX_PATH } from ".."

/**********************************************************************************************************************/

const modules =
{

}

const state: _S =
{
    val_num: 1,
    val_str: '3',
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
    namespaced: true,
    modules,
    state,
    getters,
    mutations,
    actions,
}

/**********************************************************************************************************************/
// vuex-pure-typing //
type _PATH = 'M3'
type _FULL_PATH = `${_PREFIX_PATH}${_PATH}/`
type _Context = ActionContext<_S, typeof getters, typeof mutations>
type _Module = _VMT<_PATH, _FULL_PATH, typeof Module>
export { _FULL_PATH, _Module }
/**********************************************************************************************************************/

export default Module