# Solución parcial para el challenge técnico de Zinli

### Escenario 3: “Aló! Yo aquí, allá quién?” 

Mutual TLS o Mutual Authentication es una implementación de seguridad que permite la comunicación entre pares través del uso de llaves privadas para garantizar que el intercambio de mensajes no se vea comprometido. 

¿Cómo se ve una implementación para Mutual TLS en una lambda escrita en node.js? 

¿Qué consideraciones adicionales deben ser señaladas respecto a la implementación de Mutual TLS? 

___

Para ejecutar la solución seguir los siguientes pasos:

```
$ yarn install
$ tsc
$ yarn start
```

En otro terminal se puede ejecutar un test para comprobar el funcionamiento

```
$ yarn test
```

Alternativamente se puede reemplazar el archivo certs/client.crt por otro invalido para probar un certificado invalido.

> En la carpeta certs se encuentran los certificados
> - ca.crt es el certificado root
> - server.crt y server.csr son los del servidor
> - client.crt es el certificado del cliente creado a partir del root, este solo se encuentra aqui para testeo.