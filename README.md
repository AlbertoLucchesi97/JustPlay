# JustPlay
Applicazione TypeScript, Angular, Java con SQL Server
## Introduzione
JustPlay è un'applicazione web. 
Questa permette di consultare una lista di videogiochi, di fare una ricerca e di visualizzarne i dettagli in una scheda apposita. 
Da anonimi è possibile solo fare la ricerca e consultare le schede, mentre l'utente che ha fatto il login può anche accedere alla sua pagina personale e aggiungere i videogiochi nella Wishlist o nei Posseduti dalla scheda del videogioco. 
Inoltre, se l'utente ha fatto il login e dispone dei permessi, è possibile aggiungere videogiochi, modificarli e cancellarli.
## Tecnologie
- Typescript
- Angular 2
- Java 8
- SQL Server
## Setup
Nella repository è presente un docker compose, che si occuperà di far partire il progetto in maniera ottimale. Per avviare il progetto in questo modo è necessario avere Docker installato e poi aprire il terminale Powershell nella cartella generale della repository e scrivere "docker-compose up -d". In questo modo verranno scaricate automaticamente le immagini e il progetto verrà caricato nei container. Andando all'indirizzo "localhost" sul browser sarà possibile interagire con il progetto.
Per avviare il progetto manualmente senza l'utizzo di Docker, è necessario svolgere delle operazioni:
- Eseguire gli script .sql presenti nella cartella "scripts", in ordine: create_database, create_tables e poi gli altri 3 script che serviranno a popolare le tabelle.
- Aprire il progetto backendjava e, nel file "application.properties" presente in src/main commentare le righe #for docker use e decommentare quelle #for local use.
- Aprire il progetto frontendangular e nel file "auth_config.json" sostituire nel serverUrl "justplaybackend" con "localhost".
- Fare un npm install nei due progetti

Adesso non resta che avviare il backendjava scrivendo nel terminale aperto nella sua cartella: ./mvnw spring-boot:run e fare lo stesso col frontendangular scrivendo nel terminale: ng serve

#### Importante:
Per testare le funzioni da admin fare l'accesso con i seguenti dati: 
username: test@test.com
password: Test123@@
