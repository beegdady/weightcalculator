const BMI_HEADS = document.querySelectorAll(".bmi-head");
const BMI_SI = document.getElementById("bmi-si");
const BMI_USC = document.getElementById("bmi-usc");
const CALC_BTN = document.getElementById("calc-btn");
const CLR_BTN = document.getElementById("clr-btn");
let activeform;

 window.addEventListener("DOMContentLoaded", () => {
    BMI_SI.classList.add("show-bmi");
    activeform = "bmi-si";
 }); 

 

 CALC_BTN.addEventListener("click", perform_calc);

 CLR_BTN.addEventListener("click", () => {
    let forms = [...document.forms];
    forms.forEach(forms => forms.reset());
    clear();
 })

 
//  bmi calc change 
 BMI_HEADS.forEach(bmiHead => {
    bmiHead.addEventListener("click", () =>{
        if(bmiHead.id === "bmi-si-heads"){
            removeActiveClass();
            clear();
            bmiHead.classList.add("active-head");
            BMI_USC.classList.remove("show-bmi");
            BMI_SI.classList.add("show-bmi");
            activeform = "bmi-si";
        }
        if(bmiHead.id === "bmi-usc-heads"){
            removeActiveClass();
            clear();
            bmiHead.classList.add("active-head");
            BMI_SI.classList.remove("show-bmi");
            BMI_USC.classList.add("show-bmi");
            activeform = "bmi-usc";
        }
    });
 });


// remove active class 
function removeActiveClass(){
    BMI_HEADS.forEach(bmiHead => {
        bmiHead.classList.remove("active-head");
    });
};

function clear(){
    let forms = [...document.forms];
    forms.forEach(forms => forms.reset());
    document.getElementById("bmi-gender").innerHTML = "";
    document.getElementById("bmi-value").innerHTML = "";
    document.getElementById("bmi-category").innerHTML = "";
}
 
function perform_calc(){
    let BMI_info = getUserInfo();
    if(BMI_info){
        PrintResult(BMI_info)
    }
    
}

function CalcBmi(values){
    let bmi_result;

    if(activeform === "bmi-si"){
        bmi_result = ((values.weight) / Math.pow((values.height/100),2)).toFixed(2);
    }
    else{
        bmi_result = (((values.weight)/Math.pow((values.height))) * 703 ).toFixed(2);
    }
    return {gender: values.gender, bmi : bmi_result , age : values.age}
}

function getUserInfo(){
    let status;
     
    if(activeform === "bmi-si"){
        let age = document.getElementById("age1").value;
        let gender = document.querySelector("#bmi-si input[name = 'gender']:checked").value 
        let heightcm = document.getElementById("cm").value;
        let weightkg = document.getElementById("kg").value;
        status = CheckInputStatus([age,heightcm,weightkg]);

        if(status === true){
             return CalcBmi({
                gender,
                age : parseInt(age),
                height : parseFloat(heightcm),
                weight :parseFloat(weightkg)
            });
        }
    }

    if(activeform === "bmi-usc"){
        let age = document.getElementById("age2").value;
        let gender = document.querySelector("#bmi-usc input[name = 'gender']:checked").value 
        let heightfeet = document.getElementById("feet").value;
        let heightinches = document.getElementById("inches").value;
        let weightpd = document.getElementById("pounds").value;

        status = CheckInputStatus([age,heightfeet,heightinches,weightpd]);

        if(status === true){
            return CalcBmi({
                gender,
                age : parseInt(age),
                height : ((parseFloat(heightfeet) * 12 ) +parseFloat(heightinches)),
                weight : parseFloat(weightpd)
            });
        }
    }

    document.querySelector(".alert-error").style.display = "block";
    setTimeout(() => {
        document.querySelector(".alert-error").style.display= "none";
        },1000);
    return false;

}

function CheckInputStatus(inputs){
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].trim() === "" || isNaN(inputs[i] || !(Number.isInteger(i))))
        return false;
    }
    return true;
    
}

function PrintResult(BMI_info){
    document.getElementById("bmi-gender").innerHTML = BMI_info.gender;
    document.getElementById("bmi-value").innerHTML = `${BMI_info.bmi} Kg/m<sup>2</sup>`;
    let bmi_category;
    if(BMI_info.bmi < 18.5){
        bmi_category = "Underweight";
    }
    else if(18.5 < BMI_info.bmi < 25){
        bmi_category = "Healthy Weight";
    }
    else if(25 < BMI_info.bmi < 30){
        bmi_category = "Overweight";
    }
    else if(30 < BMI_info.bmi < 40){
        bmi_category = "Obesity";
    }
    else{
        bmi_category = "Class 3 Obesity"
    }
    document.getElementById("bmi-category").innerHTML = bmi_category

}