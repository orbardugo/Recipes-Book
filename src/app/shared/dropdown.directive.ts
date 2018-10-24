import { Directive, Input, HostBinding, ElementRef, Renderer2, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    @Input() deafultDropdownState: string = '';
    @HostBinding('class.open') isOpen= false;

    constructor(private elRef: ElementRef, private renderer: Renderer2){

    }

    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    
    }
}