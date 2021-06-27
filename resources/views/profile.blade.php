<html>
    <head>
        <link rel='stylesheet' href='{{ url("css/profile.css") }}'>
        <link rel='stylesheet' href='{{ url("css/songs.css") }}'>
        <script src = '{{ url("js/profile.js") }}' defer></script>
        <script src = '{{ url("js/home.js") }}' defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Musity - {{ $user->name }} {{ $user->surname }}</title>
    </head>

    <body>
    <div id="overlay">
    </div>
    <div id="loader" class="hidden"></div>
        <header>
            <nav>
                <div class="nav-container">
                    <div id="logo">
                         Musity
                    </div>
                    <div id="links">
                        <a href="{{ route('home') }}">HOME</a>
                        <div id="separator"></div>
                        <strong>PROFILO</strong>
                        <a href="{{ route('logout') }}" class='button'>LOGOUT</a>
                    </div>
                    <div id="menu">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div class="user">
                    <div class="avatar" style="background-image: url({{ $user->propic == null ? asset('images/default_avatar.png') : asset('images/' . $user->propic) }})">
                    </div>
                    <div class="userInfo">
                        <p>PROFILO</p>
                        <h1>{{ $user->name }} {{ $user->surname }}</h1>
                        <div class="numSongs"><p>Brani preferiti</p></div>
                    </div>
                    <div class="userStats">
                      <div class="statsCol1">
                        <div class="progStat"><p>Progressione più ascoltata</p></div>
                        <div class="keyStat"><p>Scala più ascoltata</p></div>
                      </div>
                      <div class="statsCol2">
                        <div class="energyStat"><p>Energia media</p></div>
                        <div class="tempoStat"><p>Tempo medio</p></div>
                      </div>
                    </div>
                </div>              
            </nav>
        </header>

        <section class="container">
            <h2>I TUOI BRANI PREFERITI</h2>

            <div class="searchContainer">
              <span class="searchIcon"></span>
              <input type="text" id="searchSongs" placeholder="Cerca una canzone o un autore..">
            </div>
            
            <div id="results">
                
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
            <a href="{{ route('profile') }}">Il tuo profilo</a>
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