export class CartPageObjects{
    Cart_Item_Selector=`.cart li`
    Product_Name_Selector=`.cart h3`
    Buy_Now_Btn_Selector=`button:has-text("Buy Now")`
    Delete_Btn_Selector=`.btn-danger`
    No_Cart_Test_Selector=`h1:has-text("No Products in Your Cart !")`
    ContinueShopping_Btn_Selector=`[type="button"][routerlink="/dashboard"]`
    Product_Price_Selector=`.prodTotal p`
    Checkout_Btn_Selector=`button:has-text("Checkout")`
}