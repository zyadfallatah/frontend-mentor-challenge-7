import 'tailwindcss/tailwind.css';
import ImageSlider from "../components/imageSlider"
import CartProduct from "../components/cartProduct";


const mobileToggleMenu = () => {
  const menu = document.querySelector("#menu") as HTMLImageElement;
  const closeMenu = document.querySelector("#close-menu") as HTMLImageElement;
  const navLinks = document.querySelector("#mobile-nav") as HTMLElement;

  menu.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  })

  closeMenu.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  })
}

mobileToggleMenu()

const sliding = (
  props: {prev: string, next: string, dest?: string, providedImages?: string}, 
  callback: (dest: HTMLImageElement, nextSrcState: string, e?: Event) => void
) => {

  let destImage = document.querySelector("#current-image") as HTMLImageElement;

  if (props.dest)
    destImage = document.querySelector(props.dest) as HTMLImageElement;

  let getImages = document.querySelector("#provided-images")!.children as HTMLCollection;
  
  if (props.providedImages)
    getImages = document.querySelector(props.providedImages)!.children as HTMLCollection;

  const imageSlider = new ImageSlider(getImages);

  const prevButton = document.querySelector(props.prev) as HTMLImageElement;
  const nextButton = document.querySelector(props.next) as HTMLImageElement;

  for (let i = 0; i < getImages.length; i++) {
    const image = getImages[i] as HTMLImageElement;
    image.addEventListener("click", (e) => {
      imageSlider.changeCurrentStyle("border", 'remove');
      imageSlider.changeCurrentStyle("border-orange", 'remove');
      imageSlider.changeCurrentStyle("opacity-70", 'remove');
      
      imageSlider.setCurrentSrc = image.src;
      callback(destImage, imageSlider.getCurrentSrc , e)

      imageSlider.changeCurrentStyle("border", 'add');
      imageSlider.changeCurrentStyle("border-orange", 'add');
      imageSlider.changeCurrentStyle("opacity-70", 'add')

    })
  }

  prevButton.addEventListener("click", (e) => {
    imageSlider.changeCurrentStyle("border", 'remove');
    imageSlider.changeCurrentStyle("border-orange", 'remove');
    imageSlider.changeCurrentStyle("opacity-70", 'remove')

    callback(destImage, imageSlider.prev(),e);

    imageSlider.changeCurrentStyle("border", 'add');
    imageSlider.changeCurrentStyle("border-orange", 'add');
    imageSlider.changeCurrentStyle("opacity-70", 'add')
  })

  nextButton.addEventListener("click", (e) => {
    imageSlider.changeCurrentStyle("border", 'remove');
    imageSlider.changeCurrentStyle("border-orange", 'remove');
    imageSlider.changeCurrentStyle("opacity-70", 'remove')

    callback(destImage, imageSlider.next(),e);

    imageSlider.changeCurrentStyle("border", 'add');
    imageSlider.changeCurrentStyle("border-orange", 'add');
    imageSlider.changeCurrentStyle("opacity-70", 'add')
  })
}

// Mobile
sliding({prev: "#prev-button", next: "#next-button"}, (destImage, nextState) => {
  destImage.src = nextState;
})

// Overlay
sliding(
  { 
    prev: "#prev-button-desk", 
    next: "#next-button-desk", 
    dest: "#current-image-desk",
    providedImages: "#provided-images-desk"
  }, 
  (destImage, nextState) => {
  destImage.src = nextState;
})

sliding(
  { 
    prev: "#prev-button", 
    next: "#next-button", 
    dest: "#current-image-desk",
    providedImages: "#provided-images"
  }, 
  (destImage, nextState) => {
  destImage.src = nextState;
})


const images = document.querySelector("#provided-images")!.children as HTMLCollection;

for (let i = 0; i < images.length; i++) {
  const img = images[i];
  img.addEventListener("click", () => {
    const overlay = document.querySelector("#overlay") as HTMLDivElement;
    
    overlay.classList.remove("hidden");
    overlay.classList.remove("-z-50");
    overlay.classList.add("grid");
  
    if (overlay.classList.contains("max-w-10"))
      overlay.classList.remove("max-w-10")
  })
}



const productAmount = () => {
  const increment = document.querySelector("#increment") as HTMLImageElement;
  const decrement = document.querySelector("#decrement") as HTMLImageElement;
  const amount = document.querySelector("#amount") as HTMLParagraphElement;


  increment.addEventListener("click", () => {
    if (Number.parseInt(amount.innerText) === 10) return;
    amount.innerHTML = `${(Number.parseInt(amount.innerText) + 1)}`;
  })

  decrement.addEventListener("click", () => {
    if (Number.parseInt(amount.innerText) === 0) return;
    amount.innerHTML = `${(Number.parseInt(amount.innerText) - 1)}`;
  })
}

productAmount()


const toggleCart = function() {
  const cart = (document.querySelector("#products") as HTMLDivElement).parentElement as HTMLDivElement;
  const cartIcon = document.querySelector("#cart-icon") as HTMLImageElement;

  cartIcon.addEventListener("click", () => {
    cart.classList.toggle("translate-y-20")
    cart.classList.toggle("-z-50")
    cart.classList.toggle("opacity-0")
    
    cart.classList.toggle("z-50")
  })
}

toggleCart();

const productAppend = () => {
  const products = document.querySelector("#products") as HTMLDivElement;
  const image = document.querySelector("#current-image") as HTMLImageElement;
  const price = document.querySelector("#price") as HTMLParagraphElement;
  const addProductButton = document.querySelector("#add-product") as HTMLButtonElement;

  addProductButton.addEventListener("click", () => {
    const amount = document.querySelector("#amount") as HTMLParagraphElement;
    const cartIcon = document.querySelector("#cart-icon") as HTMLImageElement;

    if (Number.parseInt(amount.innerText) === 0) return;

    const cart = products.parentElement as HTMLElement;

    if (products.children.length !== 1) {
      const productWrapper = products.children[0] as HTMLDivElement;
      new CartProduct(image, Number.parseInt(price.innerText.slice(1)), Number.parseInt(amount.innerText))
        .createElementAt(productWrapper);
        if (cart.classList.contains("opacity-0"))
          cartIcon.click()
      return;
    }
    
    cart.classList.remove("min-h-60");
    products.classList.remove("min-h-40");
    products.innerHTML = "";

    const productWrapper = document.createElement("div");
    productWrapper.id = "current-products";
    productWrapper.className = "w-full";
    products.append(productWrapper);
    products.append(CartProduct.checkoutButton());

    new CartProduct(image, Number.parseInt(price.innerText.slice(1)), Number.parseInt(amount.innerText)).createElementAt(productWrapper);
    
    if (cart.classList.contains("opacity-0"))
      cartIcon.click()
    cartIcon.nextElementSibling?.classList.remove("hidden");
    cartIcon.nextElementSibling?.classList.add("grid");
    (cartIcon.nextElementSibling as HTMLElement).innerHTML = `${amount.innerText}`
  })
}

productAppend();

(document.querySelector("#overlay-close") as HTMLImageElement).addEventListener("click", () => {
  const overlay = document.querySelector("#overlay") as HTMLDivElement;
  overlay.classList.add("hidden")
  overlay.classList.add("-z-50")
})
  