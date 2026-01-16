---
description: Add a new component following SaaSBizz patterns
---

## Create New Component

### Template Structure:
Create file at `components/[ComponentName].vue`:

```vue
<template>
  <div class="glass-card rounded-xl p-4">
    <!-- Component content -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
const props = defineProps<{
  // Define props with types
}>()

// Computed values
const computedValue = computed(() => {
  // Logic here
})
</script>
```

### Component Patterns Used in This Project:
- `glass-card` - Glass morphism card effect
- `hover-glow` - Hover glow effect
- `font-black uppercase italic` - Bold heading style
- Slate colors for text: `text-slate-400`, `text-slate-500`
- Blue accent: `text-blue-400`, `bg-blue-600`

### Checklist:
- [ ] Use TypeScript with `lang="ts"`
- [ ] Define props with proper types
- [ ] Follow existing component patterns
- [ ] Add proper aria labels for accessibility
