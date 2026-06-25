---
name: new-module
description: Scaffold a new FEOD-compliant feature module under src/03_modules/. Usage: /new-module ModuleName
---

Create a new feature module following FEOD architecture at `src/03_modules/$ARGUMENTS/`.

## Directory structure to create

```
src/03_modules/$ARGUMENTS/
  api/
  components/
  composables/
  types/
  index.ts
```

`index.ts` should be an empty barrel with a placeholder comment:

```typescript
// Export module's public API here
```

## After creating the structure, ask:

1. **Does this module need a Pinia store?** If yes, create `stores/use$ARGUMENTSStore.ts` using setup-store syntax:

   ```typescript
   import { defineStore } from 'pinia';
   import { ref } from 'vue';

   export const use$ARGUMENTSStore = defineStore('$ARGUMENTS', () => {
     // state and actions here
     return {};
   });
   ```

2. **Does it have sub-features?** If yes, create a `modules/` subdirectory. Each sub-feature follows the same internal structure.

3. **What is the first component?** Create a placeholder `.vue` file:

   ```vue
   <script setup lang="ts"></script>

   <template>
     <div class="xxx"></div>
   </template>

   <style lang="scss" scoped>
   .xxx {
   }
   </style>
   ```

## Naming rules

- Components inside a module: PascalCase, no `V` prefix (that's reserved for `04_common/components/`)
- Composables: `useXxx`
- Stores: `useXxxStore`
- Types file: `xxx.types.ts`
