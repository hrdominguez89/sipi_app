import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Operacion } from '../pages/datatable/table.component';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  @Input() formConfig: any[] = [];
  @Input() data: any = null; // Datos para prellenar el formulario en modo edición
  @Input() operacion: string = '';
  @Input() table: string | null = null;

  @Output() save = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const formGroupConfig: any = {};

    this.formConfig.forEach((field) => {
      const validators: ValidatorFn[] = [Validators.required];

      // Agregar validadores específicos según el tipo de campo
      if (field.type === 'email') {
        validators.push(this.emailValidator());
      } else if (field.type === 'password') {
        validators.push(Validators.minLength(4))
      }

      formGroupConfig[field.name] = [
        field.defaultValue || '',
        validators,
      ];
    });

    this.form = this.fb.group(formGroupConfig);
  }

  private emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      return emailRegex.test(value) ? null : { 'invalidEmail': true };
    };
  }


  onSubmit() {
    if (this.form.valid) {
      console.log('Formulario válido:', this.form.value);
      this.save.emit(this.form.value);
    } else {
      console.log('Formulario no válido. Completar todos los campos.');
    }
  }

  getFormValue(): any {
    return this.form.value;
  }

  onSave() {
    this.onSubmit();
  }

  // reiniciar el formulario
  resetForm(): void {
    this.form.reset();
  }
  //rellenar formulario cuando vas a editar
  fillForm() {
    const formValue: any = {};

    this.formConfig.forEach((field) => {
      formValue[field.name] = this.data[field.name] || '';
    });

    this.form.patchValue(formValue);
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.fillForm();
    }
  }


}
