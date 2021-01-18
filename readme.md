
# vuex-pure-typing
A simple, complete and noninvasive way to type your vuex store.  
This tool is implemented with TypeScript template literal type, so TS 4.1+ is required.
The library works in a template way. You need to add several rows of template code to your present vuex store module, without changing current code or coding style. Also the typing impacts nothing to the existing code behaviour. It's totally clean ^_^.

## 1. Your vuex module should look like
#### header
```typescript
// >>>>>>>> code fragment required for typing
import SubModuleA, { _Module as _SubModuleA } from "./SubModuleA"
import SubModuleB, { _Module as _SubModuleB } from "./SubModuleB"
import SubModuleC, { _Module as _SubModuleC } from "./SubModuleC"

import { _FULL_PATH as _PREFIX_PATH } from ".."
// <<<<<<<<
```
#### body
```typescript
const Module =
{
    namespaced: true,
    
    modules:
    {
        SubModuleA,
        SubModuleB,
        SubModuleC,
    },
    state:
    {
        // ...
    } as _S,    // optional (but highly recommend to cast to a concrete interface!)
    getters:
    {
        // ...
    },
    mutations:
    {
        // ...
    },
    actions:
    {
        // ...
    },
}

interface _S
{
    // ...
}
```
#### footer
```typescript
// >>>>>>>> code fragment required for typing
type _PATH = 'ThisModulePath'    // [manually manage]
type _SubModuleUnion = _SubModuleA|_SubModuleB|_SubModuleC    // [manually manage]

type _FULL_PATH = `${_PREFIX_PATH}${_PATH}/`
type _Module = GetVuexModuleType<
    _SubModuleUnion,
    _PATH,
    _FULL_PATH,
    typeof Module,
>
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
type _Module = _VMT<_SubModuleA|_SubModuleB|_SubModuleC, _P, _FP, typeof Module>
export { _FP, _ThisModuleName }
// <<<<<<<<

export default Module
```
## 2. Change native vuex store typing reference
Change vuex native typing file `node_modules/vuex/types/index.d.ts`
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
import { GetNeatenedMutationOrActionParamList } from "vuex-pure-typing/helpers"

declare module "vuex"
{
    export type nestedState = _Module["_State"]
    export type Getters = _Module["_Getters"]
    export interface Commit
    {
        <K extends keyof _Module["_Mutations"]>(...args: GetNeatenedMutationOrActionParamList<_Module["_Mutations"], K, CommitOptions>): ReturnType<_Module["_Mutations"][K]>
        <K extends keyof _Module["_Actions"]>(...args: GetNeatenedMutationOrActionParamList<_Module["_Actions"], K, CommitOptions>): Promise<ReturnType<_Module["_Actions"][K]>>
    }
}

```