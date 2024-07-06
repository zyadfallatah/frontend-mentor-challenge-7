type LinkedListNode = {
  value: HTMLImageElement,
  next: LinkedListNode| null,
  prev: LinkedListNode | null
}

class ImageSlider {
  private head: LinkedListNode | null;
  private current: LinkedListNode | null = null;
  private lastElement: LinkedListNode | null;

  constructor(images: HTMLCollection) {
    this.head = null;
    this.lastElement = null;
    for (let i = 0; i < images.length; i++) {
      this.push(images[i] as HTMLImageElement);
    }
    this.current = this.head;
  }

  private newNode(value: HTMLImageElement): LinkedListNode {
    return { value, next: null, prev: null };
  }

  public set setCurrentSrc(src: string) {
    while (this.current?.value.src !== src) {
      this.current = (this.current as LinkedListNode).next;
    }
  }
  
  private push(value: HTMLImageElement): void {
    const newNode = this.newNode(value);
    if (!this.head) {
        newNode.next = newNode;
        newNode.prev = newNode;
        this.head = newNode;
        this.lastElement = newNode;
        return;
    }
      newNode.next = this.head;
      newNode.prev = this.lastElement;
      (this.lastElement as LinkedListNode).next = newNode;
      this.head.prev = newNode;
      (this.lastElement as LinkedListNode) = newNode;
  }

  public next(): string {
    this.current = (this.current as LinkedListNode).next;
    return (this.current as LinkedListNode).value.src;
  }

  public prev(): string {
    this.current = (this.current as LinkedListNode).prev;   
    return (this.current as LinkedListNode).value.src;
  }

  public changeCurrentStyle(className: string, op: 'add' | 'remove' | 'toggle') {
    if (op === 'add') this.current?.value.classList.add(className)

    if (op === 'remove') this.current?.value.classList.remove(className)

    if (op === 'toggle') this.current?.value.classList.toggle(className)
  }

  public get getCurrentSrc(): string {
    return (this.current as LinkedListNode).value.src;
  }
}

export default ImageSlider;
