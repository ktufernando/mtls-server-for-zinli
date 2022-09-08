# Solución parcial para el challenge técnico de Zinli

### Escenario 3: “Aló! Yo aquí, allá quién?” 

Mutual TLS o Mutual Authentication es una implementación de seguridad que permite la comunicación entre pares través del uso de llaves privadas para garantizar que el intercambio de mensajes no se vea comprometido. 

¿Cómo se ve una implementación para Mutual TLS en una lambda escrita en node.js? 

¿Qué consideraciones adicionales deben ser señaladas respecto a la implementación de Mutual TLS? 

___

Para ejecutar la solución seguir los siguientes pasos:

```
$ yarn install
$ yarn build
$ yarn start
```

En otro terminal se puede ejecutar un test para comprobar el funcionamiento

```
$ yarn test
```

En la carpeta certs se encuentran los certificados a modo de comprender que son necesarias para su funcionamiento.

- `RootCA.pem` es el certicado para configurar en "Custom domain names" dentro de Api Gateway para la implementación de Mutual TLS authentication en AWS

- `my_client.pem` y `my_client.key` son los archivos clientes que se envian en el request a la lambda solicitada. API Gateway los validará, si estos son validos, pasará la información a la Lambda agregando el objeto authentication dentro del requestContext:


        "authentication": {
            "clientCert": {
                "clientCertPem": "-----BEGIN CERTIFICATE-----\nMIIEZTCCAk0CAQEwDQ...",
                "issuerDN": "C=US,ST=Washington,L=Seattle,O=Amazon Web Services,OU=Security,CN=My Private CA",
                "serialNumber": "1",
                "subjectDN": "C=US,ST=Washington,L=Seattle,O=Amazon Web Services,OU=Security,CN=My Client",
                "validity": {
                    "notAfter": "Aug  5 00:28:21 2120 GMT",
                    "notBefore": "Aug 29 00:28:21 2020 GMT"
                }
            }
        }


### CI/CD

Este repositorio usa Github Actions como pipeline de CI/CD.
El pipeline realiza el deploy en AWS, utilizando el cli SAM y Cloud Formation. 
Asi mismo, el resultado termina siendo un despliegue de una función Lambda con su trigger de Api Gateway.