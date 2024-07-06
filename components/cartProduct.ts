import deleteIcon from "../images/icon-delete.svg";

export default class CartProduct {
  private image: HTMLImageElement;
  private price: number;
  private amount: number;

  constructor(image: HTMLImageElement, price:number , amount: number) {
    this.image = image;
    this.price = price;
    this.amount = amount;
  }

  public createElementAt(element: HTMLElement) {
    const totalPrice = document.createElement("b");
    const totalPriceText = document.createTextNode(`$${this.price * this.amount}`);
    totalPrice.className = "text-very-dark-blue";
    totalPrice.appendChild(totalPriceText);

    const price = document.createElement("p");
    const priceText = document.createTextNode(`$${this.price} x ${this.amount}  `)
    price.className = "text-dark-grayish-blue space-x-2";
    price.appendChild(priceText);

    price.appendChild(totalPrice)

    const title = document.createElement("h3");
    const titleText = document.createTextNode((document.querySelector("#product-title") as HTMLHeadingElement).innerText);
    title.className = "text-dark-grayish-blue";
    title.appendChild(titleText)

    const dataWrapper = document.createElement("div")
    dataWrapper.className = "flex-1"
    dataWrapper.append(title)
    dataWrapper.append(price)

    const product = document.createElement("div");
    product.className = "flex items-center gap-4 py-3 w-full justify-self-start";

    const productImg = document.createElement("img");
    productImg.src = this.image.src;
    productImg.className = "max-w-10 rounded-md"

    const deleteImg = document.createElement("img")
    deleteImg.src = deleteIcon;
    deleteImg.className = "cursor-pointer ml-auto max-w-4 p-4";

    product.append(productImg);
    product.append(dataWrapper)
    product.append(deleteImg);

    element.append(product);

    deleteImg.addEventListener("click", () => {
      product.remove();

      if (element.children.length === 0)  {
        const parent = (element.parentElement as HTMLElement);
        const emptyHeading = document.createElement("h3");
        emptyHeading.className = "text-dark-grayish-blue font-bold";
        emptyHeading.append(document.createTextNode("Your Cart Is Empty"));

        parent.classList.add("min-h-40");
        parent.innerHTML = "";
        parent.append(emptyHeading);
      }
    });

  }

  public static checkoutButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = "font-bold bg-orange w-full rounded-md p-3 self-end mt-4";
    button.append(document.createTextNode("Checkout"));
    return button;
  }
}