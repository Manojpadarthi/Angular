import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {

  //newServerName = '';
  newServerContent = '';
  @Output() serverCreated=new EventEmitter<{serverName:string,serverContent:string}>();
  @Output() blueprintCreated=new EventEmitter<{serverName:string,serverContent:string}>();
  constructor(){

  }

  onAddServer(nameInput:HTMLInputElement) {
   this.serverCreated.emit({serverName:nameInput.value,serverContent:this.newServerContent})
  }

  onAddBlueprint(nameInput:HTMLInputElement) {
    this.blueprintCreated.emit({serverName:nameInput.value,serverContent:this.newServerContent})
  }

}
