import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '../../shared/store';
import {Backend} from '../../shared/backend';

@Component({
  selector: 'app-data',
  imports: [DatePipe],
  templateUrl: './data.html',
  styleUrl: './data.scss',
})
export class Data {
  public backend = inject(Backend);
  public store = inject(Store);

  deleteRegistration(id: string) {
    if (confirm('Sind Sie sicher?')) {
      this.backend.deleteRegistration(id);
    }
  }
}
