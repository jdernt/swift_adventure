document.addEventListener('DOMContentLoaded', function(){

  const headerLogin = document.querySelector('.header__login');
  const modalLogin = document.querySelector('.modal__login');
  const modalAuth = document.querySelector('.modal__auth');


  document.querySelector('.auth').addEventListener('click', function(e){
    e.preventDefault();

    modalAuth.classList.toggle('hidden');
    modalLogin.classList.toggle('hidden');

  });

  document.querySelector('.login').addEventListener('click', function(e){
    e.preventDefault();

    modalAuth.classList.toggle('hidden');
    modalLogin.classList.toggle('hidden');

  });

  // вызов модального окна

  const modalWindow = document.querySelector('.modal');

  headerLogin.addEventListener('click', function(){
    modalWindow.style.display = 'block';
    document.body.classList.add('no__scroll');
  });

	modalWindow.addEventListener('click', function(event){
    if(event.target == modalWindow) {
      modalWindow.style.display = 'none';
      document.body.classList.remove('no__scroll');
    };
  });



});