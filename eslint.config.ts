import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    name: 'app/component-folders',
    rules: {
      // Components live in kebab-case folders as `index.vue`; the folder name is the component name.
      'vue/multi-word-component-names': ['error', { ignores: ['index'] }],
    },
  },

  {
    name: 'app/project-cn',
    rules: {
      // The shadcn-vue CLI generates `import { cn } from 'cn'`, which does not know the project's text styles.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'cn',
              message: "Import cn from '@/lib/utils': it knows the project's text styles.",
            },
          ],
        },
      ],
    },
  },

  {
    name: 'app/generated-ui',
    files: ['src/components/ui/**/*.vue'],
    rules: {
      // shadcn-vue generates single-word primitives (Button, Dialog); keep them as generated.
      'vue/multi-word-component-names': 'off',
    },
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
)
