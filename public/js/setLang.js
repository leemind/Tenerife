function setLang(language) {
	console.log("Client Side setLang: Selected Language",language);
	var request = new XMLHttpRequest(); 
	request.open("GET","setLang?"+language,true);
	request.send();
	location.reload();
}