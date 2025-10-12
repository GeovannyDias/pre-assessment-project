# Documentación Técnica 
## Evaluación Arquitectura de Microservicios

## Resumen del Proyecto

Este proyecto implementa una solución basada en arquitectura de microservicios para una aplicación financiera simulada, cumpliendo con los requerimientos propuestos en la prueba técnica. La solución está compuesta por:

- Backend distribuido en microservicios desarrollados en Spring Boot, expuestos como APIs RESTful, y orquestados a través de un API Gateway.
- Frontend desarrollado en Angular 20, desacoplado completamente del backend.
- Todos los servicios son desplegables de forma local mediante Docker y Docker Compose.
- Pruebas unitarias implementadas tanto en el backend como en el frontend.
- Base de datos relacional gestionada con MariaDB.
- Documentación OpenAPI (Swagger) incluida para cada microservicio.

# Arquitectura de Microservicios

Solución basada en microservicios para la gestión de clientes, cuentas y movimientos financieros. La arquitectura sigue principios de diseño desacoplado, buenas prácticas de desarrollo, y está totalmente contenida en Docker.

## Diagrama de Arquitectura General

La solución sigue una arquitectura orientada a microservicios con separación de responsabilidades y persistencia independiente por servicio.

![01 Diagrams-Diagrama-General](https://github.com/user-attachments/assets/ecc6157d-930d-4a7e-835b-56ff62c47e6a)

## Diagrama de Arquitectura de Microservicios

![02 Diagrams-Diagrama-Arquitectura](https://github.com/user-attachments/assets/e553050a-66db-414d-bd0d-8d4680b8a8dc)

## Diagrama de Despliegue Docker

![03 Diagrams-Diagrama-Despliegue-Docker](https://github.com/user-attachments/assets/62a22504-4704-4254-a764-ede36fdc81cb)

## Base de Datos Relacional - MER

<img width="1316" height="721" alt="Diagram_BDD" src="https://github.com/user-attachments/assets/c96af804-1386-4c03-a767-0c4fa55e027a" />

* *https://dbdiagram.io/d/68d8a4a1d2b621e42237b5b2*

## Componentes principales

| Componente            | Descripción                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| `asm-api-gateway`     | Orquestador de tráfico, enruta las solicitudes a los microservicios    |
| `asm-msa-customer`    | Gestiona de clientes                          |
| `asm-msa-account`     | Gestiona cuentas bancarias de los clientes                             |
| `asm-msa-transaction` | Procesa los movimientos (débitos/créditos), gestiona saldos            |
| `asm-msa-identity`    | Simulación de un proveedor de identidad, gestiona autenticación básica. (Por implementar) |
| `app-spa-portal`      | Frontend SPA desarrollado en Angular 20                                |
| `mariadb`             | Base de datos relacional, persistencia general para simular la solución        |

# Estructura del proyecto (Cluster Simulation)

```
project-root/
├── asm-api-gateway/
├── asm-msa-customer/
├── asm-msa-account/
├── asm-msa-transaction/
├── asm-msa-identity/
├── app-spa-portal/
├── mariadb/                   # Scripts de inicialización *.sql*
├── .env
├── docker-compose.yml
└── README.md

```

# Instrucciones de despliegue con Docker

## Preparación del Proyecto Antes de Ejecutar Docker

Antes de levantar los contenedores con Docker, es necesario compilar y empaquetar los proyectos Spring Boot y generar el build del frontend Angular.

#### Compilar Proyectos Spring Boot

Cada microservicio y api-gateway debe ser compilado individualmente para generar su archivo `.jar` que Docker usará en la imagen.

Desde la raíz de cada proyecto Spring Boot `asm-api-gateway`, `asm-msa-customer`, `asm-msa-account`, `asm-msa-transaction`, `asm-msa-identity`, ejecuta:

```bash
mvn clean package -DskipTests
```
> Esto generará archivos `.jar` en las carpetas target/ de cada proyecto.

#### Generar Build del Frontend (Angular)

Desde la carpeta del frontend `app-spa-portal`, ejecuta:

```bash
npm install
ng build --configuration production
```
> Al generar el build del frontend Angular se crear el siguiente directorio `dist/` donde esta todo el proyecto web compilado.

## Configuración de Variables de Entorno

Para que el entorno del proyecto funcione correctamente, es necesario definir una serie de variables de entorno utilizadas en el archivo `docker-compose.yml` y en las aplicaciones internas.

#### Archivo `.env`

Este proyecto incluye un archivo de ejemplo llamado `.env.example`. Para configurar las variables de entorno:

Copia el archivo `.env.example` y renómbralo a `.env` en la raíz del proyecto:

```bash
   cp .env.example .env
```
> En el caso de querer levantar los proyectos de forma independiente, en cada servicio exite el fichero `.env.example` y seguir la misma indiccion anterior.

## Levanta los servicios:

Antes de ejecutar el proyecto validar si se tiene instalado `docker` y `docker compose`.

```bash
docker -v
docker compose version
```

Ejecutar el siguiente comando para levantar todo el proyecto:

```bash
docker-compose up --build
```
## Accede a la app desde el navegador:

```
Frontend: http://<SERVER_IP>:4200
API Gateway: http://<SERVER_IP>:8081
```

## Consideraciones Técnicas

- Arquitectura de microservicios con Spring Boot + Angular 20.
- API Gateway como punto de entrada unificado (Spring Boot + Cloud Gateway).
- Comunicación REST con contratos OpenAPI.
- Autenticación simulada (servicio de identidad - pendiente implementación).
- Persistencia relacional con MariaDB y JPA.
- Contraseñas encriptadas con BCrypt (pendiente implementación).
- Pruebas unitarias en backend (JUnit/Mockito) y frontend (Jest).

## Recursos Adicionales

En el directorio `resources/` ubicado en la raíz del repositorio, se incluye varios recursos.

## Contenido del directorio `resources/`:

| Archivo / Carpeta                 | Descripción                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| `pre-assessment.postman_collection.json`        | Colección de Postman para probar los endpoints de la API, de forma independiente o apuntando al API-Gateway                   |
| `screens/`                     | Capturas de pantalla del sistema en ejecución (frontend y backend)        |
| `diagrams/`                     | Diagramas de arquitectura, flujo de datos, diseño del sistema.           |
| `REPORT_BASE64.md`                     | Respuesta de reporte base64.           |







