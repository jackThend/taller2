Proyecto Examen: Tienda de Componentes React

Descripción General

Este proyecto es una aplicación web interactiva desarrollada en React que simula una tienda en línea. La aplicación permite a los usuarios ver una lista de productos, agregarlos a un carrito de compras, registrarse e iniciar sesión, y enviar un formulario de contacto. Además, cuenta con un sistema de registro de errores y una simulación de carga de archivos a la nube.

El proyecto está conectado a los servicios en la nube de Firebase para la autenticación de usuarios, la base de datos (Firestore), y el registro de errores.

Cumplimiento de los Requisitos del Examen

A continuación se detalla cómo el proyecto cumple con los requisitos solicitados en la pauta del examen.

Ejercicio 1: Componentes y Lógica de React

Creación de Componentes Padre/Hijo: Se desarrolló un componente `ProductList` (padre) que renderiza múltiples instancias del componente `ProductItem` (hijo).
Listado con `map()`: Se utiliza la función `map()` para mostrar la lista de productos de forma dinámica.
Comunicación (Props y Callbacks):** Se envían datos del padre al hijo a través de `props`, y el hijo notifica al padre para añadir productos al carrito mediante una función de `callback`.
Gestión de Estado: El estado del carrito de compras se gestiona eficientemente utilizando el hook `useState` en el componente principal `App.jsx`.

Ejercicio 2: Formulario y Base de Datos

Formulario en React: Se creó un formulario de contacto funcional (`ContactForm.jsx`).
Validación de Datos: Se utilizó la librería `react-simple-validator` para validar los campos del formulario antes de enviarlos.
Conexión con Firestore: La aplicación está conectada a una base de datos de Firestore, y el formulario guarda la información directamente en la colección `contactos`.

Ejercicio 3: Estilos y Funcionalidades Avanzadas

Estilización con Bootstrap: Toda la interfaz de la aplicación, incluyendo tarjetas de productos, formularios y layout general, fue estilizada usando Bootstrap para un diseño limpio y responsivo.
Implementación de Firebase Auth: Se implementó un sistema completo de autenticación que permite a los usuarios registrarse, iniciar sesión y cerrar sesión.
Implementación de Firebase Storage (Adaptada): Se cumplió el espíritu del requisito a través de una solución alternativa, por favor ver la nota a continuación.
Registro de Errores en la Nube: Como funcionalidad adicional, se implementó un sistema que captura los errores de la aplicación y los guarda en una colección de Firestore (`app_errors`) para facilitar la depuración.


Nota Importante sobre Firebase Storage

No se pudo realizar la implementación de Firebase Storage ya que había una barrera de tarjeta, o sea, debía existir una cuenta para pagar para poder utilizarlo, por lo cual se optó por una solución alternativa que consiste en simular la carga de archivos guardando sus metadatos (nombre, tamaño, tipo) en una colección de la base de datos Firestore, demostrando así la capacidad de manejar la lógica de carga de archivosa pesar de no implementarlo en si.

Nota sobre la Compilación para Móvil (APK)

La preparación del proyecto para la compilación móvil con Cordova se inició, pero no se completó. Debido a problemas complejos con la configuración del entorno de desarrollo local de Android (Gradle y herramientas de línea de comandos del SDK) y para priorizar la entrega de una aplicación web completamente funcional en el tiempo que fue dado, se decidió detener el proceso en esta fase

Cómo Ejecutar el Proyecto

Sigue estos pasos para ejecutar el proyecto en un entorno de desarrollo.


Instalación

1.  Clona o descarga este repositorio.
2.  Abre una terminal en la raíz de la carpeta `proyectos-app`.
3.  Instala las dependencias del proyecto con el siguiente comando:
    ```bash
    npm install
    ```
    
Ejecución en Modo Desarrollo

1.  Una vez instaladas las dependencias, ejecuta el siguiente comando en la misma terminal:
    ```bash
    npm run dev
    ```
2.  La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique la terminal).

Muchas gracias por su atención profesor.