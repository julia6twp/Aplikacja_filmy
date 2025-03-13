## Endpointy

Wszystkie klasy, które wysyłają requesty znajdują się w package -- controller --

### Klasa HelloTest
Jest to klasa, która zawiera testowy request.

### Klasa JustWatchController
Klasa zawiera wszystkie requesty używające API:

- getFilm - nie używać lepiej, zwraca najróżniejsze informacje o filmie, ale po wpisaniu
jego kodu ID
- searchFilmBySearchTerm - zwraca informacje o filmie po wyszukaniu jego nazwy
- searchTopRankedFilms - zwracca ranking nalepiej ocenianych filmów 
- searchPopularFilms - zwraca ostatnio(chyba) najbardziej popularne filmy

### Klasa LoginController
Klasa zawiera wszystykie requesty związane z operacjami na koncie uzytkownika:

- registerUser
- loginUser
- changePassword
- changeUsername
- resetPassword

### Klasa UserController
Klasa do zarządzania użytkownikami przez admina:
- getUsers
- createUser

### MailController
Klasa zawiera requesty, które zajmują się wysyłaniem maili:

- sendMail - wysyła kod weryfyikacyjny
- verifyCode - sprawdz kod i konto uzytkownika otrzymuje status "zweryfikowany"
- verifyCodeForResetPassword - sprawdza kod do resetu hasła
