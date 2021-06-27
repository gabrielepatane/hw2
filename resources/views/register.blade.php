<html>
    <head>
        <link rel='stylesheet' href='{{ url("css/register.css") }}'>
        <script src = '{{ url("js/register.js") }}' defer></script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">

        <title>Iscriviti - Musity</title>
    </head>
    <body>
        <div id="logo">
            Musity
        </div>
        <main>
        <section class="main_left">
        </section>
        <section class="main_right">
            <h1>Iscriviti gratuitamente per conoscere la tua musica preferita</h1>
            @if (isset($old_username))
                <div class='error'>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach 
                </div>
            @endif
            <form name='signup' method='post' action="{{ route('register') }}" enctype="multipart/form-data">
                @csrf
                <div class="names">
                    <div class="name">
                        <label for='name'>Nome</label>
                        <!-- Se il submit non va a buon fine, il server reindirizza su questa stessa pagina, quindi va ricaricata con 
                            i valori precedentemente inseriti -->
                        <input type='text' name='name' value='{{ $old_name }}'>
                        <div><img src="./icons/close.svg"/><span>Devi inserire il tuo nome</span></div>
                    </div>
                    <div class="surname">
                        <label for='surname'>Cognome</label>
                        <input type='text' name='surname' value='{{ $old_surname }}' >
                        <div><img src="./icons/close.svg"/><span>Devi inserire il tuo cognome</span></div>
                    </div>
                </div>
                <div class="username">
                    <label for='username'>Nome utente</label>
                    <input type='text' name='username' value='{{ $old_username }}'>
                    <div><img src="./icons/close.svg"/><span>Nome utente non disponibile</span></div>
                </div>
                <div class="email">
                    <label for='email'>Email</label>
                    <input type='text' name='email' value='{{ $old_email }}'>
                    <div><img src="./icons/close.svg"/><span>Indirizzo email non valido</span></div>
                </div>
                <div class="password">
                    <label for='password'>Password</label>
                    <input type='password' name='password'>
                    <div><img src="./icons/close.svg"/><span>Inserisci almeno 8 caratteri</span></div>
                </div>
                <div class="password_confirmation">
                    <label for='password_confirmation'>Conferma Password</label>
                    <input type='password' name='password_confirmation'>
                    <div><img src="./icons/close.svg"/><span>Le password non coincidono</span></div>
                </div>
                <div class="fileupload">
                    <label for='avatar'>Scegli un'immagine profilo</label>
                        <input type='file' name='avatar' accept='.jpg, .jpeg, image/gif, image/png' id="upload_original">
                    <span>Le dimensioni del file superano 7 MB</span>
                </div>
                <div class="allow"> 
                    <input type='checkbox' name='allow' value="1">
                    <label for='allow'>Accetto i termini e condizioni d'uso di Musity.</label>
                </div>
                <div class="submit">
                    <input type='submit' value="Registrati" id="submit">
                </div>
            </form>
            <div class="signup">Hai un account? <a href="{{ route('login') }}">Accedi</a>
        </section>
        </main>
    </body>
</html>