import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '../../shared/store';
import { Backend } from '../../shared/backend';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatSelect, MatOption }     from '@angular/material/select';
import { MatCheckbox }   from '@angular/material/checkbox';
import { MatDatepickerModule, MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './add-data.html',
  styleUrl: './add-data.scss',
})
export class AddData {
  public store = inject(Store);
  public backend = inject(Backend);
  private fb = inject(FormBuilder);
  public signupForm: any;

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2),
        Validators.maxLength(50) , Validators.pattern(/^([^0-9]*)$/)]],
      birthdate: ['', Validators.required],
      courseId: ['', Validators.required],
      newsletter: [false],
      email: [{ value: '', disabled: true}, [Validators.email]]
    });

    this.signupForm.get('newsletter')?.valueChanges.subscribe((isChecked: boolean) => {
      const emailControl = this.signupForm.get('email');
      if (isChecked) {
        emailControl?.enable();
      } else {
        emailControl?.disable();
        emailControl?.reset();
      }
    })
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.getRawValue();
      if (formValue.birthdate instanceof Date) {
        formValue.birthdate = formValue.birthdate.toLocaleDateString('en-CA');
      }
      this.backend.addRegistration(formValue);
      this.signupForm.reset({
        name: '',
        birthdate: '',
        courseId: '',
        newsletter: false,
        email: ''
      });
      // Ensure email stays disabled after reset if newsletter is false
      this.signupForm.get('email')?.disable();
    }
  }
}
