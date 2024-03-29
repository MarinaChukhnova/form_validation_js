function nextSlide(parent,nextForm){
	parent.classList.add('innactive');
	parent.classList.remove('active');
	nextForm.classList.add('active');
	nextForm.classList.add('innactive');
}

function animatedForm() {
	const arrows = document.querySelectorAll('.fa-arrow-right');	

	arrows.forEach(arrow =>{
		arrow.addEventListener('click', () =>{
			const input = arrow.previousElementSibling;
			const parent = arrow.parentElement;
			const nextForm = parent.nextElementSibling;

			function NextSlide(){
				nextSlide(parent, nextForm);
				document.querySelector('.error').innerHTML ='';	
				document.querySelector('.error').style.border ='none';
			}

			//Check for validation
			if(input.type ==='text' && validateUser(input)){
				NextSlide();
			}else if(input.type ==='email' && validateEmail(input)){
				NextSlide();
			}else if(input.type ==='password'&& validatePassword(input)){
				NextSlide();
			}else{
				parent.style.animation ='shake 0.5s ease';
			}
			//get rid of animation
			parent.addEventListener('animationend',() => {
				parent.style.animation ='';
			});
		});	
	});
}

const validationName = /^[a-zA-Z ]*$/,
      validationEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      validationPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      PasswordError1 =/(?=.*[a-z])/,
      PasswordError2 =/(?=.*[A-Z])/,
      PasswordError3 =/(?=.*[0-9])/,
      PasswordError4 =/(?=.*[!@#\$%\^&\*])/,
      PasswordError5 =/(?=.{8,})/;
	  
const errorText = document.querySelector('.error');	

function errorTextStyle(){
	errorText.style.color = "white";
	errorText.style.border = "2px solid white";
	error('rgb(189,87,87)');
} 

function correctFillingStyle(){
	error('rgb(87,189,130)');
} 

function validateUser(user){
	if(user.value.length < 3 || validationName.test(user.value)===false){
		errorTextStyle();
		errorText.innerHTML = 'Enter a valid name!';
	}else {
		correctFillingStyle();
		return true;
	}
}

function validateEmail(email){
	if(validationEmail.test(email.value)){
		correctFillingStyle();
		return true;
	}else{
		errorText.innerHTML = 'Enter a valid email!';
		errorTextStyle();
	}
}

function validatePassword (password){
	if(validationPassword.test(password.value)){
		correctFillingStyle();
		return true;
	}else if (PasswordError1.test(password.value) === false || 
			  PasswordError2.test(password.value) === false ||
			  PasswordError3.test(password.value) === false){
		errorText.innerHTML = 'Your password is too simple.The password must contain at least 1 lowercase, uppercase and numeric alphabetical character.';
		errorTextStyle();
	}else if (PasswordError4.test(password.value)){
		errorText.innerHTML = 'Change your password.The string must contain at least one special character (!, @, #, $, %, ^, &, *).';
		errorTextStyle();
	}else if (PasswordError5.test(password.value) === false){
		errorText.innerHTML = 'Change your password.The string must be eight characters or longer!';
		errorTextStyle();
	}
}

function error(color){
	document.body.style.backgroundColor = color;
}

animatedForm();

//receiving form data
function receivingData (form) {
    if (!form || form.nodeName !== 'FORM') {
            return false;
    }
    let i, j, arrayDataForm = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === '') {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'tel':
                    case 'email':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        arrayDataForm.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                                arrayDataForm.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
                        }                                               
                        break;
                }
                break;
                case 'file':
                break; 
            case 'TEXTAREA':
                    arrayDataForm.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
                    break;
            case 'SELECT':
                switch (form.elements[i].type) {
                    case 'select-one':
                        arrayDataForm.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'select-multiple':
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                    arrayDataForm.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].options[j].value));
                            }
                        }
                        break;
                }
                break;
            case 'BUTTON':
                switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        arrayDataForm.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
                        break;
                }
                break;
            }
        }
    return arrayDataForm.join(' ');
}
 const sendForm = document.getElementById('send-form');
 const form  = document.getElementById('form');

 sendForm.onclick = function (event){
  	event.preventDefault();
  	console.log(receivingData(form));
  	sum();
  }

 /* Данная функция создаёт кроссбраузерный объект XMLHTTP */
  function getXmlHttp() {
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  }
  function sum() {
    var field_name = document.querySelector('.field-name').value; // Считываем значение a
    var field_email = document.querySelector('.field-email').value; // Считываем значение b
    var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
    xhr.open('POST', url, true); // Открываем асинхронное соединение
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
    xmlhttp.send("field_name=" + encodeURIComponent(field_name) + "&field_email=" + encodeURIComponent(field_email)); // Отправляем POST-запрос
    xmlhttp.onreadystatechange = function() { // Ждём ответа от сервера
      if (xmlhttp.readyState == 4) { // Ответ пришёл
        if(xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
          document.querySelector('.sum').innerHTML = xmlhttp.responseText; // Выводим ответ сервера
        }
      }
    };
  }