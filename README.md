# AutomobileToBuyer

AutomobileToBuyer je web aplikacija koja omogućuje kupovinu i prodaju automobila.

## Funkcionalnosti

### Administrator
-Pregled i banovanje korisnika uz obrazloženje<br>
-Pregled, pretraga, sortiranje, odobravanje novih i brisanje prijavljenih oglasa<br>
-Pregled i brisanje komentara<br>
-Pregled i odobravanje/odbijanje zahteva za boost-ovanje oglasa<br>
-Boost-ovanje oglasa; boost-ovani oglasi se prikazuju na vrhu liste oglasa<br>
-Informacije o oglasima (Top 10 automobila, najpopularnije marke, modeli)<br>

### Registrovani korisnik
-Pregled, pretraga i sortiranje oglasa<br>
-CRUD nad oglasima<br>
-Praćenje oglasa; korisnik dobija obaveštenje preko E-maila da je oglas izmenjen ili sklonjen<br>
-Slanje zahteva za boost-ovanje oglasa administratoru<br>
-Ocena i komentarisanje automobila, prijava nepoželjnih komentara<br>
-Prijava oglasa kao nepoželjnih<br>
-Aktivacija naloga preko E-maila<br>

### Neregistrovani korisnik
-Pregled oglasa, pretraga i sortiranje oglasa<br>
-Registracija<br>

### Arhitektura

Mikroservis za korisnike - upravlja autorizacijom i autentifikacijom korisnika - Go, PostgreSQL baza<br>
Mikroservis za oglase - upravlja oglasima - Go, PostgreSQL baza<br>
Mikroservis za automobile - upravlja podacima o automobilima - Go, PostgreSQL baza<br>
Mikroservis za e-mail - upravlja e-mail notifikacijama - Go, PostgreSQL baza<br>
Mikroservis za statistiku - dobavlja različite izveštaje, poput top 10 modela - Rust, PostgreSQL baza<br>
Mikroservis za komentare i ocene - upravlja komentarima i ocenama - Rust, PostgreSQL baza<br>
Klijentska aplikacija koja komunicira sa API gateway-om - React
