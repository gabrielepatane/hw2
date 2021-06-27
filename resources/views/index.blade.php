<html>
  <head>
    <title>Musity</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href='{{ url("css/home.css") }}'>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  
  <body>
    <header>
      <nav>
        <div id="logo">
          Musity
        </div>
        <div id="links">
          <strong>HOME</strong>
          <div id="separator"></div>
          <a href="{{ route('register') }}">ISCRIVITI</a>
          <a href="{{ route('login') }}" class='button'>ACCEDI</a>
          
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
            <a href="{{ route('login') }}">Il tuo profilo</a>
          </div>
          <div class="footer-col">
            <strong>LINK UTILI</strong>
            <a href="https://github.com/gabrielepatane/hw1" target="_blank">GitHub</a>
          </div>
        </div>
      </nav>
    </footer>
  </body>
  </html>