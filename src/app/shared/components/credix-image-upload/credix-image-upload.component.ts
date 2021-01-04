import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CredixImageUploadConfirmComponent} from './credix-image-upload-confirm/credix-image-upload-confirm.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-image-upload',
  templateUrl: './credix-image-upload.component.html',
  styleUrls: ['./credix-image-upload.component.scss']
})
export class CredixImageUploadComponent implements OnInit {
  @Input() label: string;
  @Input() os = 'Windows';
  @Output() imageChanged = new EventEmitter();
  @ViewChild('imageInput') imageInput: ElementRef;
  type = '';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  openModal() {
    let dialogRef: MatDialogRef<CredixImageUploadConfirmComponent>;
    dialogRef = this.dialog.open(CredixImageUploadConfirmComponent, {
      disableClose: true,
      width: '380px',
      height: '249px',
      autoFocus: false,
      panelClass: 'image-upload-panel'
    });
    return dialogRef.afterClosed();
  }

  uploadFile() {
    if (this.os === 'Mac' || this.os === 'Android') {
      this.openModal().subscribe(response => {
        if (response) {
          this.imageInput.nativeElement.click();
        }
      });
    } else {
      this.imageInput.nativeElement.click();
    }
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.imageChanged.emit({file: event.target.result, name: file.name, size: file.size, type: file.type.split('image/')[1]});
      this.imageInput.nativeElement.value = '';
    });
    reader.readAsDataURL(file);
  }

}

