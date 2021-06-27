<html>
    <head>
        <link rel='stylesheet' href='{{ url("css/login.css") }}'>

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Accedi - Musity</title>
    </head>
    <body>
        <div id="logo">
            Musity
        </div>
        <main class="login">
        <section class="main">
            <h5>Per continuare, accedi a Musity.</h5>
            
            @if (isset($old_username))
                <p class='error'>Username e/o password errati.</p>
            @endif

            <form name='login' method='post' action="{{ route('login') }}">
                @csrf
                <!-- Seleziono il valore di ogni campo sulla base dei valori inviati al server via POST -->
                <div class="username">
                    <label for='username'>Indirizzo e-mail o username</label>
                    <input type='text' name='username' value='{{ $old_username }}'>
                </div>
                <div class="password">
                    <label for='password'>Password</label>
                    <input type='password' name='password'>
                </div>
                <div class="submit-container">
                    <div class="remember">
                        <input type='checkbox' checked name='remember' value="1">
                        <label for='remember'>Ricordami</label>
                    </div>
                    <div class="login-btn">
                        <input type='submit' value="ACCEDI">
                    </div>
                </div>
            </form>
            <div class="signup"><h4>Non hai un account?</h4></div>
            <div class="signup-btn-container"><a class="signup-btn" href="{{ route('register') }}">ISCRIVITI A MUSITY</a></div>
        </section>
        </main>
    </body>
</html>