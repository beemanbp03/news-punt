const showPassword = () => {
    let field = document.getElementById("password");
    if (field.type === "password") {
        field.type = "text";
        //console.log(field.type);
    } else {
        field.type = "password";
        //console.log(field.type);
    }
}