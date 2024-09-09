# Laboratorio de Construcción de Software
## Trabajo Práctico Inicial
### Integrantes:
- Deget Mateo: degetmateo@gmail.com
- Elverdi Luana: luanaelverdi@gmail.com
- Morienega Melina: melimorienega@gmail.com

### Información Importante
 - El proyecto se encuentra en la nube: https://tpiniciallabo-f8dq.onrender.com/ 
 - Para probar localmente:
    - Crear un archivo .env en la ruta base del proyecto con las variables de entorno SERVER_HOST='tu_ip_ipv4':4000 (sin las comillas), POSTGRES_URL=dione-database-dione-database.g.aivencloud.com, POSTGRES_PORT=20971, POSTGRES_DB_NAME=laboratorio, POSTGRES_USERNAME=avnadmin, POSTGRES_PASSWORD=AVNS_uuX8W1GMNqqftUz7QtQ
    - Tanto la computadora como el dispositivo el cual escanean deben pertenecer a la misma red.
    - Si al intentar leer un código QR no se actualiza la página correspondiente, verifique si su antivirus confía en la red que los dispositivos están conectados (adjuntamos imagen con antivirus AVAST)
    - NodeJS v20.17.0 o superior ('npm i' para instalar las dependencias y 'npm run start' para iniciar el servidor)

### Imagen Antivirus

![Ejemplo](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/Antivirus.PNG)

### WBS

![WBS](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/diagrama_wbs.png)
### Diagrama Conceptual

![Conceptual](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/diagrama_conceptual.png)

### Diagrama Entidad-Relacion

![DER](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/diagrama_der.png)

### Modelo Relacional

![Modelo Relacional](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/modelo_relacional.png)

### Diagrama de Arquitectura

![Architecture Diagram](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/DiagramadeArquitectura.png)


#### Componentes:
 - UI Manager: Interfaz donde el usuario interactúa con el sistema.
 - Administrador de Artículos: Módulo encargado de la ALTA, BAJA, MODIFICACIÓN y LECTURA de los artículos.
 - Administrador de Categorias: Módulo encargado de la ALTA, BAJA, MODIFICACIÓN y LECTURA de las categorias.
 - Administrador de Sesiones: Módulo encargado del alta de los usuarios e inicio de sesión.
 - Visualizador de Códigos QR: Módulo encargado de la visualización de los códigos QR.

 #### Calendario:
 ![Calendario actual](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/calendario1.JPG)
 ![Calendario actual](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/calendario2.JPG)
  ![Calendario actual](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/calendario3.JPG)
 
 ### Grafico cards
![Grafico cards](https://github.com/luanaelverdi/TPInicialLabo/blob/entregable3/assets/graficocards.JPG)