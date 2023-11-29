import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css']
})

export class CustomSnackbarComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() message: string = '';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';


  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  show(): void {
    this.snackBar.open(this.message, '', {
      duration: 3000,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
    });
  }
}

