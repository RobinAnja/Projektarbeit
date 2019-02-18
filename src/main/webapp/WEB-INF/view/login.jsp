<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<html>
<head>
 <meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title> ANMELDUNG </title>
  <link href="css/styles.css" rel="stylesheet">
  <link href="css/styles2.css" rel="stylesheet">
	<body>
  <form class="form" action="/findByUsername" method="GET" action="/">
    <img src="../../images/osi.jpg" class="learning">
	 <h2> FunTestic</h2>
       <h1>Anmelden</h1>
	   <div>
         <p><input type="text" placeholder="Benutzername" name="name" id="name" value=""></p>
         <p><input type="password" placeholder="Passwort" name="password" id="password" value=""></p>
         <input type="submit" name="" value="Anmelden">
         <a href="passwortVergeseen.html">Kennwort vergessen?</a><br>
         <a href="registrieren.html">Noch nicht registriert?</a>
       </div>

 </form>
 <script src="js/login.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</body>
</html>