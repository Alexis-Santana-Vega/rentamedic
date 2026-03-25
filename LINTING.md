# ESLint + Prettier Setup

Esta configuración proporciona una integración óptima entre ESLint y Prettier sin conflictos para tu proyecto Vue 3 + Vuetify + TypeScript con **ESLint 9** (Flat Config).

## 📦 Configuración actual

- **ESLint**: 9.39.4 (Flat Config system)
- **Prettier**: 3.8.1
- **typescript-eslint**: Para soporte completo de TypeScript
- **eslint-plugin-vue**: Para Vue 3 + TypeScript
- **eslint-config-prettier**: Desactiva reglas conflictivas

## ⚙️ Configuración

### Prettier (`.prettierrc.json`)

Configurado para Vue 3/Vuetify con:

- **printWidth**: 100 caracteres (legible pero compacto)
- **tabWidth**: 2 espacios (estándar Vue)
- **singleQuote**: true (compatible con JavaScript)
- **trailingComma**: es5 (compatible con navegadores antiguos)
- **vueIndentScriptAndStyle**: true (formatea script y style en `.vue`)
- **semi**: true (puntos y coma obligatorios)
- **arrowParens**: avoid (paréntesis opcionales en arrows)

### ESLint (`eslint.config.js`)

Utiliza el nuevo **Flat Config system** de ESLint 9 con:

1. **Ignorar archivos**: Sistema nativo de ESLint 9 (sin `.eslintignore`)
2. **@eslint/js**: Recomendaciones base de JavaScript
3. **typescript-eslint**: Soporte para TypeScript
4. **eslint-plugin-vue**: Soporte para Vue 3
5. **eslint-config-prettier**: Al final para desactivar conflictos

**Importante**: El orden importa. Prettier va al final.

## 🎯 Comandos disponibles

```bash
# Verificar errores de ESLint
yarn lint

# Arreglar automáticamente errores de ESLint
yarn lint:fix

# Formatear código con Prettier
yarn format

# Verificar si el código cumple formato de Prettier (sin cambios)
yarn format:check

# Verificar ESLint y Prettier sin cambios
yarn lint:all

# Arreglar TODOS los problemas (ESLint + Prettier)
yarn fix:all
```

## 🔄 Flujo de trabajo recomendado

### Opción 1: Durante desarrollo

```bash
yarn fix:all    # Antes de hacer commit
```

### Opción 2: Pre-commit (recomendado)

Configura un hook pre-commit con husky:

```bash
npm install -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "yarn fix:all"
```

### Opción 3: En CI/CD

```bash
yarn lint:all   # Verificar sin cambios (para pipeline)
```

## 🚀 VS Code Integration

Instala las extensiones recomendadas:

1. **ESLint** (`dbaeumer.vscode-eslint`)
2. **Prettier** (`esbenp.prettier-vscode`)
3. **Volar** (`Vue.volar`) - Ya recomendado en el proyecto

Tu archivo `.vscode/settings.json` ya está configurado para:

- Formatear automáticamente al guardar
- Arreglar ESLint al guardar
- Usar Prettier como formateador por defecto

## 📋 Reglas principales

| Regla                            | Valor | Razón                               |
| -------------------------------- | ----- | ----------------------------------- |
| `printWidth`                     | 100   | Legibilidad sin ser demasiado ancho |
| `vueIndentScriptAndStyle`        | true  | Indenta content en archivos `.vue`  |
| `trailingComma`                  | es5   | Compatible con navegadores antiguos |
| `semi`                           | true  | Explícito, evita bugs sutiles       |
| `singleQuote`                    | true  | Estándar en ecosistema JavaScript   |
| `vue/multi-word-component-names` | warn  | Excepto para páginas de router      |

## ⚠️ Resolución de conflictos

Si ves errores de configuración:

1. **"Flat Config" errors**: Asegúrate de estar en ESLint 9+
2. **Archivos ignorados**: Verifica la propiedad `ignores` en `eslint.config.js`
3. **Conflictos ESLint + Prettier**: Ejecuta `yarn fix:all`
4. **Cache viejo**: Borra `node_modules/.cache/eslint-plugin-vue` si es necesario

## 🔗 Referencias

- [ESLint 9 Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Prettier Docs](https://prettier.io/docs)
- [typescript-eslint](https://typescript-eslint.io/)
- [eslint-plugin-vue](https://eslint.vuejs.org/)
- [ESLint Config Prettier](https://github.com/prettier/eslint-config-prettier)
