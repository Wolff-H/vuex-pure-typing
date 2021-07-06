/**
 * 增强vuex的自带类型定义
 */

import { CommitSignature, ContextCommitSignature, DispatchSignature, ContextDispatchSignature } from "../vuex-pure-typing/helpers"
import { _Module } from "."

declare module "vuex"
{
    export type nestedState = _Module["_State"]
    export type Getters = _Module["_Getters"]
    export type Commit = CommitSignature<_Module>
    export type ContextCommit = ContextCommitSignature<_Module>
    export type Dispatch = DispatchSignature<_Module>
    export type ContextDispatch = ContextDispatchSignature<_Module>
}
