var L03_hexenkessel;
(function (L03_hexenkessel) {
    window.addEventListener("load", hanleLoad);
    function hanleLoad(_event) {
        console.log("Start");
        var form = HTMLDivElement = document.querySelector("div#form");
        var button = HTMLDivElement = document.querySelector("div#button");
        form.addEventListener("change", handleChange);
        button.addEventListener("click", submitTrank);
    }
    function handleChange() {
        console.log("Change");
        var display = document.querySelector("div#display");
        display.innerHTML = "";
        var formData = new FormData(document.forms[0]);
        for (var _i = 0, formData_1 = formData; _i < formData_1.length; _i++) {
            var entry = formData_1[_i];
            var trank = document.querySelector("[value='" + entry[1] + "']");
            var price = Number(trank.getAttribute("price"));
            display.innerHTML += trank.name + "  Galleone" + price;
        }
    }
    function submitTrank() {
        console.log("Submit");
        var reset = document.querySelector("form#myForm");
        reset.innerHTML = "";
        alert("Danke für deinen Zaubertrank");
    }
})(L03_hexenkessel || (L03_hexenkessel = {}));
