export class HomePageObjects{
    Search_Input_Selector=`[formcontrolname='productName']:visible`
    MinimumPrice_Input_Selector=`[formcontrolname='minPrice']:visible`
    MaximumPrice_Input_Selector=`[formcontrolname='maxPrice']:visible`
    ErrorMsg_Toast_Selector = `#toast-container`
    Product_Name_Selector = `.card-body b`
    Product_Item_Selector=`div .card`
    View_Btn_Selector = `button:has-text("View")`
    AddToCart_Btn_Selector = `button:has-text("Add To Cart")`
    Product_Add_To_Cart_Toast_Msg_Selector=`#toast-container`   
    }
