import { Component, Input, Output,EventEmitter } from '@angular/core';


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})    


export class HeaderComponent{
    
    @Output() headerClicked = new EventEmitter<string>();

    onSelect(choice: string){
        this.headerClicked.emit(choice);

    }

}