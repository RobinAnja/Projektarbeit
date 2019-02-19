function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.value.match(mailformat))
{
document.form1.Email.focus();
return true;
}
else
{
alert("Die Email-Adresse ist nicht korrekt!");
document.form1.Email.focus();
return false;
}
}