import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IDialogTemplate } from 'src/app/models/dialog-template.model';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.css']
})
export class DialogTemplateComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogTemplate) {
  }
}
