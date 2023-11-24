import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogTemplate } from '../models/dialog-template.model';
import { DialogTemplateComponent } from '../components/commons/dialog-template/dialog-template.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openDialogTemplate(data: IDialogTemplate) {
    return this.matDialog.open(DialogTemplateComponent, { data })
  }
}
