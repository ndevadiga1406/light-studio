//------ Start NavBar Active class --------
$(document).on('click', 'ul li', function () {
    $(this).addClass('active').siblings().removeClass('active')
});

//-------End NavBar Active class ------


//-------Start Contact Page Submit Form-------

function contactSubmit(form) {
    let name= form.name.value;
    let email=form.email.value;
    let message=form.message.value;
    let valemail= validateEmail(email);

    if ( name != "" && message != "" &&  validateEmail(email))
    {
        let subject="Contact Us Form";
        let body = "Name : "+ name + "%0D%0A" + "E-mail : " + email + "%0D%0A %0D%0A" + message;
        window.location.href = "mailto:light-studio@xyz.com?subject="+subject+"&body="+body;
        
    }
    else{
        $('#failModal').click();
    }
}


function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}
  

//-------End Contact Page Submit Form-------


//-------Start Login Page Redirection-------

function loginOnload(){
    $('#login-fail-alert').hide();
    $('#login-success-alert').hide();
    $('.spinner-border').hide();
}

function loginClick(form) {
    let email = form.email.value;
    let pass = form.pass.value;
    console.log(email)
    if (email === "admin@admin.com" && pass === "123456") {
        $('.form-cover').hide();
        $('#login-success-alert').show();
        setTimeout(loginSuccess, 1500);
    } else {
        $('.form-cover').hide();
        $('#login-fail-alert').show();
        setTimeout(loginFail, 2000);

    }
}

function loginSuccess() {
    $('#login-success-alert').hide();
    $('.spinner-border').show();
    setTimeout(successRedirect, 1500)
}

function loginFail() {
    $('#login-fail-alert').hide();
    $('.spinner-border').show();
    setTimeout(failRedirect, 500)
}


function successRedirect() {
    window.location.href = "index.html";
}

function failRedirect() {
    window.location.href = "login.html";
    form.email.value = "";
    form.pass.value = "";
    $('#login-fail-alert').show();
}

//-------End Login Page Redirection-------

//-------Start Cart Page--------------------



function minusClick(form) {
    sessionStorage.setItem("currentSelect", form.id.value);
    let current_items_no = parseInt(form.items.value);
    let new_items_no = current_items_no - 1;
    if (new_items_no <= 0) {
        $('#modalClick').click();
    }
    form.items.value = new_items_no.toString();
}

function plusClick(form) {
    sessionStorage.setItem("currentSelect", form.id.value);
    let current_items_no = parseInt(form.items.value);
    let new_items_no = current_items_no + 1;
    form.items.value = new_items_no.toString();
    cartLoad()
}


function cartAlertNo() {
    let currentSelection = sessionStorage.getItem("currentSelect");
    console.log(currentSelection);
    let input1 = $('.id').filter(function () {
        return $(this).val() === currentSelection;
    }).next().children().next();
    input1.val(1);
    cartLoad()
}

function cartAlertYes() {
    let currentSelection = sessionStorage.getItem("currentSelect");
    $('.id').filter(function () {
        return $(this).val() === currentSelection;
    }).parent().parent().parent().fadeOut()
    cartLoad()
}

function removeCart(currentSelected) {
    let current_items_no = parseInt($(currentSelected).parent().siblings().next().next().children().children()[0].value);
    console.log(current_items_no);
    sessionStorage.setItem("deleteSelect", current_items_no);
    $('#removeClick').click();

}

function cartAlertNoDirect() {
    let currentSelection = sessionStorage.getItem("deleteSelect");
    let input1 = $('.id').filter(function () {
        return $(this).val() === currentSelection;
    }).next().children().next();

}

function cartAlertYesDirect() {
    let currentSelection = sessionStorage.getItem("deleteSelect");
    $('.id').filter(function () {
        return $(this).val() === currentSelection;
    }).parent().parent().parent().fadeOut()
    let input1 = $('.id').filter(function () {
        return $(this).val() === currentSelection;
    }).next().children().next();
    input1.val(0)
    cartLoad()
}


function cartLoad() {
    var totalcost = 0;
    const priceBucket = $('h4').children().map(function () {
        return this.innerHTML;
    }).get();
    const itemsBucket = $('.total-item').map(function () {
        return this.value;
    }).get();
    const calculate = [];
    for (i = 0; i < Math.min(priceBucket.length, itemsBucket.length); i++) {
        calculate[i] = parseInt(priceBucket[i]) * parseInt(itemsBucket[i]);
    }

    for (i = 0; i < calculate.length; i++) {
        var j = calculate[i];
        totalcost += j;
    }
    console.log(totalcost);

    $('#cost-price').children()[0].innerHTML = totalcost;
    let costPrice = parseInt($('#cost-price').children()[0].innerHTML);
    let shippingPrice = parseInt($('#shipping-price').children()[0].innerHTML);
    let totalPrice = costPrice + shippingPrice;
    $('#total-price').children()[0].innerHTML = totalPrice;
}



// Women Product Page

function womenProductLoad() {
    $('#women-dresses-product').hide();
    $('#women-pant-product').hide();
    $('#women-skirt-product').hide();
    let type = sessionStorage.getItem("women-product-type");
    if (type == 'dresses') {
        $('#women-dresses-product').show();
    } else if (type == 'pant') {
        $('#women-pant-product').show();
    } else if (type == 'skirt') {
        $('#women-skirt-product').show();
    } else {
        $('#women-dresses-product').show();
        $('#women-pant-product').show();
        $('#women-skirt-product').show();
    }
}

function womenProduct(type) {
    sessionStorage.setItem("women-product-type", type);
    window.location.href = 'women-products.html';

}


// Women Product Page


function menProductLoad() {
    $('#men-shirt-product').hide();
    $('#men-pant-product').hide();
    $('#men-hoodie-product').hide();
    let type = sessionStorage.getItem("men-product-type");
    if (type == 'shirt') {
        $('#men-shirt-product').show();
    } else if (type == 'pant') {
        $('#men-pant-product').show();
    } else if (type == 'hoodie') {
        $('#men-hoodie-product').show();
    } else {
        $('#men-shirt-product').show();
        $('#men-pant-product').show();
        $('#men-hoodie-product').show();
    }
}

function menProduct(type) {
    sessionStorage.setItem("men-product-type", type);
    window.location.href = 'men-products.html';

}