import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VendorForm } from '../../model/vendor.form.model';

@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.css']
})
export class NewVendorComponent implements OnInit {
  vendorForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.vendorForm = this.fb.group({
      street: '',
      postalCode: '',
      country: '',
      city: ''
    });
    this.vendorForm.valueChanges.subscribe(data => {
      console.log(data);
    })
  }

  private createForm(vendorForm: VendorForm): FormGroup {
    return this.fb.group(vendorForm);
  }

  private updateForm(vendorForm: Partial<VendorForm>): void {
    this.vendorForm.patchValue(vendorForm)
  }

  get formValue() {
    return this.vendorForm.value as VendorForm;
  }

  onSubmit() {
    console.log(this.vendorForm.value);
  }

}
