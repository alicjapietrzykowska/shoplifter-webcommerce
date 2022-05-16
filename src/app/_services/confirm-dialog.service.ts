import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogOptions } from '@interfaces/dialogOptionsDto';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmModalComponent } from '@components/confirm-modal/confirm-modal.component';
@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  dialogRef!: MatDialogRef<ConfirmModalComponent>;

  public open(options: DialogOptions) {
    this.dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: options.title,
        message: options.message,
      },
    });
  }

  public confirmed(): Observable<boolean> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }
}
