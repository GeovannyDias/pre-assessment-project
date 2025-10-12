You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

---









# 🧪 Copilot Instructions: Unit Testing with Jest in Angular 20

## 🎯 Objetivo
Generar pruebas unitarias para componentes, servicios, directivas y pipes en Angular 20 usando **Jest**, siguiendo **buenas prácticas de desarrollo**, incluyendo:

- Principios **SOLID**
- **Clean Code**
- Convenciones de nombres coherentes
- Separación de responsabilidades
- Uso adecuado de **mocks**, **models**, **constants**, y **services**

---

## 🛠️ Configuración base

- Framework: Angular 20
- Test runner: Jest
- Karma y Jasmine han sido eliminados
- `jest.config.js` y `setup-jest.ts` ya están configurados
- `@types/jest`: ^30.0.0
- `jest-environment-jsdom`: ^30.2.0
- `jest-preset-angular`: ^15.0.2

---

## 🧪 Instrucciones para generar pruebas unitarias

Al generar pruebas unitarias en Angular 20 usando Jest, **primero revisar todas las interfaces, modelos y tipos de datos definidos en el proyecto** para:

- Comprender el contexto de los datos utilizados
- Crear mocks coherentes y reutilizables
- Asegurar que las pruebas reflejen el comportamiento real del sistema

---

## 🧠 Paso 1: Revisión de interfaces y tipos

Antes de generar cualquier prueba:

- Buscar archivos con extensión `.model.ts`, `.interface.ts`, `.types.ts`, `.dto.ts`
- Identificar las interfaces que definen los datos usados por el componente, servicio o directiva objetivo
- Extraer los tipos de datos relevantes para inputs, outputs, servicios inyectados, y estructuras internas

### Ejemplo:
Si el componente usa `UserModel`, revisar:

```ts
// user.model.ts
export interface UserModel {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}
```

---

## 🧪 Generación de mocks basados en tipos

- Crear mocks en archivos separados con nombre coherente: user.mock.ts
- Usar los tipos revisados para definir objetos de prueba válidos
- Evitar valores genéricos como any, usar datos realistas

### Ejemplo:

```ts
// user.mock.ts
import { UserModel } from './user.model';

export const mockUser: UserModel = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  isActive: true,
};
```

---

## Generación de pruebas unitarias

- Usar Jest con estructura Arrange – Act – Assert
- Incluir los mocks generados en la sección Arrange
- Nombrar las pruebas de forma coherente y descriptiva
- Aplicar principios SOLID y Clean Code

### Ejemplo:

```ts
it('should display user name correctly', () => {
  // Arrange
  component.user = mockUser;

  // Act
  fixture.detectChanges();
  const nameElement = fixture.nativeElement.querySelector('.user-name');

  // Assert
  expect(nameElement.textContent).toContain('Alice');
});
```

### ✅ Generar pruebas para la funcionalidad más importante del componente

- Identificar métodos públicos, inputs, outputs, y lógica de negocio relevante
- Priorizar pruebas de comportamiento sobre implementación
- Usar `describe` y `it` con nombres **claros y coherentes**
- Evitar pruebas innecesarias de Angular internals

### ✅ Estructura recomendada de archivos

| Tipo de archivo         | Convención de nombre             |
|-------------------------|----------------------------------|
| Componente              | `example.component.ts`           |
| Pruebas unitarias       | `example.component.spec.ts`      |
| Mock personalizado      | `example.mock.ts`                |
| Modelo de datos         | `example.model.ts`               |
| Constantes              | `example.const.ts`               |
| Servicio                | `example.service.ts`             |
| Directiva               | `example.directive.ts`           |
| Pipe                    | `example.pipe.ts`                |
| Constante               | `example.const.ts`               |

### ✅ Buenas prácticas con Jest

- Usar `jest.fn()` para mocks
- Separar mocks en archivos `.mock.ts` si son reutilizables
- Usar `beforeEach` para inicializar el entorno de pruebas
- Evitar `any`, usar tipos explícitos
- Usar `TestBed` solo si es necesario (por ejemplo, para componentes con dependencias Angular)

### ✅ Ejemplo de prueba coherente

```ts
describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display user name when loaded', () => {
    component.user = { name: 'Alice' };
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector('.user-name');
    expect(nameElement.textContent).toContain('Alice');
  });
});

```

---

## ✅ Comandos disponibles

Estos son los comandos definidos en tu `package.json` para ejecutar pruebas con Jest:

| Comando | Descripción |
|--------|-------------|
| `npm run test` | Ejecuta todas las pruebas una sola vez |
| `npm run test:watchAll` | Ejecuta todas las pruebas en modo observación (watch) |
| `npm run test:watch` | Ejecuta solo las pruebas relacionadas con los archivos modificados |
| `npm run test:coverage` | Ejecuta las pruebas y genera reporte de cobertura |
| `npm run test:coverage:open` | Ejecuta cobertura y abre el reporte HTML en el navegador |


---

# 🧪 Buenas prácticas de pruebas unitarias con Arrange – Act – Assert

Esta guía define cómo deben estructurarse las pruebas unitarias en Angular usando Jest, siguiendo la convención **Arrange – Act – Assert (AAA)**. Esta práctica mejora la legibilidad, mantenibilidad y claridad de las pruebas.

---

## ✅ Estructura AAA

Cada prueba debe dividirse en tres secciones bien definidas:

### 1. Arrange (Preparar)
Configura el entorno necesario para ejecutar la prueba:
- Instanciar el componente, clase o servicio
- Crear mocks o stubs
- Definir datos de entrada
- Configurar dependencias

### 2. Act (Actuar)
Ejecuta la acción que se desea probar:
- Llamar a un método
- Emitir un evento
- Simular una interacción

### 3. Assert (Afirmar)
Verifica que el resultado sea el esperado:
- Usar `expect`, `toBe`, `toEqual`, `toHaveBeenCalled`, etc.

---

## 🧪 Ejemplo de prueba con AAA

```ts
it('should return the correct user name', () => {
  // Arrange
  const mockUser = { name: 'Alice' };
  component.user = mockUser;

  // Act
  const result = component.getUserName();

  // Assert
  expect(result).toBe('Alice');
});
```

---

## ✅ Recomendaciones adicionales

- Usa comentarios para separar cada sección si la prueba es extensa
- Evita mezclar lógica de preparación con verificación
- Mantén cada prueba enfocada en una sola responsabilidad
- Aplica esta estructura tanto en componentes como en servicios, pipes y directivas
- Usa nombres descriptivos en describe e it
- Prioriza pruebas de comportamiento sobre implementación

## 📦 Aplicación en Angular + Jest

- Usa jest.fn() para mocks
- Separa mocks en archivos .mock.ts si son reutilizables
- Usa jest.spyOn() para verificar llamadas a métodos
- Usa jest.clearAllMocks() en afterEach si hay mocks globales
- Mantén los archivos .spec.ts cortos y legibles

## 🏁 Resultado esperado

- Pruebas unitarias legibles, coherentes y fáciles de mantener
- Claridad en la intención de cada prueba
- Mayor productividad en desarrollo y debugging
- Código alineado con estándares profesionales y principios SOLID

