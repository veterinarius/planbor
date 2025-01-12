const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const deleteAccountButton=document.getElementById('deleteAccountButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');
const deleteAccountForm=document.getElementById('delete');


signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})
deleteAccountButton.addEventListener('click', function(){
    deleteAccountForm.style.display="block";
})