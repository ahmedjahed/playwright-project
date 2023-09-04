export class RegisterPageObjects {
    FirstName_Input_Selector = `#firstName`
    LastName_Input_Selector = `#lastName`
    Email_Input_Selector = `#userEmail`
    PhoneNumber_Input_Selector = `#userMobile`
    Password_Input_Selector = `#userPassword`
    ConfirmPassword_Input_Selector = `#confirmPassword`
    Gender_RadioBtn_Selector = `[formcontrolname='gender']`
    Occupation_DropDown_Selector = `[formcontrolname='occupation']`
    Required_Checkbox_Selector = `[formcontrolname='required']`
    Register_Btn_Selector = `#login`
    Required_Fields_ErrorMsg_Selector=`.invalid-feedback`
    Checkbox_Required_ErrorMsg_Selector=`text=*Please check above checkbox`
    ErrorMsg_Toast_Selector=`#toast-container`
}