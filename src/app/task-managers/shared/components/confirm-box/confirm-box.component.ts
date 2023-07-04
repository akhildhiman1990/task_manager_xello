import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../models';

@Component({
  selector: 'tm-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class ConfirmBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

}
