<html>
  <head>
    <title>Musity</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href='{{ url("css/home.css") }}'>
    <link rel="stylesheet" href='{{ url("css/songs.css") }}'>
    <script src = '{{ url("js/search.js") }}' defer></script>
    <script src = '{{ url("js/home.js") }}' defer></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
  </head>
  
  <body>
    <div id="overlay">
    </div>
    <div id="loader" class="hidden"></div>
    <header>
      <nav>
        <div id="logo">
          Musity
        </div>
        <div id="links">
          <strong>HOME</strong>
          <div id="separator"></div>
          <a href="{{ route('profile') }}">PROFILO</a>
          <a href="{{ route('logout') }}" class='button'>LOGOUT</a>
        </div>
        <div id="menu">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
      <h1>Esplora i segreti della tua musica preferita</h1>
      <a class="subtitle">
        Con Musity puoi trovare le informazioni in ambito musicale che hai sempre cercato
      </a>
    </header>

    <section id="search">
      <div class="subtitle2">
        <h2>Salva le canzoni che preferisci sul tuo profilo</h2>
        <p>Aggiungi le progressioni di accordi delle canzoni che conosci per aiutare gli altri utenti</p>
      </div>
      <form>
        <div class="search">
          <span class="searchIcon"></span>
          <input type='text' name="search" class="searchBar" placeholder="Cerca una canzone o un autore..">
          <input type="submit" value="Cerca">
        </div>
      </form>
      
    </section>
    <section class="container">

            <div id="results">
            @if(isset($response))
                {{ $response }}
            @endif
            </div>
    </section>
    <footer>
      <nav>
        <div class="footer-container">
          <div class="footer-col">
            <h1>Musity</h1>
            <p>Gabriele Patanè</p>
            <p>O46001415</p>
          </div>
          <div class="footer-col">
            <strong>ACCOUNT</strong>
            <a href='profile.php'>Il tuo profilo</a>
            <a href="{{ route('logout') }}">Logout</a>
          </div>
          <div class="footer-col">
            <strong>LINK UTILI</strong>
            <a href="https://github.com/gabrielepatane/hw1" target="_blank">GitHub</a>
          </div>
          <div class="footer-col">
            <a id="home" href="{{ route('home') }}">Torna alla Home</a>
          </div>
        </div>
      </nav>
    </footer>
  </body>
  </html>