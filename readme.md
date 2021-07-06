
# vuex-pure-typing
A simple, complete and noninvasive way to type vuex store.  
This tool is implemented with TypeScript template literal type, with TS 4.1+ required.
The library works in a template way. You need to add several rows of template code to your present vuex store module, without changing current code or coding style. Also the typing impacts nothing to the existing code behaviour. It's totally clean ^_^.

## 1. Your Vuex module would look like
#### header
```typescript
// >>>>>>>> code fragment for typing
import SubModuleA, { _Module as _SubModuleA } from "./SubModuleA"
import SubModuleB, { _Module as _SubModuleB } from "./SubModuleB"
import SubModuleC, { _Module as _SubModuleC } from "./SubModuleC"

import { _FULL_PATH as _PREFIX_PATH } from ".."
// <<<<<<<<
```
#### body
```typescript
const modules =
{
    SubModuleA,
    SubModuleB,
    SubModuleC,
},

const state: _S =
{
    // ...
}

const getters =
{
    // ...
}

const mutations =
{
    // ...
}

const actions =
{
    // ...
}

interface _S // state interface is optional (but highly recommend)
{
    // ...
}

const Module =
{
    // use store options as it is.
    // strict: process.env.NODE_ENV !== 'production',
    // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],

    namespaced: true,
    modules,
    state,
    getters,
    mutations,
    actions,
}
```
#### footer
```typescript
// >>>>>>>> code fragment required for typing
type _PATH = '[present-layer-path-name]'
type _FULL_PATH = `${_PREFIX_PATH}${_PATH}/`
type _Context = ActionContext<_S, typeof getters, typeof mutations>
type _Module = _VMT<_PATH, _FULL_PATH, typeof Module, _SubModuleA|_SubModuleB|_SubModuleC> // the last one param is not required if there's no submodule
export { _FULL_PATH, _Module }
// <<<<<<<<

export default Module

```
## 2. Minified template
You may minify the template through following ways  
1. Output module type to a specialized name( e.g. _ThisModulePath)
2. abbreviate type name
3. directly pass type needed to generic
4. use abbreviated generic name
#### header
```typescript
import SubModuleA, { _SubModuleA } from "./SubModuleA"
import SubModuleB, { _SubModuleB } from "./SubModuleB"
import SubModuleC, { _SubModuleC } from "./SubModuleC"

import { _FP as _PP } from ".."
```
#### footer
```typescript
// >>>>>>>> code fragment required for typing
type _P = 'Framework'
type _FP = `${_PP}${_P}/`
type _Context = ActionContext<_S, typeof getters, typeof mutations>
type _Module = _VMT<_PATH, _FULL_PATH, typeof Module, _SubModuleA|_SubModuleB|_SubModuleC>
export { _FP, _Module }
// <<<<<<<<

export default Module
```
## 2. Change native vuex store typing reference
Modify vuex native typing file `node_modules/vuex/types/index.d.ts`
```typescript
export declare class Store<S> {
    // ...
    // readonly state: S;
    // readonly getters: any;

    readonly state: nestedState;
    readonly getters: Getters;

    // ...
}

// ...

// export interface Dispatch {
//   (type: string, payload?: any, options?: DispatchOptions): Promise<any>;
//   <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
// }

// export interface Commit {
//   (type: string, payload?: any, options?: CommitOptions): void;
//   <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
// }

// ...

```

## 3. Augment vuex typing
You may directly add this declaration to `store/index.ts`.  
While I personally like putting it in a seperate file, for example make the file `store/typing.ts`. Doing so makes root store file clean and keeps its single responsibility.  
```typescript
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

```
## Changelog
**2.0.0**
- New layout/style of store module content organization.
- Breaking changes of template generic parameters - way simpler and cleaner.
- `context` deduction for actions in store module is now available.
- Signatures of each `commit`, `dispatch` are seperately defined in a more accurate form correspoding to its context, namely inside or outside a store module.
- More semantic naming.
- Add comments.
- Add demo.